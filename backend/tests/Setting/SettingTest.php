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

    public function setUp(): void
    {
      parent::setUp();

      $this->user = $this->createUser();
    }

    /** @test */
    public function user_can_change_settings()
    {
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

    /** @test */
    public function user_can_change_refresh()
    {
      $oldSettings = Setting::first();

      $this->actingAs($this->user)->patchJson('api/settings/refresh', [
        'refresh' => 1,
      ]);

      $newSettings = Setting::first();

      $this->assertEquals(0, $oldSettings->refresh_automatically);
      $this->assertEquals(1, $newSettings->refresh_automatically);
    }

    /** @test */
    public function user_can_change_reminders_send_to()
    {
      $oldSettings = Setting::first();

      $this->actingAs($this->user)->patchJson('api/settings/reminders-send-to', [
        'reminders_send_to' => 'jon@snow.io',
      ]);

      $newSettings = Setting::first();

      $this->assertNull($oldSettings->reminders_send_to);
      $this->assertEquals('jon@snow.io', $newSettings->reminders_send_to);
    }

    /** @test */
    public function user_can_change_reminder_options()
    {
      $oldSettings = Setting::first();

      $this->actingAs($this->user)->patchJson('api/settings/reminder-options', [
        'daily' => 1,
        'weekly' => 1,
      ]);

      $newSettings = Setting::first();

      $this->assertEquals(0, $oldSettings->daily_reminder);
      $this->assertEquals(0, $oldSettings->weekly_reminder);
      $this->assertEquals(1, $newSettings->daily_reminder);
      $this->assertEquals(1, $newSettings->weekly_reminder);
    }

    /** @test */
    public function user_can_generate_a_new_api_key()
    {
      $apiKeyBefore = $this->user->api_key;

      $this->actingAs($this->user)->patchJson('api/settings/api-key');

      $apiKeyAfter = $this->user->api_key;

      $this->actingAs($this->user)->patchJson('api/settings/api-key');

      $apiKeyAfterSecond = $this->user->api_key;

      $this->assertNull($apiKeyBefore);
      $this->assertNotNull($apiKeyAfter);
      $this->assertNotEquals($apiKeyAfterSecond, $apiKeyAfter);
    }
  }
