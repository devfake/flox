<?php

  use App\Services\IMDB;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class IMDBTest extends TestCase {

    use DatabaseMigrations;

    /** @test */
    public function it_should_parse_imdb_rating()
    {
      config(['services.imdb.url' => public_path('../tests/fixtures/imdb/index.html')]);

      $imdbService = app(IMDB::class);

      $rating = $imdbService->parseRating();

      $this->assertEquals('7,9', $rating);
    }
  }
