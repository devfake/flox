<?php

  namespace Flox\Http\Controllers;

  use DateTime;
  use Flox\Http\Controllers\Controller;
  use GuzzleHttp\Client;

  class TMDBController extends Controller {

    private $client;

    public function __construct()
    {
      $this->client = new Client(['base_uri' => 'http://api.themoviedb.org/']);
    }

    public function searchTMDBByTitle($title)
    {
      $items = [];

      $response = $this->client->get('/3/search/movie', ['query' => ['api_key' => env('TMDB_API_KEY'), 'query' => $title]]);
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
