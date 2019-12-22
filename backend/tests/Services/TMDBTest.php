<?php

  namespace Tests\Services;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Tests\Traits\Factories;
  use Tests\Traits\Fixtures;
  use Tests\Traits\Mocks;

  class TMDBTest extends TestCase {

    use RefreshDatabase;
    use Factories;
    use Fixtures;
    use Mocks;

    /** @test */
    public function it_should_search_and_merge_movies_and_tv()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/search'),
        $this->tmdbFixtures('movie/search')
      );

      $result = $this->callSearch();

      $hasTv = $this->in_array_r('Avatar: The Last Airbender', $result);
      $hasMovie = $this->in_array_r('Avatar: Aufbruch nach Pandora', $result);

      $this->assertTrue($hasTv);
      $this->assertTrue($hasMovie);
    }

    /** @test */
    public function it_should_only_search_for_tv()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/search'),
        $this->tmdbFixtures('movie/search')
      );

      $result = $this->callSearch('tv');

      $hasTv = $this->in_array_r('Avatar: The Last Airbender', $result);
      $hasMovie = $this->in_array_r('Avatar: Aufbruch nach Pandora', $result);

      $this->assertTrue($hasTv);
      $this->assertFalse($hasMovie);
    }
    
    /** @test */
    public function it_should_fetch_all_genres()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/genres'),
        $this->tmdbFixtures('tv/genres')
      );

      $tmdb = app(TMDB::class);
      $genres = $tmdb->getGenreLists();

      $this->assertArrayHasKey('tv', $genres);
      $this->assertArrayHasKey('movies', $genres);
      
      $this->assertCount(16, $genres['tv']->genres);
      $this->assertCount(19, $genres['movies']->genres);
    }

    /** @test */
    public function it_should_only_search_for_movies()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/search'),
        $this->tmdbFixtures('tv/search')
      );

      $result = $this->callSearch('movies');

      $hasTv = $this->in_array_r('Avatar: The Last Airbender', $result);
      $hasMovie = $this->in_array_r('Avatar: Aufbruch nach Pandora', $result);

      $this->assertFalse($hasTv);
      $this->assertTrue($hasMovie);
    }

    /** @test */
    public function it_should_fetch_and_merge_movies_and_tv_in_trending()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/trending'),
        $this->tmdbFixtures('movie/trending')
      );

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
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/trending'),
        $this->tmdbFixtures('movie/trending')
      );

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
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/upcoming'),
        $this->tmdbFixtures('movie/upcoming')
      );

      $this->createMovie();

      $tmdb = app(TMDB::class);
      $trending = $tmdb->upcoming();

      $this->assertArrayHasKey('rating', $trending[0]);
      $this->assertArrayNotHasKey('rating', $trending[1]);
    }

    /** @test */
    public function it_should_respect_request_limit()
    {
      $mock = new MockHandler([
        new Response(429, []),
        new Response(200, ['X-RateLimit-Remaining' => [40]], $this->tmdbFixtures('multi')),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));

      $tmdb = app(TMDB::class);
      $result = $tmdb->search('Avatar - Legend of Korra', 'tv');

      $this->assertCount(1, $result);
      $this->assertArrayHasKey('tmdb_id', $result[0]);
    }

    /** @test */
    public function it_should_sort_by_popularity_and_title()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/search_for_the_office')
      );

      $tmdb = app(TMDB::class);
      $results = $tmdb->search("the office", "tv");

      $this->assertCount(4, $results);

      $this->assertEquals("The Office", $results[0]["title"]);
      $this->assertEquals("The Office", $results[1]["title"]);
      $this->assertGreaterThan($results[1]["popularity"], $results[0]["popularity"]);

      $this->assertEquals("Parks and Recreation", $results[2]["title"]);
      $this->assertEquals("The Principal's Office", $results[3]["title"]);
    }

    private function callSearch($type = null)
    {
      $tmdb = app(TMDB::class);

      return $tmdb->search('Avatar', $type);
    }

    private function in_array_r($item , $array){
      return (bool) preg_match('/"' . $item . '"/i' , json_encode($array));
    }
  }
