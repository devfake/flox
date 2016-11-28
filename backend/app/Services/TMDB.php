<?php

  namespace App\Services;

  use App\Item;
  use DateTime;
  use GuzzleHttp\Client;

  class TMDB {

    private $client;
    private $apiKey;
    private $translation;

    /**
     * Get the API Key for TMDB and create an instance of Guzzle.
     */
    public function __construct()
    {
      $this->apiKey = config('app.TMDB_API_KEY');
      $this->translation = config('app.TRANSLATION');
      $this->client = new Client(['base_uri' => 'http://api.themoviedb.org/']);
    }

    /**
     * Search TMDB by 'title'.
     *
     * @param $title
     * @return array
     */
    public function search($title)
    {
      $response = $this->client->get('/3/search/multi', [
        'query' => [
          'api_key' => $this->apiKey,
          'query' => $title,
          'language' => strtolower($this->translation)
        ]
      ]);

      return $this->createItems($response);
    }

    public function trending()
    {
      return $this->searchTrendingOrUpcoming('popular');
    }

    public function upcoming()
    {
      return $this->searchTrendingOrUpcoming('upcoming');
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
     * @return \Illuminate\Support\Collection
     */
    private function searchSuggestions($mediaType, $tmdbID, $type)
    {
      $response = $this->client->get('/3/' . $mediaType . '/' . $tmdbID . '/' . $type, [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);

      return collect($this->createItems($response, $mediaType));
    }

    /**
     * Search TMDB for current popular or upcoming movies.
     *
     * @param $type
     * @return array
     */
    private function searchTrendingOrUpcoming($type)
    {
      $response = $this->client->get('/3/movie/' . $type, [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);

      $items = collect($this->createItems($response, 'movie'));
      $allID = $items->pluck('tmdb_id');

      // Get all movies from trendig / upcoming which already in database.
      $inDB = Item::whereIn('tmdb_id', $allID)->get()->toArray();

      // Remove all inDB movies from trending / upcoming.
      $filtered = $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });

      $merged = $filtered->merge($inDB);

      // Reset array keys to display inDB items first.
      return array_values($merged->reverse()->toArray());
    }

    /**
     * @param $response
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
     * Get full movie details.
     *
     * @param $tmdb_id
     * @return mixed
     */
    public function movie($tmdb_id)
    {
      $response = $this->client->get('/3/movie/' . $tmdb_id, [
        'query' => [
          'api_key' => $this->apiKey,
          'language' => strtolower($this->translation)
        ]
      ]);

      return json_decode($response->getBody());
    }

    /**
     * Get current count of seasons.
     *
     * @param $result
     * @return integer | null
     */
    private function tvSeasonsCount($id, $mediaType)
    {
      if($mediaType == 'tv') {
        $response = $this->client->get('/3/tv/' . $id, [
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
     * @param $seasons
     * @return array
     */
    public function tvEpisodes($id)
    {
      $seasons = $this->tvSeasonsCount($id, 'tv');
      $data = [];

      for($i = 1; $i <= $seasons; $i++) {
        $response = $this->client->get('/3/tv/' . $id . '/season/' . $i, [
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
  }