<?php

  use App\Item;
  use App\Services\Models\AlternativeTitleService;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use App\Services\Storage;
  use Illuminate\Foundation\Testing\DatabaseMigrations;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;

  class ItemServiceTest extends TestCase {

    use DatabaseMigrations;

    private $item;
    private $itemService;

    public function setUp()
    {
      parent::setUp();

      $this->item = app(Item::class);
      $this->itemService = app(ItemService::class);
    }

    /** @test */
    public function it_should_create_a_new_movie()
    {
      $this->createEpisodeMock();
      $this->createStorageMock();
      $this->createAlternativeTitleMock();

      $itemService = app(ItemService::class);

      $item1 = $this->item->all();
      $itemService->create($this->floxFixtures('movie'));
      $item2 = $this->item->all();

      $this->assertCount(0, $item1);
      $this->assertCount(1, $item2);
      $this->seeInDatabase('items', [
        'title' => 'Warcraft: The Beginning',
      ]);
    }

    /** @test */
    public function it_should_create_a_new_tv_show()
    {
      $this->createEpisodeMock();
      $this->createStorageMock();
      $this->createAlternativeTitleMock();

      $itemService = app(ItemService::class);

      $item1 = $this->item->all();
      $itemService->create($this->floxFixtures('tv'));
      $item2 = $this->item->all();

      $this->assertCount(0, $item1);
      $this->assertCount(1, $item2);
      $this->seeInDatabase('items', [
        'title' => 'Game of Thrones',
      ]);
    }

    /** @test */
    public function it_should_find_item_in_database()
    {
      $this->createMovie();

      $itemFromTitle = $this->itemService->findBy('title', 'craft', 'movies');
      $itemFromId = $this->itemService->findBy('tmdb_id', 68735);

      $this->assertEquals(68735, $itemFromTitle->tmdb_id);
      $this->assertEquals(68735, $itemFromId->tmdb_id);
    }

    /** @test */
    public function it_should_find_item_in_database_by_strict_search()
    {
      $this->createMovie();

      $notFound = $this->itemService->findBy('title_strict', 'craft', 'movies');
      $found = $this->itemService->findBy('title_strict', 'Warcraft: The Beginning', 'movies');

      $this->assertNull($notFound);
      $this->assertEquals(68735, $found->tmdb_id);
    }

    /** @test */
    public function it_should_change_rating()
    {
      $this->createMovie();

      $item1 = $this->item->find(1);
      $this->itemService->changeRating(1, 3);
      $item2 = $this->item->find(1);

      $this->assertEquals(1, $item1->rating);
      $this->assertEquals(3, $item2->rating);
    }

    /** @test */
    public function it_should_remove_a_item()
    {
      $this->createMovie();

      $item1 = $this->item->find(1);
      $this->itemService->remove(1);
      $item2 = $this->item->find(1);

      $this->assertNotNull($item1);
      $this->assertNull($item2);
    }

    /** @test */
    public function it_should_update_genre_for_a_movie()
    {
      $user = factory(App\User::class)->create();
      $this->createMovie();

      $this->createGuzzleMock($this->tmdbFixtures('movie/details'));

      $withoutGenre = Item::find(1);
      $this->actingAs($user)->json('PATCH', 'api/update-genre');
      $withGenre = Item::find(1);

      $this->assertEmpty($withoutGenre->genre);
      $this->assertNotEmpty($withGenre->genre);
    }

    /** @test */
    public function it_should_update_genre_for_a_tv_show()
    {
      $user = factory(App\User::class)->create();
      $this->createTv();

      $this->createGuzzleMock($this->tmdbFixtures('tv/details'));

      $withoutGenre = Item::find(1);
      $this->actingAs($user)->json('PATCH', 'api/update-genre');
      $withGenre = Item::find(1);

      $this->assertEmpty($withoutGenre->genre);
      $this->assertNotEmpty($withGenre->genre);
    }

    private function createGuzzleMock($fixture)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));
    }

    private function mock($class)
    {
      $mock = Mockery::mock($class)->makePartial();

      $this->app->instance($class, $mock);

      return $mock;
    }

    private function createStorageMock()
    {
      $storageMock = $this->mock(Storage::class);
      $storageMock->shouldReceive('downloadPoster')->once()->andReturn(true);
    }

    private function createEpisodeMock()
    {
      $episodeMock = $this->mock(EpisodeService::class);
      $episodeMock->shouldReceive('create')->once()->andReturn(true);
    }

    private function createAlternativeTitleMock()
    {
      $alternativeTitleMock = $this->mock(AlternativeTitleService::class);
      $alternativeTitleMock->shouldReceive('create')->once()->andReturn(true);
    }
  }
