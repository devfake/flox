<?php

  namespace App\Http\Controllers;
  
  use App\Services\Models\ListsService;

  class ListsController {

    private $listsService;

    public function __construct(ListsService $listsService)
    {
      $this->listsService = $listsService;
    }

    public function all()
    {
      return $this->listsService->all();
    }
  }
