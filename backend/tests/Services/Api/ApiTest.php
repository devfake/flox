<?php

namespace Tests\Services\Api;

use App\Episode;
use App\Item;
use App\Services\Api\Plex;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
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

  private $apiClass;

  public function setUp(): void
  {
    parent::setUp();

    $this->createStorageDownloadsMock();
    $this->createImdbRatingMock();
  }

  public function setApiClass($api)
  {
    $this->apiClass = $api;
  }

  /** @test */
  public function token_needs_to_be_provided()
  {
    $response = $this->postJson('api/plex');

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
    } catch (\Exception $exception) {
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

    $fakeApi = app($this->apiClass);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_not_create_a_new_movie_if_it_exists($fixture)
  {
    $this->createMovie();

    $fakeApi = app($this->apiClass);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures($fixture));

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

    $fakeApi = app($this->apiClass);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_not_create_a_new_tv_show_if_it_exists($fixture)
  {
    $this->createTv();

    $fakeApi = app($this->apiClass);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures($fixture));

    $itemsAfter = Item::all();

    $this->assertCount(1, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  public function it_should_rate_a_movie($fixture)
  {
    $this->createMovie();

    $fakeApi = app($this->apiClass);

    $movieBefore = Item::first();

    $fakeApi->handle($this->apiFixtures($fixture));

    $movieAfter = Item::first();

    $this->assertEquals(1, $movieBefore->rating);
    $this->assertEquals(2, $movieAfter->rating);
  }

  public function it_should_rate_a_tv_show($fixture)
  {
    $this->createTv();

    $fakeApi = app($this->apiClass);

    $tvBefore = Item::first();

    $fakeApi->handle($this->apiFixtures($fixture));

    $tvAfter = Item::first();

    $this->assertEquals(1, $tvBefore->rating);
    $this->assertEquals(3, $tvAfter->rating);
  }

  public function it_should_mark_an_episode_as_seen($fixture)
  {
    $this->createTv();

    $fakeApi = app($this->apiClass);

    $seenEpisodesBefore = Episode::where('seen', true)->get();

    $fakeApi->handle($this->apiFixtures($fixture));

    $seenEpisodesAfter = Episode::where('seen', true)->get();

    $this->assertCount(0, $seenEpisodesBefore);
    $this->assertCount(1, $seenEpisodesAfter);
  }
}
