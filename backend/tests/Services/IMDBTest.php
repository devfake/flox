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
      $this->markTestSkipped('Web scraping not working any more (commit cea991bd).');
      config(['services.imdb.url' => __DIR__ . '/../Fixtures/imdb/with-rating.html']);

      $imdbService = app(IMDB::class);

      $rating = $imdbService->parseRating();

      $this->assertEquals('7,0', $rating);
    }

    /** @test */
    public function it_should_return_null_if_no_rating_was_found()
    {
      $this->markTestSkipped('Web scraping not working any more (commit cea991bd).');
      config(['services.imdb.url' => __DIR__ . '/../Fixtures/imdb/without-rating.html']);

      $imdbService = app(IMDB::class);

      $rating = $imdbService->parseRating();

      $this->assertNull($rating);
    }
  }
