<?php

  namespace App\Services;

  use App\Item;
  use Carbon\Carbon;
  use GuzzleHttp\Client;
  use Illuminate\Support\Collection;
  use Illuminate\Support\Facades\Cache;
  use GuzzleHttp\Exception\ClientException;

  class TMDB {

    private $client;
    private $apiKey;
    private $translation;

    private $base = 'http://api.themoviedb.org';

    /**
     * Get the API Key for TMDb and create an instance of Guzzle.
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
     * Search TMDb by 'title'.
     *
     * @param      $title
     * @param null $mediaType
     * @return Collection
     */
    public function search($title, $mediaType = null)
    {
      $tv = collect();
      $movies = collect();

      if( ! $mediaType || $mediaType == 'tv') {
        $response = $this->fetchSearch($title, 'tv');
        $tv = collect($this->createItems($response, 'tv'));
      }

      if( ! $mediaType || $mediaType == 'movies') {
        $response = $this->fetchSearch($title, 'movie');
        $movies = collect($this->createItems($response, 'movie'));
      }

      return $movies->merge($tv)->sortByDesc('popularity')->values()->all();
    }

    private function fetchSearch($title, $mediaType) {
      return $this->requestTmdb($this->base . '/3/search/' . $mediaType, [
        'query' => $title,
      ]);
    }

    /**
     * Search TMDb for recommendations and similar movies.
     *
     * @param $mediaType
     * @param $tmdbId
     * @return \Illuminate\Support\Collection
     */
    public function suggestions($mediaType, $tmdbId)
    {
      $recommendations = $this->searchSuggestions($mediaType, $tmdbId, 'recommendations');
      $similar = $this->searchSuggestions($mediaType, $tmdbId, 'similar');

      $items = $recommendations->merge($similar);

      $inDB = Item::all('tmdb_id')->toArray();

      // Remove movies which already are in database.
      return $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });
    }

    /**
     * @param $mediaType
     * @param $tmdbId
     * @param $type
     *
     * @return Collection
     */
    private function searchSuggestions($mediaType, $tmdbId, $type)
    {
      $response = $this->requestTmdb($this->base . '/3/' . $mediaType . '/' . $tmdbId . '/' . $type);

      return collect($this->createItems($response, $mediaType));
    }

    /**
     * Search TMDb for upcoming movies.
     *
     * @return array
     */
    public function upcoming()
    {
      $cache = Cache::remember('upcoming', $this->untilEndOfDay(), function() {
        $response = $this->requestTmdb($this->base . '/3/movie/upcoming');

        return collect($this->createItems($response, 'movie'));
      });

      return $this->filterItems($cache);
    }

    /**
     * Search TMDb for current popular movies and tv shows.
     *
     * @return array
     */
    public function trending()
    {
      $cache = Cache::remember('trending', $this->untilEndOfDay(), function() {
        $responseMovies = $this->fetchPopular('movie');
        $responseTv = $this->fetchPopular('tv');

        $tv = collect($this->createItems($responseTv, 'tv'));
        $movies = collect($this->createItems($responseMovies, 'movie'));

        return $tv->merge($movies)->shuffle();
      });

      return $this->filterItems($cache);
    }

    /**
     * Merge the response with items from our database.
     *
     * @param Collection $items
     * @return array
     */
    private function filterItems($items)
    {
      $allId = $items->pluck('tmdb_id');

      // Get all movies / tv shows from trendig / upcoming which already in database.
      $inDB = Item::whereIn('tmdb_id', $allId)->withCount('episodesWithSrc')->get()->toArray();

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
      return $this->requestTmdb($this->base . '/3/' . $mediaType . '/popular');
    }

    /**
     * @param      $response
     * @param      $mediaType
     * @return array
     */
    private function createItems($response, $mediaType)
    {
      $items = [];
      $response = json_decode($response->getBody());

      foreach($response->results as $result) {
        $items[] = $this->createItem($result, $mediaType);
      }

      return $items;
    }

    public function createItem($data, $mediaType)
    {
      $release = Carbon::createFromFormat('Y-m-d',
        isset($data->release_date) ? ($data->release_date ?: '1970-12-1') : ($data->first_air_date ?: '1970-12-1')
      );

      return [
        'tmdb_id' => $data->id,
        'title' => $data->name ?? $data->title,
        'original_title' => $data->original_name ?? $data->original_title,
        'poster' => $data->poster_path,
        'media_type' => $mediaType,
        'released' => $release->getTimestamp(),
        'genre' => $this->parseGenre($data->genre_ids),
        'episodes' => [],
        'overview' => $data->overview,
        'backdrop' => $data->backdrop_path,
        'tmdb_rating' => $data->vote_average,
        'popularity' => $data->popularity,
      ];
    }

    private function requestTmdb($url, $query = [])
    {
      $query = array_merge($query, [
        'api_key' => $this->apiKey,
        'language' => strtolower($this->translation)
      ]);

      try {
        $response = $this->client->get($url, [
          'query' => $query
        ]);

        if($this->hasLimitRemaining($response)) {
          return $response;
        }
      } catch (ClientException $e) {
        // wtf? throws exception because of "bad" statuscode?
        $response = $e->getResponse();

        if($this->hasLimitRemaining($response)) {
          return $response;
        }
      }

      sleep(1);
      return $this->requestTmdb($url, $query);
    }

    /**
     * Get full movie or tv details with trailers.
     *
     * @param $tmdbId
     * @param $mediaType
     * @return mixed
     */
    public function details($tmdbId, $mediaType)
    {
      $response = $this->requestTmdb($this->base . '/3/' . $mediaType . '/' . $tmdbId, [
        'append_to_response' => 'videos,external_ids',
      ]);

      return json_decode($response->getBody());
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
        $response = $this->requestTmdb($this->base . '/3/tv/' . $id);

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
     * @param $tmdbId
     * @return array
     */
    public function tvEpisodes($tmdbId)
    {
      $seasons = $this->tvSeasonsCount($tmdbId, 'tv');
      $data = [];

      for($i = 1; $i <= $seasons; $i++) {
        $response = $this->requestTmdb($this->base . '/3/tv/' . $tmdbId . '/season/' . $i);

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

      $body = json_decode($response->getBody());

      if(property_exists($body, 'titles') || property_exists($body, 'results')) {
        return $body->titles ?? $body->results;
      }

      return [];
    }

    public function fetchAlternativeTitles($item)
    {
      return $this->requestTmdb($this->base . '/3/' . $item['media_type'] . '/' . $item['tmdb_id'] . '/alternative_titles');
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
        $genre[] = $this->genreList()[$id] ?? '';
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
     * @return boolean
     */
    public function hasLimitRemaining($response)
    {
      if($response->getStatusCode() == 429) {
        return false;
      } 

      return ((int) $response->getHeader('X-RateLimit-Remaining')[0]) > 1;
    }

    /**
     * @return float|int
     */
    private function untilEndOfDay()
    {
      return Carbon::now()->secondsUntilEndOfDay() / 60;
    }
  }
