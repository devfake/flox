<?php

  use App\Episode;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  use App\Services\FileParser;

  class FileParserTest extends TestCase {

    use DatabaseMigrations;

    private $item;
    private $parser;
    private $tmdb;

    public function setUp()
    {
      parent::setUp();

      $this->item = new Item();
      $this->tmdb = new TMDB(new Client());
      $storage = new Storage();
      $episode = new Episode();

      $this->parser = new FileParser($this->item, $episode, $this->tmdb, $storage);
    }

    /** @test */
    public function it_can_find_item_in_database()
    {
      $this->createMovie();

      $itemFromTitle = $this->parser->foundInDatabase('Warcraft', 'title');
      $itemFromId = $this->parser->foundInDatabase(68735, 'tmdb_id');

      $this->assertEquals(68735, $itemFromTitle->tmdb_id);
      $this->assertEquals(68735, $itemFromId->tmdb_id);
    }

    /** @test */
    public function it_should_store_src_if_movie_found_in_database()
    {
      $this->createMovie();

      $item = $this->item->first();

      $this->assertNull($item->src);

      $this->parser->store($this->fixtureFilesMovie);

      $item = $this->item->first();

      $this->assertNotNull($item->src);
    }

    /** @test */
    public function it_should_store_src_for_episodes_if_tv_found_in_database()
    {
      $this->createTv();

      $episodes = $this->item->with('episodes')->first()->episodes;

      foreach($episodes as $episode) {
        $this->assertNull($episode->src);
      }

      $this->parser->store($this->fixtureFilesTv);

      $episodes = $this->item->with('episodes')->first()->episodes;

      foreach($episodes as $episode) {
        $this->assertNotNull($episode->src);
      }
    }
  }
