<?php

namespace Tests\Services\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ApiTest extends TestCase
{
  use RefreshDatabase;

  public function setUp(): void
  {
    parent::setUp();
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
    $response = $this->postJson('api/plex', ['token' => 'not-valid']);

    $response->assertJson(['message' => 'No valid token provided']);
    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
  }
}
