<?php

  abstract class TestCase extends Illuminate\Foundation\Testing\TestCase {

    protected $baseUrl = 'http://localhost';

    protected $fixtureFilesAll;
    protected $fixtureFilesMovie;
    protected $fixtureFilesTv;

    protected $fixtureAlternativeTitleMovie;
    protected $fixtureAlternativeTitleTv;

    protected $fixtureTmdbMovie;
    protected $fixtureTmdbTv;
    protected $fixtureTmdbEpisodes;

    public function createApplication()
    {
      $this->assignFixtures();

      $app = require __DIR__ . '/../bootstrap/app.php';

      $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

      return $app;
    }

    private function assignFixtures()
    {
      $this->fixtureFilesAll = json_decode(file_get_contents(__DIR__ . '/fixtures/Files/all.json'));
      $this->fixtureFilesMovie = json_decode(file_get_contents(__DIR__ . '/fixtures/Files/movie.json'));
      $this->fixtureFilesTv = json_decode(file_get_contents(__DIR__ . '/fixtures/Files/tv.json'));

      $this->fixtureAlternativeTitleMovie = file_get_contents(__DIR__ . '/fixtures/Tmdb/alternative_titles_movie.json');
      $this->fixtureAlternativeTitleTv = file_get_contents(__DIR__ . '/fixtures/Tmdb/alternative_titles_tv.json');

      $this->fixtureTmdbMovie = file_get_contents(__DIR__ . '/fixtures/Tmdb/movie.json');
      $this->fixtureTmdbTv = file_get_contents(__DIR__ . '/fixtures/Tmdb/tv.json');
      $this->fixtureTmdbEpisodes = json_decode(file_get_contents(__DIR__ . '/fixtures/Tmdb/episodes.json'));
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
        'title' => 'Findet Nemo',
        'tmdb_id' => 12,
      ]);
    }

    protected function getTv()
    {
      return factory(App\Item::class)->states('tv')->make([
        'title' => 'Dragonball Z',
        'tmdb_id' => 12971
      ]);
    }
  }
