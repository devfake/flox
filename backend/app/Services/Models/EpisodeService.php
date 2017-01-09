<?php

  namespace App\Services\Models;

  use App\Episode as Model;
  use App\Services\TMDB;

  class EpisodeService {

    private $model;
    private $tmdb;

    /**
     * @param Model $model
     * @param TMDB  $tmdb
     */
    public function __construct(Model $model, TMDB $tmdb)
    {
      $this->model = $model;
      $this->tmdb = $tmdb;
    }

    /**
     * @param $item
     */
    public function create($item)
    {
      if($item->media_type == 'tv') {
        $seasons = $this->tmdb->tvEpisodes($item->tmdb_id);

        $this->model->store($seasons, $item->tmdb_id);
      }
    }
  }