<?php

  namespace App\Services\Models;

  use App\Lists as Model;
  use App\Lists;

  class ListsService {

    private $model;

    /**
     * @param Model $model
     */
    public function __construct(Model $model)
    {
      $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function all()
    {
      $lists = $this->model->withCount('items');
      
      if (auth()->guest()) {
        $lists->onlyPublic();
      }
      
      return $lists->get();
    }

    /**
     * @param $data
     * 
     * @return array
     */
    public function store($data)
    {
      return $this->model->create([
        'name' => $data['name'],
        'is_public' => $data['is_public'],
      ]);
    }

    /**
     * @param Lists $list
     * @param $data
     *
     * @return void
     */
    public function update(Lists $list, $data)
    {
      $list->update([
        'name' => $data['name'],
        'is_public' => $data['is_public'],
      ]);
    }
  }
