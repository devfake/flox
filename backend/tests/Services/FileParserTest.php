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

    /**
     * @test
     * @group file-parser
     */
    public function it_should_call_file_parser_successfully()
    {
      $files = (array) $this->parser->fetch();

      $this->assertArrayHasKey('tv', $files);
      $this->assertArrayHasKey('movies', $files);

      $this->assertCount(8, $files['tv']);
      $this->assertCount(2, $files['movies']);
    }

    /** @test */
    public function it_should_make_a_rollback_if_status_for_movie_is_unknown()
    {
      $items = $this->item->get();
      $setting = Setting::first()->last_fetch_to_file_parser;

      $this->createTmdbMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/unknown'));

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

      $this->createTmdbMock($this->tmdbFixtures('tv/tv'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/unknown'));

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
      $this->createMovie(['fp_name' => 'warcraft']);

      $item1 = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie/added'));
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
      $this->parser->updateDatabase($this->fpFixtures('tv/added'));
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

      $this->createTmdbMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/added'));

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

      $this->createTmdbMock($this->tmdbFixtures('tv/tv'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/added'));

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
    public function it_should_update_last_fetch_to_file_parser_timestamp()
    {
      $this->createMovie();

      $this->createTmdbMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);

      $setting1 = Setting::first();
      $parser->updateDatabase($this->fpFixtures('movie/added'));
      $setting2 = Setting::first();
      sleep(1);
      $parser->updateDatabase($this->fpFixtures('movie/added'));
      $setting3 = Setting::first();

      $this->assertNull($setting1->last_fetch_to_file_parser);
      $this->assertNotNull($setting2->last_fetch_to_file_parser);
      $this->assertNotEquals($setting2->last_fetch_to_file_parser, $setting3->last_fetch_to_file_parser);
    }

    /** @test */
    public function it_should_remove_fields_from_movie()
    {
      $this->createMovie(['fp_name' => 'warcraft']);
      $this->parser->updateDatabase($this->fpFixtures('movie/added'));

      $withData = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie/removed'));
      $withoutData = $this->item->first();

      $this->assertNotNull($withData->src);
      $this->assertNotNull($withData->subtitles);
      $this->assertNotNull($withData->fp_name);
      $this->assertNull($withoutData->src);
      $this->assertNull($withoutData->subtitles);
      $this->assertNull($withoutData->fp_name);
    }

    /** @test */
    public function it_should_remove_fields_from_tv_episode()
    {
      $this->createTv();
      $this->parser->updateDatabase($this->fpFixtures('tv/added'));

      $withData = $this->item->with('episodes')->first()->episodes;
      $this->parser->updateDatabase($this->fpFixtures('tv/removed'));
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
      $this->createMovie(['fp_name' => 'warcraft', 'src' => $this->getMovieSrc()]);

      $item = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie/updated'));
      $updatedItem = $this->item->first();

      $this->assertEquals($this->getMovieSrc(), $item->src);
      $this->assertEquals('warcraft', $item->fp_name);
      $this->assertNull($item->subtitles);
      $this->assertEquals('NEW SRC', $updatedItem->src);
      $this->assertEquals('NEW SUB', $updatedItem->subtitles);
      $this->assertEquals('NEW NAME', $updatedItem->fp_name);
    }

    /** @test */
    public function it_should_nothing_update_for_movies_if_changed_is_empty()
    {
      $this->createMovie();
      $this->item->first()->update(['src' => $this->getMovieSrc()]);

      $item = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie/updated_is_empty'));
      $updatedItem = $this->item->first();

      $this->assertEquals($this->getMovieSrc(), $item->src);
      $this->assertNull($item->subtitles);
      $this->assertEquals($this->getMovieSrc(), $updatedItem->src);
      $this->assertNull($updatedItem->subtitles);
    }

    /** @test */
    public function it_should_update_fields_for_episodes_if_tv_found_in_database()
    {
      $this->createTv(['fp_name' => 'Game of Thrones']);

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc()]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv/updated'));
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
    public function it_should_nothing_update_for_episodes_if_changed_is_empty()
    {
      $this->createTv();

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc()]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv/updated_is_empty'));
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

    /** @test */
    public function it_should_update_empty_movie_if_found_in_tmdb()
    {
      $this->createMovie(['title' => 'NOT EXISTS MOVIE', 'tmdb_id' => null, 'fp_name' => 'NOT EXISTS MOVIE']);

      $empty = $this->item->first();

      $this->createTmdbMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/updated_found'));

      $updated = $this->item->first();

      $this->assertEquals('NOT EXISTS MOVIE', $empty->fp_name);
      $this->assertEquals('NOT EXISTS MOVIE', $empty->title);
      $this->assertNull($empty->tmdb_id);
      $this->assertEquals('warcraft', $updated->fp_name);
      $this->assertEquals('Warcraft: The Beginning', $updated->title);
      $this->assertEquals(68735, $updated->tmdb_id);
    }

    /** @test */
    public function it_should_update_empty_tv_and_episodes_if_found_in_tmdb()
    {
      $this->createTv(['title' => 'NOT EXISTS TV', 'tmdb_id' => null, 'fp_name' => 'NOT EXISTS TV'], false);

      $empty = $this->item->first();

      $this->createTmdbMock($this->tmdbFixtures('tv/tv'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/updated_found'));

      $updated = $this->item->first();
      $episodes = $this->episode->get();

      $this->assertEquals('NOT EXISTS TV', $empty->fp_name);
      $this->assertEquals('NOT EXISTS TV', $empty->title);
      $this->assertNull($empty->tmdb_id);
      $this->assertEquals('Game of Thrones', $updated->fp_name);
      $this->assertEquals('Game of Thrones', $updated->title);
      $this->assertEquals(1399, $updated->tmdb_id);

      $episodes->each(function($episode) {
        $this->assertEquals('NEW SRC', $episode->src);
      });
    }

    /** @test */
    public function it_should_create_empty_movie_from_updated_if_not_found_in_tmdb()
    {
      $this->createTmdbMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/updated_not_found'));

      $item = $this->item->first();

      $this->assertEquals('NEW NAME', $item->fp_name);
      $this->assertEquals('NEW SRC', $item->src);
      $this->assertNull($item->tmdb_id);
    }

    /** @test */
    public function it_should_create_empty_tv_without_episodes_from_updated_if_not_found_in_tmdb()
    {
      $this->createTmdbMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/updated_not_found'));

      $item = $this->item->first();
      $episodes = $this->episode->get();

      $this->assertCount(0, $episodes);
      $this->assertEquals('NEW NAME', $item->fp_name);
      $this->assertNull($item->tmdb_id);
    }

    /** @test */
    public function it_should_create_empty_movie_from_added_if_not_found_in_tmdb()
    {
      $this->createTmdbMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/added_not_found'));

      $item = $this->item->first();

      $this->assertEquals('NOT EXISTS MOVIE', $item->fp_name);
      $this->assertNull($item->tmdb_id);
    }

    /** @test */
    public function it_should_create_empty_tv_without_episodes_from_added_if_not_found_in_tmdb()
    {
      $this->createTmdbMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/added_not_found'));

      $item = $this->item->first();
      $episodes = $this->episode->get();

      $this->assertCount(0, $episodes);
      $this->assertEquals('NOT EXISTS TV', $item->fp_name);
      $this->assertNull($item->tmdb_id);
    }

    /** @test **/
    public function it_should_use_http_basic_auth()
    {
      $this->patch('/api/update-files');
      $this->assertResponseStatus(401);

      $this->patch('/api/update-files', [], $this->http_login());
      $this->assertResponseOk();
    }

    /** @test **/
    public function it_should_update_database_with_given_json_param()
    {
      $this->createTmdbMock($this->tmdbFixtures('tv/tv'), $this->tmdbFixtures('tv/alternative_titles'));
      $fixture = json_encode($this->fpFixtures("tv/added"));

      $this->call('PATCH', '/api/update-files', [], [], [], $this->http_login(), $fixture);
      $this->assertResponseOk();

      $episodes = $this->episode->get();

      $this->assertCount(4, $episodes);
    }

    private function http_login()
    {
      return [
        'PHP_AUTH_USER' => 'jon',
        'PHP_AUTH_PW' => 'snow',
      ];
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
      $mock->shouldReceive('tvEpisodes')->andReturn(json_decode($this->tmdbFixtures('tv/episodes')));

      $this->app->instance(TMDB::class, $mock);
    }
  }
