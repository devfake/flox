<?php

  namespace App\Services;

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
      $items = [];

      $response = $this->client->get('/3/search/movie', ['query' => ['api_key' => $this->apiKey, 'query' => $title]]);
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
  }