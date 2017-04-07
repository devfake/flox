<?php

  use App\Item;
  use App\Services\Models\ItemService;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class ItemServiceTest extends TestCase {

    use DatabaseMigrations;
    use Factories;
    use Fixtures;
    use Mocks;

    private $item;
    private $itemService;

    public function setUp()
    {
      parent::setUp();

      $this->item = app(Item::class);
      $this->itemService = app(ItemService::class);

      $this->createStorageDownloadsMock();
    }

    /** @test */
    public function it_should_create_a_new_movie()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('movie/details'),
        $this->tmdbFixtures('movie/alternative_titles')
      );

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
      $this->createGuzzleMock(
        $this->tmdbFixtures('tv/details'),
        $this->tmdbFixtures('tv/alternative_titles')
      );

      $this->createTmdbEpisodeMock();

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
      $user = $this->createUser();
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
      $user = $this->createUser();
      $this->createTv();

      $this->createGuzzleMock($this->tmdbFixtures('tv/details'));

      $withoutGenre = Item::find(1);
      $this->actingAs($user)->json('PATCH', 'api/update-genre');
      $withGenre = Item::find(1);

      $this->assertEmpty($withoutGenre->genre);
      $this->assertNotEmpty($withGenre->genre);
    }
    
    /** @test */
    public function it_should_parse_correct_imdb_id()
    {
      $idMovie = $this->itemService->parseImdbId(json_decode($this->tmdbFixtures('movie/details')));
      $idTv = $this->itemService->parseImdbId(json_decode($this->tmdbFixtures('tv/details')));

      $this->assertEquals('tt0803096', $idMovie);
      $this->assertEquals('tt0944947', $idTv);
    }

    /** @test */
    public function it_should_parse_correct_youtube_key()
    {
      $this->createGuzzleMock(
        $this->tmdbFixtures('videos'),
        $this->tmdbFixtures('videos')
      );

      $itemService = app(ItemService::class);

      $fixtureMovie = json_decode($this->tmdbFixtures('movie/details'));
      $fixtureTv = json_decode($this->tmdbFixtures('tv/details'));

      $foundInDetailsMovie = $itemService->parseYoutubeKey($fixtureMovie, 'movie');
      $foundInDetailsTv = $itemService->parseYoutubeKey($fixtureTv, 'tv');

      $fixtureMovie->videos->results = null;
      $fixtureTv->videos->results = null;

      $fallBackMovie = $itemService->parseYoutubeKey($fixtureMovie, 'movie');
      $fallBackTv = $itemService->parseYoutubeKey($fixtureMovie, 'tv');

      $this->assertEquals('2Rxoz13Bthc', $foundInDetailsMovie);
      $this->assertEquals('BpJYNVhGf1s', $foundInDetailsTv);
      $this->assertEquals('qnIhJwhBeqY', $fallBackMovie);
      $this->assertEquals('qnIhJwhBeqY', $fallBackTv);
    }
  }
