<?php

  use App\AlternativeTitle;
  use App\Services\Models\AlternativeTitleService;
  use App\Item;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class AlternativeTitleTest extends TestCase {

    use DatabaseMigrations;

    private $item;

    public function setUp()
    {
      parent::setUp();

      $this->item = new Item();
    }

    /** @test */
    public function it_can_store_alternative_titles_for_new_movie()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_movie'));
      $movie = $this->getMovie();

      $model = app(AlternativeTitleService::class);
      $model->create($movie);

      $this->assertCount(4, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_can_store_alternative_titles_for_new_tv_show()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_tv'));
      $tv = $this->getTv();

      $model = app(AlternativeTitleService::class);
      $model->create($tv);

      $this->assertCount(3, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'GOT'
      ]);
    }

    /** @test */
    public function it_can_update_alternative_titles_for_all_movies()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_movie'));
      $this->createMovie();

      $model = app(AlternativeTitleService::class);
      $model->update();

      $this->assertCount(4, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_can_update_alternative_titles_for_specific_movie()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_movie'));
      $this->createMovie();

      $model = app(AlternativeTitleService::class);
      $model->update(68735);

      $this->assertCount(4, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'Warcraft: The Beginning'
      ]);
    }

    /** @test */
    public function it_can_update_alternative_titles_for_all_tv_shows()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_tv'));
      $this->createTv();

      $model = app(AlternativeTitleService::class);
      $model->update();

      $this->assertCount(3, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'GOT'
      ]);
    }

    /** @test */
    public function it_can_update_alternative_titles_for_specific_tv_show()
    {
      $this->createGuzzleMock($this->tmdbFixtures('alternative_titles_tv'));
      $this->createTv();

      $model = app(AlternativeTitleService::class);
      $model->update(1399);

      $this->assertCount(3, AlternativeTitle::all());
      $this->seeInDatabase('alternative_titles', [
        'title' => 'GOT'
      ]);
    }

    private function createGuzzleMock($fixture)
    {
      $mock = new MockHandler([
        new Response(200, ['X-RateLimit-Remaining' => [40]], $fixture),
      ]);

      $handler = HandlerStack::create($mock);
      $this->app->instance(Client::class, new Client(['handler' => $handler]));
    }
  }
