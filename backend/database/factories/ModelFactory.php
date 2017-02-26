<?php

  use Carbon\Carbon;

  $factory->define(App\User::class, function(Faker\Generator $faker) {
    static $password;

    return [
      'username' => $faker->name,
      'password' => $password ?: $password = bcrypt('secret'),
      'remember_token' => str_random(10),
    ];
  });

  $factory->define(App\Setting::class, function(Faker\Generator $faker) {
    return [
      'show_date' => 1,
      'show_genre' => 1,
      'episode_spoiler_protection' => '',
      'last_fetch_to_file_parser' => null,
    ];
  });

  $factory->define(App\Item::class, function(Faker\Generator $faker) {
    return [
      'poster' => '',
      'rating' => 1,
      'genre' => '',
      'released' => time(),
      'last_seen_at' => Carbon::now(),
      'src' => null,
    ];
  });

  $factory->define(App\Episode::class, function(Faker\Generator $faker) {
    return [
      'name' => $faker->name,
      'season_tmdb_id' => 1,
      'episode_tmdb_id' => 1,
      'src' => null,
    ];
  });

  $factory->state(App\Item::class, 'movie', function() {
    return [
      'media_type' => 'movie',
    ];
  });

  $factory->state(App\Item::class, 'tv', function() {
    return [
      'media_type' => 'tv',
    ];
  });
