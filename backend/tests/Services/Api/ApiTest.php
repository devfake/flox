<?php

namespace Tests\Services\Api;

use App\Episode;
use App\Item;
use App\Services\Api\Plex;
use Tests\Fixtures\FakeApi;
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

  public function setUp(): void
  {
    parent::setUp();

    $this->createStorageDownloadsMock();
    $this->createImdbRatingMock();
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

  /** @test */
  public function it_should_abort_the_request()
  {
    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    try {
      $fakeApi->handle($this->apiFixtures('fake/abort.json'));
    } catch (\Exception $exception) {
      $this->assertTrue(true);
    }
  }

  /** @test */
  public function it_should_create_a_new_movie()
  {
    $this->createGuzzleMock(
      $this->tmdbFixtures('movie/movie'),
      $this->tmdbFixtures('movie/details'),
      $this->tmdbFixtures('movie/alternative_titles')
    );

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures('fake/movie.json'));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  /** @test */
  public function it_should_not_create_a_new_movie_if_it_exists()
  {
    $this->createMovie();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures('fake/movie.json'));

    $itemsAfter = Item::all();

    $this->assertCount(1, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  /** @test */
  public function it_should_create_a_new_tv_show()
  {
    $this->createGuzzleMock(
      $this->tmdbFixtures('tv/tv'),
      $this->tmdbFixtures('tv/details'),
      $this->tmdbFixtures('tv/alternative_titles')
    );

    $this->createTmdbEpisodeMock();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures('fake/tv.json'));

    $itemsAfter = Item::all();

    $this->assertCount(0, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  /** @test */
  public function it_should_not_create_a_new_tv_show_if_it_exists()
  {
    $this->createTv();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $itemsBefore = Item::all();

    $fakeApi->handle($this->apiFixtures('fake/tv.json'));

    $itemsAfter = Item::all();

    $this->assertCount(1, $itemsBefore);
    $this->assertCount(1, $itemsAfter);
  }

  /** @test */
  public function it_should_rate_a_movie()
  {
    $this->createMovie();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $movieBefore = Item::first();

    $fakeApi->handle($this->apiFixtures('fake/movie_rating.json'));

    $movieAfter = Item::first();

    $this->assertEquals(1, $movieBefore->rating);
    $this->assertEquals(2, $movieAfter->rating);
  }

  /** @test */
  public function it_should_rate_a_tv_show()
  {
    $this->createTv();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $tvBefore = Item::first();

    $fakeApi->handle($this->apiFixtures('fake/tv_rating.json'));

    $tvAfter = Item::first();

    $this->assertEquals(1, $tvBefore->rating);
    $this->assertEquals(3, $tvAfter->rating);
  }

  /** @test */
  public function it_should_mark_an_episode_as_seen()
  {
    $this->createTv();

    /** @var FakeApi $fakeApi */
    $fakeApi = app(FakeApi::class);

    $seenEpisodesBefore = Episode::where('seen', true)->get();

    $fakeApi->handle($this->apiFixtures('fake/episode_seen.json'));

    $seenEpisodesAfter = Episode::where('seen', true)->get();

    $this->assertCount(0, $seenEpisodesBefore);
    $this->assertCount(1, $seenEpisodesAfter);
  }
}
