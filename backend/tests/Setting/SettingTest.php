<?php

  use App\Setting;
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
    public function it_can_create_settings_with_first_visit()
    {
      $settings = Setting::all();

      $this->assertCount(0, $settings);

      $this->json('GET', 'api/settings');

      $settings = Setting::all();

      $this->assertCount(1, $settings);
    }

    /** @test */
    public function it_create_settings_only_with_first_visit()
    {
      $settings = Setting::all();

      $this->assertCount(0, $settings);

      $this->json('GET', 'api/settings');
      $this->json('GET', 'api/settings');

      $settings = Setting::all();

      $this->assertCount(1, $settings);
    }

    /** @test */
    public function user_can_change_settings()
    {
      $this->json('GET', 'api/settings');

      $setting = Setting::first();

      $this->assertEquals(0, $setting->show_genre);
      $this->assertEquals(1, $setting->show_date);
      $this->assertEquals(1, $setting->episode_spoiler_protection);

      $this->actingAs($this->user)->json('PATCH', 'api/settings', [
        'genre' => 1,
        'date' => 0,
        'spoiler' => 0,
      ]);

      $setting = Setting::first();

      $this->assertEquals(1, $setting->show_genre);
      $this->assertEquals(0, $setting->show_date);
      $this->assertEquals(0, $setting->episode_spoiler_protection);
    }
  }
