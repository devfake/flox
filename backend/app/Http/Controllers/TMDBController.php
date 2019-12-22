<?php

  namespace App\Http\Controllers;

  use App\Services\TMDB;
  use Illuminate\Support\Facades\Input;
  use Illuminate\Support\Facades\Request;

  class TMDBController {

    private $tmdb;

    public function __construct(TMDB $tmdb)
    {
      $this->tmdb = $tmdb;
    }

    public function search()
    {
      return $this->tmdb->search(Request::input('q'));
    }

    public function suggestions($tmdbId, $mediaType)
    {
      return $this->tmdb->suggestions($mediaType, $tmdbId);
    }

    public function genre($genre)
    {
      return $this->tmdb->byGenre($genre);
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
