<?php

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  use App\Services\FileParser;

  class FileParserTest extends TestCase {

    use DatabaseMigrations;

    private $item;
    private $parser;
    private $tmdb;
    private $storage;
    private $episode;
    private $alternativeTitle;

    public function setUp()
    {
      parent::setUp();

      $this->item = new Item();
      $this->tmdb = new TMDB(new Client());
      $this->storage = new Storage();
      $this->episode = new Episode();
      $this->alternativeTitle = new AlternativeTitle();

      $this->parser = new FileParser($this->item, $this->episode, $this->tmdb, $this->storage, $this->alternativeTitle);
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

    /** @test */
    public function it_should_create_movie_and_store_src_if_not_found_in_database()
    {
      $items = $this->item->get();

      $this->assertCount(0, $items);

      $tmdbMock = $this->createTmdbMock($this->fixtureTmdbMovie, $this->fixtureAlternativeTitleMovie);

      $parser = new FileParser($this->item, $this->episode, $tmdbMock, $this->storage, $this->alternativeTitle);

      $parser->store($this->fixtureFilesMovie);

      $this->seeInDatabase('items', [
        'title' => 'Warcraft: The Beginning'
      ]);

      $item = $this->item->first();

      $this->assertNotNull($item->src);
    }

    /** @test */
    public function it_should_create_tv_with_episodes_and_store_src_if_not_found_in_database()
    {
      $items = $this->item->get();
      $episodes = $this->episode->get();

      $this->assertCount(0, $items);
      $this->assertCount(0, $episodes);

      $tmdbMock = $this->createTmdbMock($this->fixtureTmdbTv, $this->fixtureAlternativeTitleTv);

      $parser = new FileParser($this->item, $this->episode, $tmdbMock, $this->storage, $this->alternativeTitle);

      $parser->store($this->fixtureFilesTv);

      $this->seeInDatabase('items', [
        'title' => 'Game of Thrones'
      ]);

      $episodes = $this->episode->get();

      $this->assertCount(4, $episodes);

      foreach($episodes as $episode) {
        $this->assertNotNull($episode->src);
      }
    }

    /** @test */
    public function it_can_update_last_fetch_to_file_parser_timestamp()
    {
      $this->createSetting();
      $this->createMovie();

      $setting1 = Setting::first();
      $this->parser->fetch();
      $setting2 = Setting::first();
      sleep(1);
      $this->parser->fetch();
      $setting3 = Setting::first();

      $this->assertNull($setting1->last_fetch_to_file_parser);
      $this->assertNotNull($setting2->last_fetch_to_file_parser);
      $this->assertNotEquals($setting2->last_fetch_to_file_parser, $setting3->last_fetch_to_file_parser);
    }

    private function createTmdbMock($fixture, $alternativeTitles)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
        new Response(200, ['X-RateLimit-Remaining' => [40]], $alternativeTitles),
      ]);

      $handler = HandlerStack::create($mock);
      $client = new Client(['handler' => $handler]);

      // Mock this to avoid unknown requests to TMDb (get seasons and then get episodes for each season)
      $tmdb = $this->getMockBuilder(TMDB::class)
        ->setConstructorArgs([$client])
        ->setMethods(['tvEpisodes'])
        ->getMock();

      $tmdb->method('tvEpisodes')->willReturn($this->fixtureTmdbEpisodes);

      return $tmdb;
    }
  }
