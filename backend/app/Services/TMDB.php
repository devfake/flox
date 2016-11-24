<?php

  namespace App\Services;

  use App\Item;
  use DateTime;
  use GuzzleHttp\Client;

  class TMDB {

    private $client;
    private $apiKey;

    /**
     * Get the API Key for TMDB and create an instance of Guzzle.
     */
    public function __construct()
    {
      $this->apiKey = config('app.TMDB_API_KEY');
      $this->client = new Client(['base_uri' => 'http://api.themoviedb.org/']);
    }

    /**
     * Search TMDB for an movie by 'title'.
     *
     * @param $title
     * @return array
     */
    public function search($title)
    {
      $translation = config('app.TRANSLATION');

      $response = $this->client->get('/3/search/movie', [
        'query' => [
          'api_key' => $this->apiKey,
          'query' => $title,
          'language' => strtolower($translation)
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
     * @param $tmdbID
     * @return \Illuminate\Support\Collection
     */
    public function suggestions($tmdbID)
    {
      $recommendations = $this->searchSuggestions($tmdbID, 'recommendations');
      $similar = $this->searchSuggestions($tmdbID, 'similar');

      $items = $recommendations->merge($similar);

      $inDB = Item::all('tmdb_id')->toArray();

      // Remove movies which already are in database.
      return $items->filter(function($item) use ($inDB) {
        return ! in_array($item['tmdb_id'], array_column($inDB, 'tmdb_id'));
      });
    }

    /**
     * @param $tmdbID
     * @param $type
     *
     * @return \Illuminate\Support\Collection
     */
    private function searchSuggestions($tmdbID, $type)
    {
      $response = $this->client->get('/3/movie/' . $tmdbID . '/' . $type, ['query' => ['api_key' => $this->apiKey]]);

      return collect($this->createItems($response));
    }

    /**
     * Search TMDB for current popular or upcoming movies.
     *
     * @param $type
     * @return array
     */
    private function searchTrendingOrUpcoming($type)
    {
      $response = $this->client->get('/3/movie/' . $type, ['query' => ['api_key' => $this->apiKey]]);

      $items = collect($this->createItems($response));
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
    private function createItems($response)
    {
      $items = [];
      $response = json_decode($response->getBody());

      foreach($response->results as $result) {
        $dtime = DateTime::createFromFormat('Y-m-d', ($result->release_date ?: '1970-12-1'));
        $items[] = [
          'tmdb_id' => $result->id,
          'title' => $result->title,
          'original_title' => $result->original_title,
          'poster' => $result->poster_path,
          'released' => $dtime->getTimestamp(),
          'genre' => $this->parseGenre($result->genre_ids),
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
      $response = $this->client->get('/3/movie/' . $tmdb_id, ['query' => ['api_key' => $this->apiKey]]);

      return json_decode($response->getBody());
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