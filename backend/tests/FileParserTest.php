<?php

  use Illuminate\Foundation\Testing\DatabaseMigrations;

  use App\Services\FileParser;

  class FileParserTest extends TestCase {

    use DatabaseMigrations;

    protected $response;

    public function setUp()
    {
      parent::setUp();

      $this->createFactory();
      $this->response = file_get_contents(__DIR__ . '/fixtures/media_files.json');
      $this->parser = new FileParser();
    }

    /** @test */
    public function it_can_parse_tmdb_id_by_name()
    {
      $tmdbId = $this->parser->getTmdbId('Breaking Bad');

      $this->assertEquals(1396, $tmdbId);
    }

    /** @test */
    public function it_returns_null_if_tmdb_id_not_found_by_name()
    {
      $tmdbId = $this->parser->getTmdbId('Not Found');

      $this->assertNull($tmdbId);
    }

    private function createFactory()
    {
      factory(App\Item::class)->create([
        'title' => 'Breaking Bad',
        'original_title' => 'Breaking Bad',
        'tmdb_id' => 1396,
        'media_type' => 'tv',
      ]);
    }
  }
