<?php

  namespace App\Services\Models;

  use App\Lists as Model;

  class ListsService {

    private $model;

    /**
     * @param Model $model
     */
    public function __construct(Model $model)
    {
      $this->model = $model;
    }
    
    public function all()
    {
      $lists = $this->model->withCount('items');
      
      if (auth()->guest()) {
        $lists->onlyPublic();
      }
      
      return $lists->get();
    }
  }
