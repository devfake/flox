<?php

  namespace Tests\Services;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use App\Services\IMDB;

  class IMDBTest extends TestCase {

    use RefreshDatabase;

    /** @test */
    public function it_should_parse_imdb_rating()
    {
      config(['services.imdb.url' => __DIR__ . '/../fixtures/imdb/with-rating.html']);

      $imdbService = app(IMDB::class);

      $rating = $imdbService->parseRating();

      $this->assertEquals('7,0', $rating);
    }

    /** @test */
    public function it_should_return_null_if_no_rating_was_found()
    {
      config(['services.imdb.url' => __DIR__ . '/../fixtures/imdb/without-rating.html']);

      $imdbService = app(IMDB::class);

      $rating = $imdbService->parseRating();

      $this->assertNull($rating);
    }
  }
