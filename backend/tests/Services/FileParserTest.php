<?php

  use App\Episode;
  use App\Item;
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
    private $episode;

    public function setUp()
    {
      parent::setUp();

      $this->item = app(Item::class);
      $this->episode = app(Episode::class);
      $this->parser = app(FileParser::class);
    }

    /** @test */
    public function it_should_store_src_if_movie_found_in_database()
    {
      $this->createMovie();

      $item1 = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_added'));
      $item2 = $this->item->first();

      $this->assertNull($item1->src);
      $this->assertNotNull($item2->src);
    }

    /** @test */
    public function it_should_store_src_for_episodes_if_tv_found_in_database()
    {
      $this->createTv();

      $episodes1 = $this->item->with('episodes')->first()->episodes;
      $this->parser->updateDatabase($this->fpFixtures('tv_added'));
      $episodes2 = $this->item->with('episodes')->first()->episodes;

      $episodes1->each(function($episode) {
        $this->assertNull($episode->src);
      });

      $episodes2->each(function($episode) {
        $this->assertNotNull($episode->src);
      });
    }

    /** @test */
    public function it_should_create_movie_and_store_src_if_not_found_in_database()
    {
      $items = $this->item->get();

      $this->createTmdbMock($this->tmdbFixtures('movie'), $this->tmdbFixtures('alternative_titles_movie'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie_added'));

      $item = $this->item->first();

      $this->assertCount(0, $items);
      $this->assertNotNull($item->src);
      $this->seeInDatabase('items', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_should_create_tv_with_episodes_and_store_src_if_not_found_in_database()
    {
      $items = $this->item->get();
      $episodes1 = $this->episode->get();

      $this->createTmdbMock($this->tmdbFixtures('tv'), $this->tmdbFixtures('alternative_titles_tv'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv_added'));

      $episodes2 = $this->episode->get();

      $this->assertCount(0, $items);
      $this->assertCount(0, $episodes1);
      $this->assertCount(4, $episodes2);
      $this->seeInDatabase('items', [
        'title' => 'Game of Thrones'
      ]);

      $episodes2->each(function($episode) {
        $this->assertNotNull($episode->src);
      });
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

    /** @test */
    public function it_should_remove_src_from_movie()
    {
      $this->createMovie();
      $this->parser->updateDatabase($this->fpFixtures('movie_added'));

      $withSrc = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_removed'));
      $withoutSrc = $this->item->first();

      $this->assertNotNull($withSrc->src);
      $this->assertNull($withoutSrc->src);
    }

    /** @test */
    public function it_should_remove_src_from_tv_episode()
    {
      $this->createTv();
      $this->parser->updateDatabase($this->fpFixtures('tv_added'));

      $withSrc = $this->item->with('episodes')->first()->episodes;
      $this->parser->updateDatabase($this->fpFixtures('tv_removed'));
      $withoutSrc = $this->item->with('episodes')->first()->episodes;

      $withSrc->each(function($episode) {
        $this->assertNotNull($episode->src);
      });

      $withoutSrc->each(function($episode) {
        $this->assertNull($episode->src);
      });
    }

    private function createTmdbMock($fixture, $alternativeTitles)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
        new Response(200, ['X-RateLimit-Remaining' => [40]], $alternativeTitles),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));

      // Mock this to avoid unknown requests to TMDb (get seasons and then get episodes for each season)
      $mock = Mockery::mock(app(TMDB::class))->makePartial();
      $mock->shouldReceive('tvEpisodes')->andReturn(json_decode($this->tmdbFixtures('episodes')));

      $this->app->instance(TMDB::class, $mock);
    }
  }
