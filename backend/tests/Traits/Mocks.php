<?php

  namespace Tests\Traits;

  use App\Services\IMDB;
  use App\Services\Models\ItemService;
  use App\Services\Storage;
  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Mockery;

  trait Mocks {

    public function createGuzzleMock()
    {
      $fixtures = func_get_args();
      $responses = [];

      foreach($fixtures as $fixture) {
        $responses[] = new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture);
      }

      $mock = new MockHandler($responses);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));
    }

    public function createStorageDownloadsMock()
    {
      $mock = $this->mock(Storage::class);
      $mock->shouldReceive('downloadImages')->andReturn(null);
    }

    public function createRefreshAllMock()
    {
      $mock = $this->mock(ItemService::class);
      $mock->shouldReceive('refreshAll')->andReturn(null);
    }

    public function createTmdbEpisodeMock()
    {
      // Mock this to avoid unknown requests to TMDb (get seasons and then get episodes for each season)
      $mock = $this->mock(TMDB::class);
      $mock->shouldReceive('tvEpisodes')->andReturn(json_decode($this->tmdbFixtures('tv/episodes')));
    }

    private function createImdbRatingMock()
    {
      $mock = $this->mock(IMDB::class);
      $mock->shouldReceive('parseRating')->andReturn(json_decode($this->imdbFixtures('rating.txt')));
    }

    public function mock($class, $mock = null)
    {
      $mock = Mockery::mock(app($class))->makePartial();

      $this->app->instance($class, $mock);

      return $mock;
    }
  }
