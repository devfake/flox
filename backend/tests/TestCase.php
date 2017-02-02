<?php

  abstract class TestCase extends Illuminate\Foundation\Testing\TestCase {

    protected $baseUrl = 'http://localhost';

    public function createApplication()
    {
      $app = require __DIR__ . '/../bootstrap/app.php';

      $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

      return $app;
    }

    protected function fpFixtures($type)
    {
      return json_decode(file_get_contents(__DIR__ . '/fixtures/fp/' . $type . '.json'));
    }

    protected function tmdbFixtures($type)
    {
      return file_get_contents(__DIR__ . '/fixtures/tmdb/' . $type . '.json');
    }

    protected function floxFixtures($type)
    {
      return collect(json_decode(file_get_contents(__DIR__ . '/fixtures/flox/' . $type . '.json')))->toArray();
    }

    protected function createSetting()
    {
      factory(App\Setting::class)->create();
    }

    protected function createMovie($custom = [])
    {
      $data = [
        'title' => 'Warcraft: The Beginning',
        'original_title' => 'Warcraft',
        'tmdb_id' => 68735,
        'media_type' => 'movie',
      ];

      factory(App\Item::class)->create(array_merge($data, $custom));
    }

    protected function createTv($custom = [], $withEpisodes = true)
    {
      $data = [
        'title' => 'Game of Thrones',
        'original_title' => 'Game of Thrones',
        'tmdb_id' => 1399,
        'media_type' => 'tv',
      ];

      factory(App\Item::class)->create(array_merge($data, $custom));

      if($withEpisodes) {
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
    }

    protected function getMovie($custom = [])
    {
      $data = [
        'title' => 'Warcraft',
        'tmdb_id' => 68735,
      ];

      return factory(App\Item::class)->states('movie')->make(array_merge($data, $custom));
    }

    protected function getTv($custom = [])
    {
      $data = [
        'title' => 'Game of Thrones',
        'tmdb_id' => 1399,
      ];

      return factory(App\Item::class)->states('tv')->make(array_merge($data, $custom));
    }

    protected function getMovieSrc()
    {
      return '/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv';
    }

    protected function getTvSrc()
    {
      return '/tv/Game of Thrones/S1/1.mkv';
    }
  }
