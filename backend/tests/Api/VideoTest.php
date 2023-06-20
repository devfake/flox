<?php

  namespace Tests\Api;

  use App\Episode;
  use App\Item;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use Tests\Traits\Factories;

  class VideoTest extends TestCase {

    use RefreshDatabase;
    use Factories;

    private $user;
    private $episode;
    private $movie;

    public function setUp(): void
    {
      parent::setUp();

      $this->user = $this->createUser();
      $this->episode = app(Episode::class);
      $this->movie = app(Item::class);

      $this->createTv();
      $this->createMovie();

      $episode = $this->episode->find(1);
      $episode->src = realpath('./tests/Fixtures/media/1.mp4');
      $episode->save();

      $episode = $this->episode->find(2);
      $episode->src = realpath('./tests/Fixtures/media/2.mp4');
      $episode->save();

      $movie = $this->movie->find(1);
      $movie->src = realpath('./tests/Fixtures/media/2.mp4');
      $movie->save();

      $movie = $this->movie->find(2);
      $movie->src = realpath('./tests/Fixtures/media/1.mp4');
      $movie->save();
    }

    /** @test **/
    public function it_should_return_mp4_file_from_tv()
    {
      $response = $this->actingAs($this->user)->get('/api/video/tv/1');
      $this->assertEquals('video/mp4', $response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->episode->find(1)->src, $response->getFile());

      $response = $this->actingAs($this->user)->get('/api/video/tv/2');
      $this->assertEquals('video/mp4', $response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->episode->find(2)->src, $response->getFile());
    }

    /** @test **/
    public function it_should_return_mp4_file_from_movie()
    {
      $response = $this->actingAs($this->user)->get('/api/video/movie/1');
      $this->assertEquals('video/mp4', $response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->movie->find(1)->src, $response->getFile());

      $response = $this->actingAs($this->user)->get('/api/video/movie/2');
      $this->assertEquals('video/mp4', $response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->movie->find(2)->src, $response->getFile());
    }

    /** @test **/
    public function it_should_handle_unsupported_routes()
    {
      // only tv and movie as type allowed, not episode
      $this->actingAs($this->user)->get('/api/video/episode/1')
        ->assertStatus(404);

      // no file found for tv with episode 3
      $this->actingAs($this->user)->get('/api/video/tv/3')
        ->assertStatus(404);
    }

    /** @test **/
    public function it_should_only_be_available_for_logged_in_users()
    {
      $this->getJson('/api/video/tv/1')
        ->assertStatus(401);

      $this->actingAs($this->user)->getJson('/api/video/tv/1')
        ->assertSuccessful();
    }

  }
