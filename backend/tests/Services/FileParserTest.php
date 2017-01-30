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

      $this->createSetting();

      $this->item = app(Item::class);
      $this->episode = app(Episode::class);
      $this->parser = app(FileParser::class);
    }

    /** @test */
    public function it_should_make_a_rollback_if_status_for_movie_is_unknown()
    {
      $items = $this->item->get();
      $setting = Setting::first()->last_fetch_to_file_parser;

      $this->createTmdbMock($this->tmdbFixtures('movie'), $this->tmdbFixtures('alternative_titles_movie'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie_unknown'));

      $itemsAfterRollback = $this->item->get();
      $settingAfterRollback = Setting::first()->last_fetch_to_file_parser;

      $this->assertCount(0, $items);
      $this->assertNull($setting);
      $this->assertCount(0, $itemsAfterRollback);
      $this->assertNull($settingAfterRollback);
    }

    /** @test */
    public function it_should_make_a_rollback_if_status_for_tv_episode_is_unknown()
    {
      $episodes = $this->episode->get();
      $setting = Setting::first()->last_fetch_to_file_parser;

      $this->createTmdbMock($this->tmdbFixtures('tv'), $this->tmdbFixtures('alternative_titles_tv'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv_unknown'));

      $episodesAfterRollback = $this->episode->get();
      $settingAfterRollback = Setting::first()->last_fetch_to_file_parser;

      $this->assertCount(0, $episodes);
      $this->assertNull($setting);
      $this->assertCount(0, $episodesAfterRollback);
      $this->assertNull($settingAfterRollback);
    }

    /** @test */
    public function it_should_store_fields_if_movie_found_in_database()
    {
      $this->createMovie();

      $item1 = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_added'));
      $item2 = $this->item->first();

      $this->assertNull($item1->src);
      $this->assertNull($item1->subtitles);
      $this->assertNotNull($item2->src);
      $this->assertNotNull($item2->subtitles);
    }

    /** @test */
    public function it_should_store_fields_for_episodes_if_tv_found_in_database()
    {
      $this->createTv();

      $episodes1 = $this->item->with('episodes')->first()->episodes;
      $this->parser->updateDatabase($this->fpFixtures('tv_added'));
      $episodes2 = $this->item->with('episodes')->first()->episodes;

      $episodes1->each(function($episode) {
        $this->assertNull($episode->src);
        $this->assertNull($episode->subtitles);
      });

      $episodes2->each(function($episode) {
        $this->assertNotNull($episode->src);
        $this->assertNotNull($episode->subtitles);
      });
    }

    /** @test */
    public function it_should_create_movie_and_store_fields_if_not_found_in_database()
    {
      $items = $this->item->get();

      $this->createTmdbMock($this->tmdbFixtures('movie'), $this->tmdbFixtures('alternative_titles_movie'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie_added'));

      $item = $this->item->first();

      $this->assertCount(0, $items);
      $this->assertNotNull($item->src);
      $this->assertNotNull($item->subtitles);
      $this->seeInDatabase('items', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_should_create_tv_with_episodes_and_store_fields_if_not_found_in_database()
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
        $this->assertNotNull($episode->subtitles);
      });
    }

    /** @test */
    public function it_can_update_last_fetch_to_file_parser_timestamp()
    {
      $this->createMovie();

      $this->createTmdbMock($this->tmdbFixtures('movie'), $this->tmdbFixtures('alternative_titles_movie'));
      $parser = app(FileParser::class);

      $setting1 = Setting::first();
      $parser->updateDatabase($this->fpFixtures('movie_added'));
      $setting2 = Setting::first();
      sleep(1);
      $parser->updateDatabase($this->fpFixtures('movie_added'));
      $setting3 = Setting::first();

      $this->assertNull($setting1->last_fetch_to_file_parser);
      $this->assertNotNull($setting2->last_fetch_to_file_parser);
      $this->assertNotEquals($setting2->last_fetch_to_file_parser, $setting3->last_fetch_to_file_parser);
    }

    /** @test */
    public function it_should_remove_fields_from_movie()
    {
      $this->createMovie();
      $this->parser->updateDatabase($this->fpFixtures('movie_added'));

      $withData = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_removed'));
      $withoutData = $this->item->first();

      $this->assertNotNull($withData->src);
      $this->assertNotNull($withData->subtitles);
      $this->assertNull($withoutData->src);
      $this->assertNull($withoutData->subtitles);
    }

    /** @test */
    public function it_should_remove_fields_from_tv_episode()
    {
      $this->createTv();
      $this->parser->updateDatabase($this->fpFixtures('tv_added'));

      $withData = $this->item->with('episodes')->first()->episodes;
      $this->parser->updateDatabase($this->fpFixtures('tv_removed'));
      $withoutData = $this->item->with('episodes')->first()->episodes;

      $withData->each(function($episode) {
        $this->assertNotNull($episode->src);
        $this->assertNotNull($episode->subtitles);
      });

      $withoutData->each(function($episode) {
        $this->assertNull($episode->src);
        $this->assertNull($episode->subtitles);
      });
    }

    /** @test */
    public function it_should_update_fields_if_movie_found_in_database()
    {
      $this->createMovie();
      $this->item->first()->update(['src' => $this->getMovieSrc()]);

      $item = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_updated'));
      $updatedItem = $this->item->first();

      $this->assertEquals($this->getMovieSrc(), $item->src);
      $this->assertNull($item->subtitles);
      $this->assertEquals('NEW SRC', $updatedItem->src);
      $this->assertEquals('NEW SUB', $updatedItem->subtitles);
    }

    /** @test */
    public function it_should_create_movie_and_update_fields_if_not_found_in_database()
    {
      $items = $this->item->get();

      $this->createTmdbMock($this->tmdbFixtures('movie'), $this->tmdbFixtures('alternative_titles_movie'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie_updated'));

      $item = $this->item->first();

      $this->assertCount(0, $items);
      $this->assertEquals('NEW SRC', $item->src);
      $this->assertEquals('NEW SUB', $item->subtitles);
      $this->seeInDatabase('items', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_should_nothing_update_for_movies_if_changed_is_empty()
    {
      $this->createMovie();
      $this->item->first()->update(['src' => $this->getMovieSrc()]);

      $item = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie_updated_empty'));
      $updatedItem = $this->item->first();

      $this->assertEquals($this->getMovieSrc(), $item->src);
      $this->assertNull($item->subtitles);
      $this->assertEquals($this->getMovieSrc(), $updatedItem->src);
      $this->assertNull($updatedItem->subtitles);
    }

    /** @test */
    public function it_should_update_fields_for_episodes_if_tv_found_in_database()
    {
      $this->createTv();

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc()]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv_updated'));
      $updatedEpisodes = $this->episode->get();

      $episodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc(), $episode->src);
        $this->assertNull($episode->subtitles);
      });

      $updatedEpisodes->each(function($episode) {
        $this->assertEquals('NEW SRC', $episode->src);
        $this->assertEquals('NEW SUB', $episode->subtitles);
      });
    }

    /** @test */
    public function it_should_create_tv_with_episodes_and_update_fields_if_not_found_in_database()
    {
      $items = $this->item->get();
      $episodes = $this->episode->first();

      $this->createTmdbMock($this->tmdbFixtures('tv'), $this->tmdbFixtures('alternative_titles_tv'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv_updated_once'));

      $updatedEpisodes = $this->episode->first();

      $this->assertCount(0, $items);
      $this->assertNull($episodes);
      $this->seeInDatabase('items', [
        'title' => 'Game of Thrones'
      ]);

      $this->assertEquals('NEW SRC', $updatedEpisodes->src);
      $this->assertEquals('NEW SUB', $updatedEpisodes->subtitles);
    }

    /** @test */
    public function it_should_nothing_update_for_episodes_if_changed_is_empty()
    {
      $this->createTv();

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc()]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv_updated_empty'));
      $updatedEpisodes = $this->episode->get();

      $episodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc(), $episode->src);
        $this->assertNull($episode->subtitles);
      });

      $updatedEpisodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc(), $episode->src);
        $this->assertNull($episode->subtitles);
      });
    }

    private function createTmdbMock($fixture, $fixture2)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture2),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));

      // Mock this to avoid unknown requests to TMDb (get seasons and then get episodes for each season)
      $mock = Mockery::mock(app(TMDB::class))->makePartial();
      $mock->shouldReceive('tvEpisodes')->andReturn(json_decode($this->tmdbFixtures('episodes')));

      $this->app->instance(TMDB::class, $mock);
    }
  }
