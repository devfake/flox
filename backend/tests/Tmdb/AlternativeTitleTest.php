<?php

  use App\AlternativeTitle;
  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class AlternativeTitleTest extends TestCase {

    use DatabaseMigrations;

    /** @test */
    public function it_can_store_alternative_titles_for_movies()
    {
      $tmdbMock = $this->createTmdbMock($this->fixtureAlternativeTitleMovie);
      $movie = $this->getMovie();

      $alternativeTitle = new AlternativeTitle();
      $alternativeTitle->store($movie, $tmdbMock);

      $this->assertCount(4, AlternativeTitle::all());

      $this->seeInDatabase('alternative_titles', [
        'title' => 'Disney Pixar Finding Nemo'
      ]);
    }

    /** @test */
    public function it_can_store_alternative_titles_for_tv_shows()
    {
      $tmdbMock = $this->createTmdbMock($this->fixtureAlternativeTitleTv);
      $tv = $this->getTv();

      $alternativeTitle = new AlternativeTitle();
      $alternativeTitle->store($tv, $tmdbMock);

      $this->assertCount(3, AlternativeTitle::all());

      $this->seeInDatabase('alternative_titles', [
        'title' => 'DBZ'
      ]);
    }

    private function createTmdbMock($fixture)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
      ]);

      $handler = HandlerStack::create($mock);
      $client = new Client(['handler' => $handler]);

      return new TMDB($client);
    }
  }
