<?php

  namespace App\Http\Controllers;

  use App\Services\TMDB;
  use Illuminate\Support\Facades\Input;

  class TMDBController {

    private $tmdb;

    public function __construct(TMDB $tmdb)
    {
      $this->tmdb = $tmdb;
    }

    public function search()
    {
      return $this->tmdb->search(Input::get('q'));
    }

    public function suggestions($tmdbId, $mediaType)
    {
      return $this->tmdb->suggestions($mediaType, $tmdbId);
    }

    public function trending()
    {
      return $this->tmdb->trending();
    }

    public function nowPlaying()
    {
      return $this->tmdb->nowPlaying();
    }

    public function upcoming()
    {
      return $this->tmdb->upcoming();
    }
  }
