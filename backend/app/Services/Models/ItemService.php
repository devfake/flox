<?php

  namespace App\Services\Models;

  use App\Item as Model;
  use App\Services\Storage;
  use App\Services\TMDB;

  class ItemService {

    private $model;
    private $tmdb;
    private $storage;
    private $alternativeTitleService;
    private $episodeService;

    /**
     * @param Model                   $model
     * @param TMDB                    $tmdb
     * @param Storage                 $storage
     * @param AlternativeTitleService $alternativeTitleService
     * @param EpisodeService          $episodeService
     */
    public function __construct(
      Model $model,
      TMDB $tmdb,
      Storage $storage,
      AlternativeTitleService $alternativeTitleService,
      EpisodeService $episodeService
    ){
      $this->model = $model;
      $this->tmdb = $tmdb;
      $this->storage = $storage;
      $this->alternativeTitleService = $alternativeTitleService;
      $this->episodeService = $episodeService;
    }

    /**
     * @param $data
     * @return Model
     */
    public function create($data)
    {
      $item = $this->model->store($data);

      $this->storage->downloadPoster($item->poster);

      $this->episodeService->create($item);

      $this->alternativeTitleService->create($item);

      return $item;
    }

    /**
     * @param $itemId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function remove($itemId)
    {
      $item = $this->model->find($itemId);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $tmdbId = $item->tmdb_id;

      $item->delete();

      // Delete all related episodes, alternative titles and poster image.
      $this->episodeService->remove($tmdbId);
      $this->alternativeTitleService->remove($tmdbId);
      $this->storage->removePosterFile($item->poster);
    }

    /**
     * Return all items with pagination.
     *
     * @param $type
     * @param $orderBy
     * @return mixed
     */
    public function getWithPagination($type, $orderBy)
    {
      $orderType = $orderBy == 'rating' ? 'asc' : 'desc';

      $item = $this->model->orderBy($orderBy, $orderType)->with('latestEpisode');

      if($type != 'home') {
        $item = $item->where('media_type', $type);
      }

      return $item->simplePaginate(config('app.LOADING_ITEMS'));
    }

    /**
     * Update rating for an movie.
     *
     * @param $itemId
     * @param $rating
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changeRating($itemId, $rating)
    {
      $item = $this->model->find($itemId);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $item->update([
        'rating' => $rating,
      ]);
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