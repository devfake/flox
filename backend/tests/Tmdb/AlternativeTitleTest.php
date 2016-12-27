<?php

  use App\AlternativeTitle;
  use App\Http\Controllers\ItemController;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use Illuminate\Foundation\Testing\DatabaseMigrations;
  use Illuminate\Support\Facades\Input;
  use GuzzleHttp\Psr7;
  use GuzzleHttp\Psr7\Response;

  class AlternativeTitleTest extends TestCase {

    use DatabaseMigrations;

    protected $mock;

    protected $movie;
    protected $tv;

    protected $movieFixture;
    protected $tvFixture;

    public function setUp()
    {
      parent::setUp();

      $this->mock = $this->getMockBuilder(TMDB::class)->setMethods(['fetchAlternativeTitles', 'hasLimitRemaining'])->getMock();
      $this->mock->method('hasLimitRemaining')->willReturn(40);

      $this->movie = factory(App\Item::class)->make(['title' => 'Findet Nemo', 'media_type' => 'movie', 'tmdb_id' => 12]);
      $this->tv = factory(App\Item::class)->make(['title' => 'Dragonball Z', 'media_type' => 'tv', 'tmdb_id' => 12971]);

      $this->movieFixture = file_get_contents(__DIR__ . '/../fixtures/alternative_titles_movie.json');
      $this->tvFixture = file_get_contents(__DIR__ . '/../fixtures/alternative_titles_tv.json');
    }

    /** @test */
    public function it_can_store_alternative_titles_for_movies()
    {
      Input::replace(['item' => $this->movie]);

      $this->assertCount(0, AlternativeTitle::all());

      $stream = Psr7\stream_for($this->movieFixture);
      $response = new Response(200, ['Content-Type' => 'application/json'], $stream);

      $this->mock->method('fetchAlternativeTitles')->willReturn($response);

      $itemController = new ItemController(new Item(), new Storage());
      $itemController->add($this->mock);

      $this->assertCount(4, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'Disney Pixar Finding Nemo'
      ]);
    }

    /** @test */
    public function it_can_store_alternative_titles_for_tv_shows()
    {
      Input::replace(['item' => $this->tv]);

      $this->assertCount(0, AlternativeTitle::all());

      $stream = Psr7\stream_for($this->tvFixture);
      $response = new Response(200, ['Content-Type' => 'application/json'], $stream);

      $this->mock->method('fetchAlternativeTitles')->willReturn($response);

      $itemControllerMock = $this->getMockBuilder(ItemController::class)->setConstructorArgs([new Item(), new Storage()])->setMethods(['createEpisodes'])->getMock();
      $itemControllerMock->method('createEpisodes')->willReturn(null);

      $itemControllerMock->add($this->mock);

      $this->assertCount(3, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'DBZ'
      ]);
    }
  }
