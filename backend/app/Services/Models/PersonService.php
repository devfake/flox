<?php

  namespace App\Services\Models;

  use App\Person as Model;

  class PersonService {

    private $model;

    /**
     * @param Model $model
     */
    public function __construct(Model $model)
    {
      $this->model = $model;
    }

    /**
     * Sync the pivot table person_item.
     * 
     * @param $item
     * @param $ids
     */
    public function sync($item, $ids)
    {
      $item->person()->sync($ids);
    }

    /**
     * Update the persons table.
     */
    public function updatePersonLists($credits)
    {
      $persons = collect($credits)->flatten(1);

      foreach($persons as $person) {
        $this->model->store($person);
      }
    }
  }
