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

    private function creditsFromTMDB(int $tmdbId, array $credits, $type)
    {
      return array_map(function($item) use ($tmdbId, $type) {
        switch($type) {
          case 'cast':
            $creditFrom = $this->creditCast->fromTMDB($tmdbId, $item);
            break;
          case 'crew':
            $creditFrom = $this->creditCrew->fromTMDB($tmdbId, $item);
            break;
        }
        $creditFrom['person'] = $this->person->fromCredits($item);
        return $creditFrom;
      }, $credits);
    }

    public function castFromTMDB(int $tmdbId, array $cast)
    {
        return $this->creditsFromTMDB($tmdbId, $cast, 'cast');
    }

    public function crewFromTMDB(int $tmdbId, array $crew)
    {
        $filteredCrew = array_filter($crew, function($item) {
            return $item->job === 'Director';
        });
        return $this->creditsFromTMDB($tmdbId, array_values($filteredCrew), 'crew');
    }

    public function storeCredits(array $credits)
    {
      foreach($credits as $type => $items) {
        foreach($items as $credit) {
          $this->person->store($credit['person']);
          switch($type) {
            case 'cast':
              $this->creditCast->store($credit['tmdb_id'], $credit);
              break;
            case 'crew':
              $this->creditCrew->store($credit['tmdb_id'], $credit);
              break;
            default:
              throw new \Exception('Unknown credit type: ' . $type);
          }
        }
      }
    }
  }
