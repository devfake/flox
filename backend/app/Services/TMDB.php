<?php

  namespace App\Services;

  use App\Item;
  use Carbon\Carbon;
  use DateTime;
  use GuzzleHttp\Client;
  use Illuminate\Support\Collection;
  use Illuminate\Support\Facades\Cache;

  class TMDB {

    private $client;
    private $apiKey;
    private $translation;

    private $base = 'http://api.themoviedb.org';

    /**
     * Get the API Key for TMDB and create an instance of Guzzle.
     *
     * @param Client $client
     */
    public function __construct(Client $client)
    {
      $this->apiKey = config('services.tmdb.key');
      $this->translation = config('app.TRANSLATION');
      $this->client = $client;
    }

    /**
     * Search TMDB by 'title'.
     *
     * @param $title
     * @return array
     */
    public function search($title)
    {
      $response = $this->client->get($this->base . '/3/search/multi', [
        'query' => [
          'api_key' => $this->apiKey,
          'query' => $title,
          'language' => strtolower($this->translation)
        ]
      ]);

      return $this->createItems($response);
    }

    /**
     * Search TMDB for recommendations and similar movies.
     *
     * @param $mediaType
     * @param $tmdbID
     * @return \Illuminate\Support\Collection
     */
    public function suggestions($mediaType, $tmdbID)
    {
      $recommendations = $this->searchSuggestions($mediaType, $tmdbID, 'recommendations');
      $similar = $this->searchSuggestions($mediaType, $tmdbID, 'similar');

      $items = $recommendations->merge($similar);

      $inDB = Item::all('tmdb_id')->toArray();

      // Remove movies which already are in database.
      return $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });
    }

    /**
     * @param $mediaType
     * @param $tmdbID
     * @param $type
     *
     * @return Collection
     */
    private function searchSuggestions($mediaType, $tmdbID, $type)
    {
      $response = $this->client->get($this->base . '/3/' . $mediaType . '/' . $tmdbID . '/' . $type, [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);

      return collect($this->createItems($response, $mediaType));
    }

    /**
     * Search TMDB for upcoming movies.
     *
     * @return array
     */
    public function upcoming()
    {
      return Cache::remember('upcoming', $this->untilEndOfDay(), function() {
        $response = $this->client->get($this->base . '/3/movie/upcoming', [
          'query' => [
            'api_key' => $this->apiKey,
            'language' => strtolower($this->translation)
          ]
        ]);

        $items = collect($this->createItems($response, 'movie'));

        return $this->filterItems($items);
      });
    }

    /**
     * Search TMDB for current popular movies and tv shows.
     *
     * @return array
     */
    public function trending()
    {
      return Cache::remember('trending', $this->untilEndOfDay(), function() {
        $responseMovies = $this->fetchPopular('movie');
        $responseTv = $this->fetchPopular('tv');

        $tv = collect($this->createItems($responseTv, 'tv'));
        $movies = collect($this->createItems($responseMovies, 'movie'));

        $items = $tv->merge($movies)->shuffle();

        return $this->filterItems($items);
      });
    }

    /**
     * Merge the response with items from our database.
     *
     * @param Collection $items
     * @return array
     */
    private function filterItems($items)
    {
      $allID = $items->pluck('tmdb_id');

      // Get all movies / tv shows from trendig / upcoming which already in database.
      $inDB = Item::whereIn('tmdb_id', $allID)->get()->toArray();

      // Remove all inDB movies / tv shows from trending / upcoming.
      $filtered = $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });

      $merged = $filtered->merge($inDB);

      // Reset array keys to display inDB items first.
      return array_values($merged->reverse()->toArray());
    }

    private function fetchPopular($mediaType)
    {
      return $this->client->get($this->base . '/3/' . $mediaType . '/popular', [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);
    }

    /**
     * @param      $response
     * @param null $type
     *
     * @return array
     */
    private function createItems($response, $type = null)
    {
      $items = [];
      $response = json_decode($response->getBody());

      foreach($response->results as $result) {
        // Suggestions doesn't deliver 'media type' by default
        $mediaType = $type ?: $result->media_type;

        if($mediaType == 'person') continue;

        $dtime = DateTime::createFromFormat('Y-m-d', (array_key_exists('release_date', $result)
          ? ($result->release_date ?: '1970-12-1')
          : ($result->first_air_date ?: '1970-12-1')
        ));

        // 'name' is from tv, 'title' from movies
        $items[] = [
          'tmdb_id' => $result->id,
          'title' => array_key_exists('name', $result) ? $result->name : $result->title,
          'original_title' => array_key_exists('name', $result) ? $result->original_name : $result->original_title,
          'poster' => $result->poster_path,
          'media_type' => $mediaType,
          'released' => $dtime->getTimestamp(),
          'genre' => $this->parseGenre($result->genre_ids),
          'episodes' => [],
        ];
      }

      return $items;
    }

    /**
     * Get full movie or tv details.
     *
     * @param $tmdbId
     * @param $mediaType
     * @return mixed
     */
    public function details($tmdbId, $mediaType)
    {
      $response = $this->client->get($this->base . '/3/' . $mediaType . '/' . $tmdbId, [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);

      if($this->hasLimitRemaining($response)) {
        return json_decode($response->getBody());
      }

      // After 10 seconds the TMDB request limit is resetted.
      sleep(10);
      return $this->details($tmdbId, $mediaType);
    }

    /**
     * Get current count of seasons.
     *
     * @param $id
     * @param $mediaType
     * @return integer | null
     */
    private function tvSeasonsCount($id, $mediaType)
    {
      if($mediaType == 'tv') {
        $response = $this->client->get($this->base . '/3/tv/' . $id, [
          'query' => [
            'api_key' => $this->apiKey,
            'language' => strtolower($this->translation)
          ]
        ]);

        $seasons = collect(json_decode($response->getBody())->seasons);

        return $seasons->filter(function ($season) {
          // We don't need pilots
          return $season->season_number > 0;
        })->count();
      }

      return null;
    }

    /**
     * Get all episodes of each season.
     *
     * @param $id
     * @return array
     */
    public function tvEpisodes($id)
    {
      $seasons = $this->tvSeasonsCount($id, 'tv');
      $data = [];

      for($i = 1; $i <= $seasons; $i++) {
        $response = $this->client->get($this->base . '/3/tv/' . $id . '/season/' . $i, [
          'query' => [
            'api_key' => $this->apiKey,
            'language' => strtolower($this->translation)
          ]
        ]);

        $data[$i] = json_decode($response->getBody());
      }

      return $data;
    }

    /**
     * Make a new request to TMDb to get the alternative titles.
     *
     * @param $item
     * @return array
     */
    public function getAlternativeTitles($item)
    {
      $response = $this->fetchAlternativeTitles($item);

      if($this->hasLimitRemaining($response)) {
        $body = json_decode($response->getBody());

        if(property_exists($body, 'titles') || property_exists($body, 'results')) {
          return isset($body->titles) ? $body->titles : $body->results;
        }

        return [];
      }

      // After 10 seconds the TMDB request limit is resetted.
      sleep(10);
      return $this->getAlternativeTitles($item);
    }

    public function fetchAlternativeTitles($item)
    {
      return $this->client->get($this->base . '/3/' . $item['media_type'] . '/' . $item['tmdb_id'] . '/alternative_titles', [
        'query' => [
          'api_key' => $this->apiKey
        ]
      ]);
    }

    /**
     * Create genre string from genre_ids.
     *
     * @param $ids
     * @return string
     */
    private function parseGenre($ids)
    {
      $genre = [];

      foreach($ids as $id) {
        $genre[] = isset($this->genreList()[$id]) ? $this->genreList()[$id] : '';
      }

      return implode($genre, ', ');
    }

    /**
     * Current genre list from TMDb.
     *
     * @return array
     */
    private function genreList()
    {
      return [
        28 => 'Action',
        12 => 'Adventure',
        16 => 'Animation',
        35 => 'Comedy',
        80 => 'Crime',
        99 => 'Documentary',
        18 => 'Drama',
        10751 => 'Family',
        14 => 'Fantasy',
        36 => 'History',
        27 => 'Horror',
        10402 => 'Music',
        9648 => 'Mystery',
        10749 => 'Romance',
        878 => 'Sci-Fi',
        10770 => 'TV Movie',
        53 => 'Thriller',
        10752 => 'War',
        37 => 'Western',
        10759 => 'Action & Adventure',
        10762 => 'Kids',
        10763 => 'News',
        10764 => 'Reality',
        10765 => 'Sci-Fi & Fantasy',
        10766 => 'Soap',
        10767 => 'Talk',
        10768 => 'War & Politics',
      ];
    }

    /**
     * @param $response
     * @return int
     */
    public function hasLimitRemaining($response)
    {
      return (int) $response->getHeader('X-RateLimit-Remaining')[0] > 1;
    }

    /**
     * @return float|int
     */
    private function untilEndOfDay()
    {
      return Carbon::now()->secondsUntilEndOfDay() / 60;
    }
  }
