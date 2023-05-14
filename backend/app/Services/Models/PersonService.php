<?php

  namespace App\Services\Models;

  use App\CreditCast;
  use App\CreditCrew;
  use App\Person;

  class PersonService {

    private $creditCast;
    private $creditCrew;
    private $person;

    /**
     * @param Person $person
     */
    public function __construct(
      CreditCast $creditCast,
      CreditCrew $creditCrew,
      Person $person
    )
    {
      $this->creditCast = $creditCast;
      $this->creditCrew = $creditCrew;
      $this->person = $person;
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
    public function updatePersonLists($itemId, $credits)
    {
      foreach($credits as $type => $persons) {
        foreach($persons as $person) {
          $this->person->store($person);
          switch($type) {
            case 'cast':
              $this->creditCast->store($itemId, $person);
              break;
            case 'crew':
              $this->creditCrew->store($itemId, $person);
              break;
            default:
              throw new \Exception('Unknown credit type: ' . $type);
          }
        }
      }
    }
  }
