<?php

  use Illuminate\Foundation\Testing\DatabaseMigrations;

  class VideoTest extends TestCase {

    use DatabaseMigrations;
    use Factories;

    private $user;
    private $episode;
    private $movie;

    public function setUp()
    {
      parent::setUp();

      $this->user = $this->createUser();
      $this->episode = app(App\Episode::class);
      $this->movie = app(App\Item::class);

      $this->createTv();
      $this->createMovie();

      $episode = $this->episode->find(1);
      $episode->src = realpath('./tests/fixtures/media/1.mp4');
      $episode->save();

      $episode = $this->episode->find(2);
      $episode->src = realpath('./tests/fixtures/media/2.mp4');
      $episode->save();

      $movie = $this->movie->find(1);
      $movie->src = realpath('./tests/fixtures/media/2.mp4');
      $movie->save();

      $movie = $this->movie->find(2);
      $movie->src = realpath('./tests/fixtures/media/1.mp4');
      $movie->save();
    }

    /** @test **/
    public function it_should_return_mp4_file_from_tv()
    {
      $this->actingAs($this->user)->get('/api/video/tv/1');
      $this->assertEquals('video/mp4', $this->response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $this->response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->episode->find(1)->src, $this->response->getFile());

      $this->actingAs($this->user)->get('/api/video/tv/2');
      $this->assertEquals('video/mp4', $this->response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $this->response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->episode->find(2)->src, $this->response->getFile());
    }

    /** @test **/
    public function it_should_return_mp4_file_from_movie()
    {
      $this->actingAs($this->user)->get('/api/video/movie/1');
      $this->assertEquals('video/mp4', $this->response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $this->response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->movie->find(1)->src, $this->response->getFile());

      $this->actingAs($this->user)->get('/api/video/movie/2');
      $this->assertEquals('video/mp4', $this->response->headers->get('Content-Type'));
      $this->assertEquals('bytes', $this->response->headers->get('Accept-Ranges'));
      $this->assertEquals($this->movie->find(2)->src, $this->response->getFile());
    }

    /** @test **/
    public function it_should_handle_unsupported_routes()
    {
      // only tv and movie as type allowed, not episode
      $this->actingAs($this->user)->get('/api/video/episode/1');
      $this->assertEquals(404, $this->response->status());

      // no file found for tv with episode 3
      $this->actingAs($this->user)->get('/api/video/tv/3');
      $this->assertEquals(404, $this->response->status());
    }

    /** @test **/
    public function it_should_only_be_available_for_logged_in_users()
    {
      $this->get('/api/video/tv/1');
      $this->assertResponseStatus(302);

      $this->actingAs($this->user)->get('/api/video/tv/1');
      $this->assertResponseOk();
    }

  }
