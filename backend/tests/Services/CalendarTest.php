<?php

namespace Tests\Services;

use App\Services\Calendar;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\Factories;
use Tests\Traits\Fixtures;
use Tests\Traits\Mocks;

class CalendarTest extends TestCase {

  use RefreshDatabase;
  use Factories;
  use Fixtures;
  use Mocks;

  private $calendar;

  public function setUp(): void
  {
    parent::setUp();

    $this->calendar = app(Calendar::class);
  }

  /** @test */
  public function it_should_contain_and_format_tv_shows()
  {
    $this->createTv();

    $items = $this->calendar->items();

    $this->assertCount(4, $items);

    foreach($items as $item) {
      $this->assertArrayHasKey('startDate', $item);
      $this->assertArrayHasKey('id', $item);
      $this->assertArrayHasKey('tmdb_id', $item);
      $this->assertArrayHasKey('type', $item);
      $this->assertArrayHasKey('classes', $item);
      $this->assertArrayHasKey('title', $item);

      $this->assertEquals('tv', $item['type']);
      $this->assertEquals('tv watchlist-0', $item['classes']);
    }
  }

  /** @test */
  public function it_should_format_tv_shows_on_watchlist()
  {
    $this->createTv(['watchlist' => true]);

    $items = $this->calendar->items();

    foreach($items as $item) {
      $this->assertEquals('tv watchlist-1', $item['classes']);
    }
  }

  /** @test */
  public function it_should_contain_and_format_movies()
  {
    $this->createMovie();

    $items = $this->calendar->items();

    $this->assertCount(1, $items);

    foreach($items as $item) {
      $this->assertArrayHasKey('startDate', $item);
      $this->assertArrayHasKey('id', $item);
      $this->assertArrayHasKey('tmdb_id', $item);
      $this->assertArrayHasKey('type', $item);
      $this->assertArrayHasKey('classes', $item);
      $this->assertArrayHasKey('title', $item);

      $this->assertEquals('movies', $item['type']);
      $this->assertEquals('movies watchlist-0', $item['classes']);
    }
  }

  /** @test */
  public function it_should_format_movies_on_watchlist()
  {
    $this->createMovie(['watchlist' => true]);

    $items = $this->calendar->items();

    foreach($items as $item) {
      $this->assertEquals('movies watchlist-1', $item['classes']);
    }
  }
}
