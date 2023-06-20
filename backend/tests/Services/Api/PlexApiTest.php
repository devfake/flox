<?php

namespace Tests\Services\Api;

use App\Services\Api\Plex;
use Tests\TestCase;

class PlexApiTest extends TestCase implements ApiTestInterface
{
  /**
   * @var ApiTest
   */
  private $apiTest;

  public function setUp(): void
  {
    parent::setUp();

    $this->apiTest = new ApiTest('test');

    $this->apiTest->apiClass = Plex::class;

    $this->apiTest->setUp();
  }

  /** @test */
  public function it_should_abort_the_request()
  {
    $this->apiTest->it_should_abort_the_request('plex/abort.json');
  }

  /** @test */
  public function it_should_create_a_new_movie()
  {
    $this->apiTest->it_should_create_a_new_movie('plex/movie.json');
  }

  /** @test */
  public function it_should_not_create_a_new_movie_if_it_exists()
  {
    $this->apiTest->it_should_not_create_a_new_movie_if_it_exists('plex/movie.json');
  }

  /** @test */
  public function it_should_create_a_new_tv_show()
  {
    $this->apiTest->it_should_create_a_new_tv_show('plex/tv.json');
  }

  /** @test */
  public function it_should_not_create_a_new_tv_show_if_it_exists()
  {
    $this->apiTest->it_should_not_create_a_new_tv_show_if_it_exists('plex/tv.json');
  }

  /** @test */
  public function it_should_rate_a_movie()
  {
    $this->apiTest->it_should_rate_a_movie('plex/movie_rating.json', 2);
  }

  /** @test */
  public function it_should_rate_a_tv_show()
  {
    $this->apiTest->it_should_rate_a_tv_show('plex/tv_rating.json', 3);
  }

  /** @test */
  public function it_should_mark_an_episode_as_seen()
  {
    $this->apiTest->it_should_mark_an_episode_as_seen('plex/episode_seen.json');
  }

  /** @test */
  public function it_should_update_last_seen_at_of_a_show()
  {
    $this->apiTest->it_should_update_last_seen_at('plex/episode_seen.json');
  }
}
