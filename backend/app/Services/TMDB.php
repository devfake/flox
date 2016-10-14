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
      $response = $this->client->get('/3/search/movie', ['query' => ['api_key' => $this->apiKey, 'query' => $title]]);
      $items = $this->createItems($response);

      return $items;
    }

    /**
     * Make a new request to TMDB to get the 'alternative language' movie title.
     *
     * @param $tmdb_id
     * @return null|string
     */
    public function alternativeMovieTitle($tmdb_id)
    {
      $alternativeLanguage = config('app.ALTERNATIVE_LANGUAGE');

      $response = $this->client->get('/3/movie/' . $tmdb_id . '/alternative_titles', ['query' => ['api_key' => $this->apiKey]]);
      $titles = collect(json_decode($response->getBody())->titles);

      $title = $titles->where('iso_3166_1', $alternativeLanguage);

      if($title->isEmpty()) {
        return null;
      }

      // '3D' is often used in the title. We don't need them.
      return trim(str_replace('3D', '', $title->first()->title));
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

      // Get all movies from trendig which already in database.
      $inDB = Item::whereIn('tmdb_id', $allID)->get()->toArray();

      // Remove all inDB movies from trending.
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
          'poster' => $result->poster_path,
          'released' => $dtime->getTimestamp(),
        ];
      }

      return $items;
    }
  }