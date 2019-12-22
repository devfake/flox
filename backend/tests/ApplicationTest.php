<?php

  namespace Tests;

  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Facades\Schema;

  class ApplicationTest extends TestCase {

    use RefreshDatabase;

    /** @test */
    public function it_can_create_migrations()
    {
      $this->assertTrue(Schema::hasTable('users'));
      $this->assertTrue(Schema::hasTable('items'));
      $this->assertTrue(Schema::hasTable('settings'));
      $this->assertTrue(Schema::hasTable('episodes'));
      $this->assertTrue(Schema::hasColumn('settings', 'episode_spoiler_protection'));
      $this->assertTrue(Schema::hasColumn('episodes', 'src'));
      $this->assertTrue(Schema::hasColumn('items', 'src'));
      $this->assertTrue(Schema::hasTable('alternative_titles'));
      $this->assertTrue(Schema::hasTable('alternative_titles'));
      $this->assertTrue(Schema::hasColumn('settings', 'last_fetch_to_file_parser'));
      $this->assertTrue(Schema::hasColumn('items', 'subtitles'));
      $this->assertTrue(Schema::hasColumn('episodes', 'subtitles'));
      $this->assertTrue(Schema::hasColumn('items', 'fp_name'));
      $this->assertTrue(Schema::hasColumn('episodes', 'fp_name'));
      $this->assertTrue(Schema::hasColumn('episodes', 'created_at'));
      $this->assertTrue(Schema::hasColumn('episodes', 'updated_at'));
      $this->assertTrue(Schema::hasColumn('items', 'last_seen_at'));
      $this->assertTrue(Schema::hasColumn('episodes', 'release_episode'));
      $this->assertTrue(Schema::hasColumn('episodes', 'release_season'));
    }

    /** @test */
    public function it_can_call_homepage_successfully()
    {
      $response = $this->call('GET', '/');
      
      $response->assertSuccessful();
    }
  }
