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

    public function suggestions($tmdbID, $mediaType)
    {
      return $this->tmdb->suggestions($mediaType, $tmdbID);
    }

    public function trending()
    {
      return $this->tmdb->trending();
    }

    public function upcoming()
    {
      return $this->tmdb->upcoming();
    }
  }