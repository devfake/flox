<?php

namespace Tests\Services\Api;

use App\Episode;
use App\Item;
use App\Services\Api\Plex;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tests\TestCase;
use Tests\Traits\Factories;
use Tests\Traits\Fixtures;
use Tests\Traits\Mocks;

class ApiTest extends TestCase
{
  use RefreshDatabase;
  use Mocks;
  use Factories;
  use Fixtures;

  public $apiClass;

  public function setUp(): void
  {
    parent::setUp();

    $this->createStorageDownloadsMock();
    $this->createImdbRatingMock();
  }

  /** @test */
  public function token_needs_to_be_provided()
  {
    $response = $this->postJson('/api/plex');

    $response->assertJson(['message' => 'No token provided']);
    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  /** @test */
  public function valid_token_needs_to_be_provided()
  {
    $mock = $this->mock(Plex::class);
    $mock->shouldReceive('handle')->once()->andReturn(null);
    $user = $this->createUser(['api_key' => Str::random(24)]);

    $responseBefore = $this->postJson('api/plex', ['token' => 'not-valid']);
    $responseAfter = $this->postJson('api/plex', ['token' => $user->api_key, 'payload' => '[]']);

    $responseBefore->assertJson(['message' => 'No valid token provided']);
    $responseBefore->assertStatus(Response::HTTP_UNAUTHORIZED);

    $responseAfter->assertSuccessful();
  }

  public function it_should_abort_the_request($fixture)
  {
    $api = app($this->apiClass);

    try {
      $api->handle($this->apiFixtures($fixture));
    } catch (HttpException $exception) {
      $this->assertTrue(true);
    }
  }

  public function it_should_create_a_new_movie($fixture)
  {
    $this->createGuzzleMock(
      $this->tmdbFixtures('movie/movie'),
      $this->tmdbFixtures('movie/details'),
      $this->tmdbFixtures('movie/alternative_titles')
    );

    $api = app($this->apiClass);

    $itemsBefore = Item::all();

    $api->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_not_create_a_new_movie_if_it_exists($fixture)
  {
    $this->createMovie();

    $api = app($this->apiClass);

    $itemsBefore = Item::all();

    $api->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(1, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_create_a_new_tv_show($fixture)
  {
    $this->createGuzzleMock(
      $this->tmdbFixtures('tv/tv'),
      $this->tmdbFixtures('tv/details'),
      $this->tmdbFixtures('tv/alternative_titles')
    );

    $this->createTmdbEpisodeMock();

    $api = app($this->apiClass);

    $itemsBefore = Item::all();

    $api->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_not_create_a_new_tv_show_if_it_exists($fixture)
  {
    $this->createTv();

    $api = app($this->apiClass);

    $itemsBefore = Item::all();

    $api->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(1, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_rate_a_movie($fixture, $shouldHaveRating)
  {
    $this->createMovie();

    $api = app($this->apiClass);

    $movieBefore = Item::first();

    $api->handle($this->apiFixtures($fixture));

    $movieAfter = Item::first();

    $this->assertEquals(1, $movieBefore->rating);
    $this->assertEquals($shouldHaveRating, $movieAfter->rating);
  }

  public function it_should_rate_a_tv_show($fixture, $shouldHaveRating)
  {
    $this->createTv();

    $api = app($this->apiClass);

    $tvBefore = Item::first();

    $api->handle($this->apiFixtures($fixture));

    $tvAfter = Item::first();

    $this->assertEquals(1, $tvBefore->rating);
    $this->assertEquals($shouldHaveRating, $tvAfter->rating);
  }

  public function it_should_mark_an_episode_as_seen($fixture)
  {
    $this->createTv();

    $api = app($this->apiClass);

    $seenEpisodesBefore = Episode::where('seen', true)->get();

    $api->handle($this->apiFixtures($fixture));

    $seenEpisodesAfter = Episode::where('seen', true)->get();

    $this->assertCount(0, $seenEpisodesBefore);
    $this->assertCount(1, $seenEpisodesAfter);
  }

  public function it_should_update_last_seen_at($fixture)
  {
    $this->createTv();

    $api = app($this->apiClass);

    $lastSeenBefore = Item::first()->last_seen_at;

    // sleep for 1 second so that Carbon::now() returns a different date
    sleep(1);

    $api->handle($this->apiFixtures($fixture));

    $lastSeenAfter = Item::first()->last_seen_at;

    $this->assertNotEquals($lastSeenBefore, $lastSeenAfter);
  }
}
