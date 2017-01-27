<?php

  use App\Item;
  use App\Setting;
  use GuzzleHttp\Client;
  use GuzzleHttp\Handler\MockHandler;
  use GuzzleHttp\HandlerStack;
  use GuzzleHttp\Psr7\Response;
  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class SettingTest extends TestCase {

    use DatabaseMigrations;

    protected $user;

    public function setUp()
    {
      parent::setUp();

      $this->user = factory(App\User::class)->create();
    }

    /** @test */
    public function it_should_create_settings_with_first_visit()
    {
      $settings1 = Setting::all();

      $this->json('GET', 'api/settings');

      $settings2 = Setting::all();

      $this->assertCount(0, $settings1);
      $this->assertCount(1, $settings2);
    }

    /** @test */
    public function it_should_create_settings_only_with_first_visit()
    {
      $settings1 = Setting::all();

      $this->json('GET', 'api/settings');
      $this->json('GET', 'api/settings');

      $settings2 = Setting::all();

      $this->assertCount(0, $settings1);
      $this->assertCount(1, $settings2);
    }

    /** @test */
    public function user_can_change_settings()
    {
      $this->json('GET', 'api/settings');

      $setting1 = Setting::first();

      $this->actingAs($this->user)->json('PATCH', 'api/settings', [
        'genre' => 1,
        'date' => 0,
        'spoiler' => 0,
      ]);

      $setting2 = Setting::first();

      $this->assertEquals(0, $setting1->show_genre);
      $this->assertEquals(1, $setting1->show_date);
      $this->assertEquals(1, $setting1->episode_spoiler_protection);
      $this->assertEquals(1, $setting2->show_genre);
      $this->assertEquals(0, $setting2->show_date);
      $this->assertEquals(0, $setting2->episode_spoiler_protection);
    }

    /** @test */
    public function it_should_update_genre_for_a_movie()
    {
      $this->createMovie();

      $this->createGuzzleMock($this->tmdbFixtures('movie_details'));

      $withoutGenre = Item::find(1);
      $this->actingAs($this->user)->json('PATCH', 'api/update-genre');
      $withGenre = Item::find(1);

      $this->assertEmpty($withoutGenre->genre);
      $this->assertNotEmpty($withGenre->genre);
    }

    /** @test */
    public function it_should_update_genre_for_a_tv_show()
    {
      $this->createTv();

      $this->createGuzzleMock($this->tmdbFixtures('tv_details'));

      $withoutGenre = Item::find(1);
      $this->actingAs($this->user)->json('PATCH', 'api/update-genre');
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
  }
