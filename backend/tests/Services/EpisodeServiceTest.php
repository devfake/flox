<?php

  namespace Tests\Services;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use App\Episode;
  use App\Item;
  use App\Services\Models\EpisodeService;
  use Tests\Traits\Factories;
  use Tests\Traits\Fixtures;
  use Tests\Traits\Mocks;

  class EpisodeServiceTest extends TestCase {

    use RefreshDatabase;
    use Factories;
    use Fixtures;
    use Mocks;

    private $episode;
    private $episodeService;
    private $item;

    public function setUp(): void
    {
      parent::setUp();

      $this->episode = app(Episode::class);
      $this->episodeService = app(EpisodeService::class);
      $this->item = app(Item::class);
    }

    /** @test */
    public function it_should_create_episodes()
    {
      $tv = $this->getTv();

      $this->createTmdbEpisodeMock();
      $episodeService = app(EpisodeService::class);

      $episodes1 = $this->episode->all();
      $episodeService->create($tv);
      $episodes2 = $this->episode->all();

      $this->assertCount(0, $episodes1);
      $this->assertCount(4, $episodes2);
    }

    /** @test */
    public function it_should_create_episodes_if_new_from_tmdb_are_available()
    {
      $this->createTv();

      $this->createTmdbEpisodeMock();
      $episodeService = app(EpisodeService::class);

      $this->episode->destroy(1);

      $item = $this->item->first();
      $episodes = $this->episode->all();
      $episodeService->create($item);
      $updatedEpisodes = $this->episode->all();

      $this->assertCount(3, $episodes);
      $this->assertCount(4, $updatedEpisodes);
    }

    /** @test */
    public function it_should_update_fields_on_refresh()
    {
      $this->createTv();

      $this->createTmdbEpisodeMock();
      $episodeService = app(EpisodeService::class);

      $this->episode->first()->update(['name' => 'UPDATE ME']);

      $item = $this->item->first();
      $episode = $this->episode->first();
      $episodeService->create($item);
      $updatedEpisode = $this->episode->first();

      $this->assertEquals('UPDATE ME', $episode->name);
      $this->assertEquals('name', $updatedEpisode->name);
    }

    /** @test */
    public function it_should_set_a_episode_as_seen_or_unseen()
    {
      $this->createTv();

      $episode1 = $this->episode->find(1);
      $this->episodeService->toggleSeen(1);
      $episode2 = $this->episode->find(1);
      $this->episodeService->toggleSeen(1);
      $episode3 = $this->episode->find(1);

      $this->assertEquals(0, $episode1->seen);
      $this->assertEquals(1, $episode2->seen);
      $this->assertEquals(0, $episode3->seen);
    }

    /** @test */
    public function it_should_set_all_episodes_of_a_season_as_seen_or_unseen()
    {
      $this->createTv();

      $season = 1;
      $tmdbId = 1399;

      $episodes1 = $this->episode->where('season_number', $season)->get();
      $this->episodeService->toggleSeason($tmdbId, $season, 1);
      $episodes2 = $this->episode->where('season_number', $season)->get();
      $this->episodeService->toggleSeason($tmdbId, $season, 0);
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

      $episodes1 = $this->episode->findByTmdbId(1399)->get();
      $this->episodeService->remove(1399);
      $episodes2 = $this->episode->findByTmdbId(1399)->get();

      $this->assertNotNull($episodes1);
      $this->assertCount(0, $episodes2);
    }

    /** @test */
    public function it_should_update_items_from_one_episode()
    {
      $this->createTv();

      $item = $this->item->find(1);
      sleep(1);
      $this->episodeService->toggleSeen(1);
      $itemUpdated = $this->item->find(1);

      $this->assertNotEquals($itemUpdated->last_seen_at, $item->last_seen_at);
    }

    /** @test */
    public function it_should_update_items_only_on_seen_from_one_episode()
    {
      $this->createTv();

      $this->episodeService->toggleSeen(1);
      $item = $this->item->find(1);
      sleep(1);
      $this->episodeService->toggleSeen(1);
      $itemUpdated = $this->item->find(1);

      $this->assertEquals($itemUpdated->last_seen_at, $item->last_seen_at);
    }

    /** @test */
    public function it_should_update_items_from_all_episodes()
    {
      $this->createTv();

      $item = $this->item->find(1);
      sleep(1);
      $this->episodeService->toggleSeason(1399, 1, 1);
      $itemUpdated = $this->item->find(1);

      $this->assertNotEquals($itemUpdated->last_seen_at, $item->last_seen_at);
    }

    /** @test */
    public function it_should_update_items_only_on_seen_from_all_episodes()
    {
      $this->createTv();

      $item = $this->item->find(1);
      sleep(1);
      $this->episodeService->toggleSeason(1399, 1, 0);
      $itemUpdated = $this->item->find(1);

      $this->assertEquals($itemUpdated->last_seen_at, $item->last_seen_at);
    }
  }
