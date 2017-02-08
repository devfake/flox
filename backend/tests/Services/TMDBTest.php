<?php

  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class TMDBTest extends TestCase {

    use DatabaseMigrations;

    /** @test */
    public function it_should_fetch_and_merge_movies_and_tv_in_trending()
    {
      $this->createGuzzleMock($this->tmdbFixtures('tv/trending'), $this->tmdbFixtures('movie/trending'));

      $tmdb = app(TMDB::class);
      $trending = $tmdb->trending();

      $hasTv = $this->in_array_r('Game of Thrones', $trending);
      $hasMovie = $this->in_array_r('Warcraft: The Beginning', $trending);

      $this->assertTrue($hasTv);
      $this->assertTrue($hasMovie);
    }

    /** @test */
    public function it_should_merge_database_items_in_trending()
    {
      $this->createGuzzleMock($this->tmdbFixtures('tv/trending'), $this->tmdbFixtures('movie/trending'));

      $this->createMovie();
      $this->createTv();

      $tmdb = app(TMDB::class);
      $trending = $tmdb->trending();

      $this->assertArrayHasKey('rating', $trending[0]);
      $this->assertArrayHasKey('rating', $trending[1]);
      $this->assertArrayNotHasKey('rating', $trending[2]);
    }

    /** @test */
    public function it_should_merge_database_movie_in_upcoming()
    {
      $this->createGuzzleMock($this->tmdbFixtures('movie/upcoming'), $this->tmdbFixtures('movie/upcoming'));

      $this->createMovie();

      $tmdb = app(TMDB::class);
      $trending = $tmdb->upcoming();

      $this->assertArrayHasKey('rating', $trending[0]);
      $this->assertArrayNotHasKey('rating', $trending[1]);
    }

    private function in_array_r($item , $array){
      return (bool) preg_match('/"' . $item . '"/i' , json_encode($array));
    }

    private function createGuzzleMock($fixture, $fixture2 = null)
    {
      $mock = new MockHandler([
        new Response(200, [], $fixture),
        new Response(200, [], $fixture2),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));
    }
  }