<?php

  namespace App\Http\Controllers;
  
  use App\Services\Models\GenreService;

  class GenreController {
    
    private $genreService;

    public function __construct(GenreService $genreService)
    {
      $this->genreService = $genreService;
    }

    public function updateGenreLists()
    {
      return $this->genreService->updateGenreLists();
    }
  }
