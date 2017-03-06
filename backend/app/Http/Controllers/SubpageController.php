<?php

  namespace App\Http\Controllers;

  use App\Services\IMDB;
  use App\Services\Subpage;

  class SubpageController {

    public function item($tmdbId, $mediaType, Subpage $subpage)
    {
      return $subpage->item($tmdbId, $mediaType);
    }

    public function imdbRating($id, IMDB $imdb)
    {
      return $imdb->parseRating($id);
    }
  }
