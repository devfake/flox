<?php

  use App\Episode;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use App\Services\TMDB;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class EpisodeServiceTest extends TestCase {

    use DatabaseMigrations;

    private $episode;

    public function setUp()
    {
      parent::setUp();

      $this->episode = app(Episode::class);
    }

    /** @test */
    public function it_should_create_episodes()
    {
      $tv = $this->getTv();

      $this->createTmdbMock();
      $episodeService = app(EpisodeService::class);

      $episodes1 = $this->episode->all();
      $episodeService->create($tv);
      $episodes2 = $this->episode->all();

      $this->assertCount(0, $episodes1);
      $this->assertCount(4, $episodes2);
    }

    /** @test */
    public function it_should_set_a_episode_as_seen_or_unseen()
    {
      $this->createTv();
      $episodeService = app(EpisodeService::class);

      $episode1 = $this->episode->find(1);
      $episodeService->toggleSeen(1);
      $episode2 = $this->episode->find(1);
      $episodeService->toggleSeen(1);
      $episode3 = $this->episode->find(1);

      $this->assertEquals(0, $episode1->seen);
      $this->assertEquals(1, $episode2->seen);
      $this->assertEquals(0, $episode3->seen);
    }

    /** @test */
    public function it_should_set_all_episodes_of_a_season_as_seen_or_unseen()
    {
      $this->createTv();
      $episodeService = app(EpisodeService::class);

      $season = 1;
      $tmdbId = 1399;

      $episodes1 = $this->episode->where('season_number', $season)->get();
      $episodeService->toggleSeason($tmdbId, 1, 1);
      $episodes2 = $this->episode->where('season_number', $season)->get();
      $episodeService->toggleSeason($tmdbId, 1, 0);
      $episodes3 = $this->episode->where('season_number', $season)->get();

      $episodes1->each(function($episode) {
        $this->assertEquals(0, $episode->seen);
      });
      $episodes2->each(function($episode) {
        $this->assertEquals(1, $episode->seen);
      });
      $episodes3->each(function($episode) {
        $this->assertEquals(0, $episode->seen);
      });
    }

    /** @test */
    public function it_should_remove_episodes()
    {
      $this->createTv();
      $episodeService = app(EpisodeService::class);

      $episodes1 = $this->episode->findByTmdbId(1399)->get();
      $episodeService->remove(1399);
      $episodes2 = $this->episode->findByTmdbId(1399)->get();

      $this->assertNotNull($episodes1);
      $this->assertCount(0, $episodes2);
    }

    private function createTmdbMock()
    {
      // Mock this to avoid unknown requests to TMDb (get seasons and then get episodes for each season)
      $mock = Mockery::mock(app(TMDB::class))->makePartial();
      $mock->shouldReceive('tvEpisodes')->andReturn(json_decode($this->tmdbFixtures('tv/episodes')));

      $this->app->instance(TMDB::class, $mock);
    }
  }