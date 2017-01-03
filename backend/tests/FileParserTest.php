<?php

  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  use App\Services\FileParser;

  class FileParserTest extends TestCase {

    use DatabaseMigrations;

    private $response;
    private $item;
    private $tmdb;

    public function setUp()
    {
      parent::setUp();

      $this->createFactory();

      $this->response = json_decode(file_get_contents(__DIR__ . '/fixtures/media_files.json'));

      $this->item = new Item();
      $this->tmdb = new TMDB();
      $storage = new Storage();

      $this->parser = new FileParser($this->item, $this->tmdb, $storage);
    }

    /** @test */
    public function it_should_store_src_for_a_movie_if_item_found_in_database()
    {
      $item = $this->item->first();

      $this->assertNull($item->src);

      $this->parser->store($this->response);

      $item = $this->item->first();

      $this->assertNotNull($item->src);
    }

    private function createFactory()
    {
      factory(App\Item::class)->create([
        'title' => 'Warcraft: The Beginning',
        'original_title' => 'Warcraft',
        'tmdb_id' => 68735,
        'media_type' => 'movie',
      ]);
    }
  }
