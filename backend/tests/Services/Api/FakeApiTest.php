<?php

namespace Tests\Services\Api;

use Tests\Fixtures\FakeApi;
use Tests\TestCase;

class FakeApiTest extends TestCase implements ApiTestInterface
{
  /**
   * @var ApiTest
   */
  private $apiTest;

  public function setUp(): void
  {
    parent::setUp();

    $this->apiTest = new ApiTest('test');

    $this->apiTest->apiClass = FakeApi::class;

    $this->apiTest->setUp();
  }

  /** @test */
  public function it_should_abort_the_request()
  {
    $this->apiTest->it_should_abort_the_request('fake/abort.json');
  }

  /** @test */
  public function it_should_create_a_new_movie()
  {
    $this->apiTest->it_should_create_a_new_movie('fake/movie.json');
  }

  /** @test */
  public function it_should_not_create_a_new_movie_if_it_exists()
  {
    $this->apiTest->it_should_not_create_a_new_movie_if_it_exists('fake/movie.json');
  }

  /** @test */
  public function it_should_create_a_new_tv_show()
  {
    $this->apiTest->it_should_create_a_new_tv_show('fake/tv.json');
  }

  /** @test */
  public function it_should_not_create_a_new_tv_show_if_it_exists()
  {
    $this->apiTest->it_should_not_create_a_new_tv_show_if_it_exists('fake/tv.json');
  }

  /** @test */
  public function it_should_rate_a_movie()
  {
    $this->apiTest->it_should_rate_a_movie('fake/movie_rating.json', 2);
  }

  /** @test */
  public function it_should_rate_a_tv_show()
  {
    $this->apiTest->it_should_rate_a_tv_show('fake/tv_rating.json', 3);
  }

  /** @test */
  public function it_should_mark_an_episode_as_seen()
  {
    $this->apiTest->it_should_mark_an_episode_as_seen('fake/episode_seen.json');
  }
}
