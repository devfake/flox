<?php

  abstract class TestCase extends Illuminate\Foundation\Testing\TestCase {

    protected $baseUrl = 'http://localhost';

    public function createApplication()
    {
      $app = require __DIR__ . '/../bootstrap/app.php';

      $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

      return $app;
    }

    protected function parserFixtures($type)
    {
      return json_decode(file_get_contents(__DIR__ . '/fixtures/Files/' . $type . '.json'));
    }

    protected function tmdbFixtures($type)
    {
      return file_get_contents(__DIR__ . '/fixtures/Tmdb/' . $type . '.json');
    }

    protected function createSetting()
    {
      factory(App\Setting::class)->create();
    }

    protected function createMovie()
    {
      factory(App\Item::class)->create([
        'title' => 'Warcraft: The Beginning',
        'original_title' => 'Warcraft',
        'tmdb_id' => 68735,
        'media_type' => 'movie',
      ]);
    }

    protected function createTv()
    {
      factory(App\Item::class)->create([
        'title' => 'Game of Thrones',
        'original_title' => 'Game of Thrones',
        'tmdb_id' => 1399,
        'media_type' => 'tv',
      ]);

      foreach([1, 2] as $season) {
        foreach([1, 2] as $episode) {
          factory(App\Episode::class)->create([
            'tmdb_id' => 1399,
            'season_number' => $season,
            'episode_number' => $episode,
          ]);
        }
      }
    }

    protected function getMovie()
    {
      return factory(App\Item::class)->states('movie')->make([
        'title' => 'Warcraft',
        'tmdb_id' => 68735,
      ]);
    }

    protected function getTv()
    {
      return factory(App\Item::class)->states('tv')->make([
        'title' => 'Game of Thrones',
        'tmdb_id' => 1399
      ]);
    }
  }
