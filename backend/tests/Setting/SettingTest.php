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
  }
