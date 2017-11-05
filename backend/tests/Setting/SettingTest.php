<?php

  namespace Tests\Setting;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use App\Setting;
  use Tests\Traits\Factories;

  class SettingTest extends TestCase {

    use RefreshDatabase;
    use Factories;

    protected $user;

    public function setUp()
    {
      parent::setUp();

      $this->user = $this->createUser();
    }

    /** @test */
    public function user_can_change_settings()
    {
      $this->getJson('api/settings');

      $oldSettings = Setting::first();

      $this->actingAs($this->user)->patchJson('api/settings', [
        'genre' => 1,
        'date' => 0,
        'spoiler' => 0,
        'watchlist' => 1,
        'ratings' => 'hover',
      ]);

      $newSettings = Setting::first();

      $this->assertEquals(0, $oldSettings->show_genre);
      $this->assertEquals(1, $oldSettings->show_date);
      $this->assertEquals(1, $oldSettings->episode_spoiler_protection);
      $this->assertEquals(0, $oldSettings->show_watchlist_everywhere);
      $this->assertEquals('always', $oldSettings->show_ratings);
      $this->assertEquals(1, $newSettings->show_genre);
      $this->assertEquals(0, $newSettings->show_date);
      $this->assertEquals(0, $newSettings->episode_spoiler_protection);
      $this->assertEquals(1, $newSettings->show_watchlist_everywhere);
      $this->assertEquals('hover', $newSettings->show_ratings);
    }
  }
