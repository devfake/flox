<?php

  use Illuminate\Foundation\Testing\DatabaseMigrations;
  use Illuminate\Support\Facades\Schema;

  class ApplicationTest extends TestCase {

    use DatabaseMigrations;

    /** @test */
    public function it_can_create_migrations()
    {
      $this->assertTrue(Schema::hasTable('users'));
      $this->assertTrue(Schema::hasTable('items'));
      $this->assertTrue(Schema::hasTable('settings'));
      $this->assertTrue(Schema::hasTable('episodes'));
      $this->assertTrue(Schema::hasColumn('settings', 'episode_spoiler_protection'));
    }

    /** @test */
    public function it_can_call_homepage_successfully()
    {
      $response = $this->call('GET', '/');

      $this->assertEquals(200, $response->status());
    }
  }
