<?php

  namespace App\Services\Models;

  use App\AlternativeTitle as Model;
  use App\Item;
  use App\Services\TMDB;

  class AlternativeTitleService {

    private $model;
    private $item;
    private $tmdb;

    /**
     * @param Model $model
     * @param Item  $item
     * @param TMDB  $tmdb
     */
    public function __construct(Model $model, Item $item, TMDB $tmdb)
    {
      $this->model = $model;
      $this->item = $item;
      $this->tmdb = $tmdb;
    }

    /**
     * @param $item
     */
    public function create($item)
    {
      $titles = $this->tmdb->getAlternativeTitles($item);

      $this->model->store($titles, $item->tmdb_id);
    }

    /**
     * Remove all titles by tmdb_id.
     *
     * @param $tmdbId
     */
    public function remove($tmdbId)
    {
      $this->model->where('tmdb_id', $tmdbId)->delete();
    }

    /**
     * Update alternative titles for all tv shows and movies.
     * For old versions of flox (<= 1.2.2) or to keep all alternative titles up to date.
     */
    public function update()
    {
      increaseTimeLimit();

      $items = $this->item->all();

      $items->each(function($item) {
        $this->create($item);
      });
    }
  }
