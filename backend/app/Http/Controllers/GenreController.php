<?php

  namespace App\Http\Controllers;
  
  use App\Genre;
  use App\Services\Models\GenreService;

  class GenreController {
    
    private $genreService;
    private $genre;

    public function __construct(GenreService $genreService, Genre $genre)
    {
      $this->genreService = $genreService;
      $this->genre = $genre;
    }
    
    public function allGenres()
    {
      return $this->genre->all();
    }
  }
