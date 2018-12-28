<?php

  namespace App\Http\Controllers;
  
  use App\Lists;
  use App\Services\Models\ListsService;
  use Symfony\Component\HttpFoundation\Response;

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
    
    public function store()
    {
      return $this->listsService->store(request()->all());
    }
    
    public function update(Lists $list)
    {
      $this->listsService->update($list, request()->all());
      
      return response([], Response::HTTP_OK);
    }
  }
