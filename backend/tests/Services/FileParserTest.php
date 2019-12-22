<?php

  namespace Tests\Services;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Facades\Hash;
  use Tests\TestCase;
  use App\Episode;
  use App\Item;
  use App\Setting;
  use App\User;
  use App\Services\FileParser;
  use Tests\Traits\Factories;
  use Tests\Traits\Fixtures;
  use Tests\Traits\Mocks;

  class FileParserTest extends TestCase {

    use RefreshDatabase;
    use Factories;
    use Fixtures;
    use Mocks;

    private $item;
    private $parser;
    private $episode;
    private $user;

    public function setUp(): void
    {
      parent::setUp();

      $this->user = User::create(['username' => 'jon', 'password' => Hash::make('snow')]);
      $this->item = app(Item::class);
      $this->episode = app(Episode::class);
      $this->parser = app(FileParser::class);

      $this->createStorageDownloadsMock();
      $this->createImdbRatingMock();
    }

    /** @test */
    public function it_should_make_a_rollback_if_status_for_movie_is_unknown()
    {
      $items = $this->item->get();
      $setting = Setting::first()->last_fetch_to_file_parser;

      $this->createGuzzleMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
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

      $this->createGuzzleMock($this->tmdbFixtures('tv/tv'), $this->tmdbFixtures('tv/alternative_titles'));
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
    public function it_should_repopulate_fields_for_movies()
    {
      $this->createMovie(['fp_name' => 'warcraft', 'src' => $this->getMovieSrc(), 'subtitles' => 'SUB']);

      $item = $this->item->first();
      $this->parser->updateDatabase($this->fpFixtures('movie/updated_is_empty'));
      $updatedItem = $this->item->first();

      $this->assertEquals($this->getMovieSrc(), $item->src);
      $this->assertEquals('SUB', $item->subtitles);
      $this->assertEquals('warcraft', $item->fp_name);
      $this->assertEquals($this->getMovieSrc(), $updatedItem->src);
      $this->assertEquals('SUB', $updatedItem->subtitles);
      $this->assertEquals('warcraft', $updatedItem->fp_name);
    }

    /** @test */
    public function it_should_repopulate_fields_for_tv_episodes()
    {
      $this->createTv();

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc($episode), 'fp_name' => 'Game of Thrones']);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv/updated_is_empty'));
      $updatedEpisodes = $this->episode->get();

      $episodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc($episode), $episode->src);
        $this->assertEquals('Game of Thrones', $episode->fp_name);
        $this->assertNull($episode->subtitles);
      });

      $updatedEpisodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc($episode), $episode->src);
        $this->assertEquals('Game of Thrones', $episode->fp_name);
        $this->assertNull($episode->subtitles);
      });
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
        $this->assertNull($episode->fp_name);
      });

      $episodes2->each(function($episode) {
        $this->assertNotNull($episode->src);
        $this->assertNotNull($episode->subtitles);
        $this->assertNotNull($episode->fp_name);
      });
    }

    /** @test */
    public function it_should_create_movie_and_store_fields_if_not_found_in_database()
    {
      $items = $this->item->get();

      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/movie'),
        $this->tmdbFixtures('movie/details'),
        $this->tmdbFixtures('movie/alternative_titles')
      );

      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/added'));

      $item = $this->item->first();

      $this->assertCount(0, $items);
      $this->assertNotNull($item->src);
      $this->assertNotNull($item->subtitles);
      $this->assertNotNull($item->fp_name);
      $this->assertDatabaseHas('items', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_should_create_tv_with_episodes_and_store_fields_if_not_found_in_database()
    {
      $items = $this->item->get();
      $episodes1 = $this->episode->get();

      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/tv'),
        $this->tmdbFixtures('tv/details'),
        $this->tmdbFixtures('tv/alternative_titles')
      );
      $this->createTmdbEpisodeMock();

      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/added'));

      $episodes2 = $this->episode->get();

      $this->assertCount(0, $items);
      $this->assertCount(0, $episodes1);
      $this->assertCount(4, $episodes2);
      $this->assertDatabaseHas('items', [
        'title' => 'Game of Thrones'
      ]);

      $episodes2->each(function($episode) {
        $this->assertNotNull($episode->src);
        $this->assertNotNull($episode->subtitles);
        $this->assertNotNull($episode->fp_name);
      });
    }

    /** @test */
    public function it_should_update_last_fetch_to_file_parser_timestamp()
    {
      $this->createMovie();

      $this->createGuzzleMock($this->tmdbFixtures('movie/movie'), $this->tmdbFixtures('movie/alternative_titles'));
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
    public function it_should_update_fields_for_episodes_if_tv_found_in_database()
    {
      $this->createTv(['fp_name' => 'Game of Thrones']);

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc($episode)]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv/updated'));
      $updatedEpisodes = $this->episode->get();

      $episodes->each(function($episode) {
        $this->assertEquals($this->getTvSrc($episode), $episode->src);
        $this->assertNull($episode->subtitles);
      });

      $updatedEpisodes->each(function($episode) {
        $this->assertEquals('NEW SRC', $episode->src);
        $this->assertEquals('NEW SUB', $episode->subtitles);
        $this->assertEquals('Game of Thrones', $episode->fp_name);
      });
    }

    /** @test */
    public function it_should_update_proper_fields_for_episodes_if_season_and_episode_number_changed()
    {
      $this->createTv(['fp_name' => 'Game of Thrones']);

      $this->episode->get()->each(function($episode) {
        $episode->update(['src' => $this->getTvSrc($episode)]);
      });

      $episodes = $this->episode->get();
      $this->parser->updateDatabase($this->fpFixtures('tv/updated_one'));
      $updatedEpisodes = $this->episode->get();

      $this->assertNotNull($episodes[0]->src);
      $this->assertNotNull($episodes[0]->src);
      $this->assertNull($updatedEpisodes[0]->src);
      $this->assertNull($updatedEpisodes[0]->src);

      $this->assertNotEquals('NEW SRC UPDATED', $episodes[1]->src);
      $this->assertNotEquals('NEW SUB UPDATED', $episodes[1]->subtitles);
      $this->assertNull($episodes[1]->fp_name);
      $this->assertEquals('NEW SRC UPDATED', $updatedEpisodes[1]->src);
      $this->assertEquals('NEW SUB UPDATED', $updatedEpisodes[1]->subtitles);
      $this->assertEquals('Game of Thrones', $updatedEpisodes[1]->fp_name);
    }

    /** @test */
    public function it_should_update_empty_movie_if_found_in_tmdb()
    {
      $this->createMovie(['title' => 'NOT EXISTS MOVIE', 'tmdb_id' => null, 'fp_name' => 'NOT EXISTS MOVIE']);

      $empty = $this->item->first();

      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/movie'),
        $this->tmdbFixtures('movie/details'),
        $this->tmdbFixtures('movie/alternative_titles')
      );

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

      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/tv'),
        $this->tmdbFixtures('tv/details'),
        $this->tmdbFixtures('tv/alternative_titles')
      );
      $this->createTmdbEpisodeMock();

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
      $this->createGuzzleMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('movie/alternative_titles'));
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
      $this->createGuzzleMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('tv/alternative_titles'));
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
      $this->createGuzzleMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('movie/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('movie/added_not_found'));

      $item = $this->item->first();

      $this->assertEquals('NOT EXISTS MOVIE', $item->fp_name);
      $this->assertNull($item->tmdb_id);
    }

    /** @test */
    public function it_should_create_empty_tv_without_episodes_from_added_if_not_found_in_tmdb()
    {
      $this->createGuzzleMock($this->tmdbFixtures('empty'), $this->tmdbFixtures('tv/alternative_titles'));
      $parser = app(FileParser::class);
      $parser->updateDatabase($this->fpFixtures('tv/added_not_found'));

      $item = $this->item->first();
      $episodes = $this->episode->get();

      $this->assertCount(0, $episodes);
      $this->assertEquals('NOT EXISTS TV', $item->fp_name);
      $this->assertNull($item->tmdb_id);
    }

    /** @test */
    public function it_should_use_http_basic_auth()
    {
      $this->patch('/api/update-files')
        ->assertStatus(401);

      $this->patch('/api/update-files', [], $this->http_login())
        ->assertSuccessful();
    }

    /** @test */
    public function it_should_update_database_with_given_json_param()
    {
      $timestamp = 9999;

      $settings = Setting::first();
      $settings->last_fetch_to_file_parser = $timestamp;
      $settings->save();
      $this->assertEquals($timestamp, Setting::first()->last_fetch_to_file_parser->timestamp);

      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/tv'),
        $this->tmdbFixtures('tv/details'),
        $this->tmdbFixtures('tv/alternative_titles')
      );
      $this->createTmdbEpisodeMock();

      $fixture = json_encode($this->fpFixtures("tv/added"));

      $this->call('PATCH', '/api/update-files', [], [], [], $this->http_login(), $fixture)
        ->assertSuccessful();

      $episodes = $this->episode->get();

      $this->assertCount(4, $episodes);
      $this->assertGreaterThan($timestamp, Setting::first()->last_fetch_to_file_parser->timestamp);

      $settings->last_fetch_to_file_parser = null;
      $settings->save();

      $this->call('PATCH', '/api/update-files', [], [], [], $this->http_login(), $fixture)
        ->assertSuccessful();

      $episodes = $this->episode->get();

      $this->assertCount(4, $episodes);
      $this->assertGreaterThan($timestamp, Setting::first()->last_fetch_to_file_parser->timestamp);
    }

    /** @test */
    public function it_returns_last_fetch_timestamp()
    {
      $timestamp = 9999;

      $settings = Setting::first();
      $settings->last_fetch_to_file_parser = $timestamp;
      $settings->save();

      $this->getJson('/api/last-fetched')
        ->assertJson(['last_fetch_to_file_parser' => $timestamp]);

      $settings->last_fetch_to_file_parser = null;
      $settings->save();

      $this->getJson('/api/last-fetched')
        ->assertJson(['last_fetch_to_file_parser' => 0]);
    }

    private function http_login()
    {
      return [
        'PHP_AUTH_USER' => 'jon',
        'PHP_AUTH_PW' => 'snow',
      ];
    }
  }
