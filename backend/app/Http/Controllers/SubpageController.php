<?php

  namespace App\Http\Controllers;

  use App\Services\IMDB;
  use App\Services\Subpage;
  use App\Services\Models\Show;

  class SubpageController {

    public function item($id)
    {
      return Show::find($id);
    }

    public function imdbRating($id, IMDB $imdb)
    {
      return $imdb->parseRating($id);
    }
  }
