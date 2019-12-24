<?php

namespace Tests\Services\Api;

interface ApiTestInterface
{
  public function setUp(): void;
  public function it_should_abort_the_request();
  public function it_should_create_a_new_movie();
  public function it_should_not_create_a_new_movie_if_it_exists();
  public function it_should_create_a_new_tv_show();
  public function it_should_not_create_a_new_tv_show_if_it_exists();
  public function it_should_rate_a_movie();
  public function it_should_rate_a_tv_show();
  public function it_should_mark_an_episode_as_seen();
}
