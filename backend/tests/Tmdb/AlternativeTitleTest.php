<?php

  use App\AlternativeTitle;
  use App\Http\Controllers\ItemController;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use Illuminate\Foundation\Testing\DatabaseMigrations;
  use Illuminate\Support\Facades\Input;
  use GuzzleHttp\Psr7\Response;

  class AlternativeTitleTest extends TestCase {

    use DatabaseMigrations;

    protected $movie;
    protected $tv;

    protected $movieFixture;
    protected $tvFixture;

    public function setUp()
    {
      parent::setUp();

      $this->createFactories();
      $this->createFixtures();
    }

    /** @test */
    public function it_can_store_alternative_titles_for_movies()
    {
      Input::replace(['item' => $this->movie]);

      $tmdbMock = $this->createTmdbMock($this->movieFixture);

      $itemController = new ItemController(new Item(), new Storage());
      $itemController->add($tmdbMock);

      $this->assertCount(4, AlternativeTitle::all());

      $this->seeInDatabase('alternative_titles', [
        'title' => 'Disney Pixar Finding Nemo'
      ]);
    }

    /** @test */
    public function it_can_store_alternative_titles_for_tv_shows()
    {
      Input::replace(['item' => $this->tv]);

      $tmdbMock = $this->createTmdbMock($this->tvFixture);

      $itemControllerMock = $this->getMockBuilder(ItemController::class)
        ->setConstructorArgs([new Item(), new Storage()])
        ->setMethods(['createEpisodes'])
        ->getMock();

      $itemControllerMock->method('createEpisodes')->willReturn(null);

      $itemControllerMock->add($tmdbMock);

      $this->assertCount(3, AlternativeTitle::all());

      $this->seeInDatabase('alternative_titles', [
        'title' => 'DBZ'
      ]);
    }

    private function createTmdbMock($fixture)
    {
      $mock = new MockHandler([
        new Response(200, ['Content-Type' => 'application/json'], $fixture),
      ]);

      $handler = HandlerStack::create($mock);
      $client = new Client(['handler' => $handler]);

      $tmdbMock = $this->getMockBuilder(TMDB::class)
        ->setConstructorArgs([$client])
        ->setMethods(['hasLimitRemaining'])
        ->getMock();

      $tmdbMock->method('hasLimitRemaining')->willReturn(40);

      return $tmdbMock;
    }

    private function createFactories()
    {
      $this->movie = factory(App\Item::class)->states('movie')->make([
        'title' => 'Findet Nemo',
        'tmdb_id' => 12
      ]);

      $this->tv = factory(App\Item::class)->states('tv')->make([
        'title' => 'Dragonball Z',
        'tmdb_id' => 12971
      ]);
    }

    private function createFixtures()
    {
      $this->movieFixture = file_get_contents(__DIR__ . '/../fixtures/alternative_titles_movie.json');
      $this->tvFixture = file_get_contents(__DIR__ . '/../fixtures/alternative_titles_tv.json');
    }
  }
