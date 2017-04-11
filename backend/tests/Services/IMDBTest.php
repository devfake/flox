<?php

  use App\Services\IMDB;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class IMDBTest extends TestCase {

    use DatabaseMigrations;

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
