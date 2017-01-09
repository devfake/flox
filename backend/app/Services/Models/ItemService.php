<?php

  namespace App\Services\Models;

  use App\Item as Model;
  use App\Services\Storage;
  use App\Services\TMDB;

  class ItemService {

    private $model;
    private $tmdb;
    private $storage;
    private $alternativeTitle;
    private $episode;

    /**
     * @param Model                   $model
     * @param TMDB                    $tmdb
     * @param Storage                 $storage
     * @param AlternativeTitleService $alternativeTitle
     * @param EpisodeService          $episode
     */
    public function __construct(
      Model $model,
      TMDB $tmdb,
      Storage $storage,
      AlternativeTitleService $alternativeTitle,
      EpisodeService $episode
    ){
      $this->model = $model;
      $this->tmdb = $tmdb;
      $this->storage = $storage;
      $this->alternativeTitle = $alternativeTitle;
      $this->episode = $episode;
    }

    /**
     * @param $data
     * @return Model
     */
    public function create($data)
    {
      $item = $this->model->store($data);

      $this->storage->downloadPoster($item->poster);

      $this->episode->create($item);

      $this->alternativeTitle->create($item);

      return $item;
    }

    /**
     * See if we can find a item by title or tmdb_id in our database.
     *
     * @param $type
     * @param $value
     * @return mixed
     */
    public function findBy($type, $value)
    {
      if($type == 'title') {
        return $this->model->findByTitle($value)->first();
      }

      return $this->model->findByTmdbId($value)->first();
    }
  }