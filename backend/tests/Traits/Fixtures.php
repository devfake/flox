<?php

  namespace Tests\Traits;

  trait Fixtures {

    protected function fpFixtures($type)
    {
      return json_decode(file_get_contents(__DIR__ . '/../fixtures/fp/' . $type . '.json'));
    }

    protected function tmdbFixtures($type)
    {
      return file_get_contents(__DIR__ . '/../fixtures/tmdb/' . $type . '.json');
    }

    protected function imdbFixtures($type)
    {
      return file_get_contents(__DIR__ . '/../fixtures/imdb/' . $type);
    }

    protected function floxFixtures($type)
    {
      return collect(json_decode(file_get_contents(__DIR__ . '/../fixtures/flox/' . $type . '.json')))->toArray();
    }

    protected function apiFixtures($path)
    {
      return collect(json_decode(file_get_contents(__DIR__ . '/../fixtures/api/' . $path), true))->toArray();
    }

    protected function getMovieSrc()
    {
      return '/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv';
    }

    protected function getTvSrc($episode)
    {
      return '/tv/Game of Thrones/S' . $episode->season_number . '/' . $episode->episode_number . '.mkv';
    }
  }
