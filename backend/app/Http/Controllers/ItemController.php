<?php

  namespace App\Http\Controllers;

  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use Illuminate\Support\Facades\Input;

  class ItemController {

    private $loadingItems;
    private $item;
    private $storage;

    /**
     * Get the amout of loading items and create an instance for 'item'.
     *
     * @param Item    $item
     * @param Storage $storage
     */
    public function __construct(Item $item, Storage $storage)
    {
      $this->loadingItems = config('app.LOADING_ITEMS');
      $this->item = $item;
      $this->storage = $storage;
    }

    /**
     * Return all items for home with pagination.
     *
     * @param $orderBy
     * @return mixed
     */
    public function items($orderBy)
    {
      $orderType = $orderBy == 'rating' ? 'asc' : 'desc';

      return $this->item->orderBy($orderBy, $orderType)->simplePaginate($this->loadingItems);
    }

    /**
     * Search for items by 'title' in database or with Laravel Scout.
     *
     * @return mixed
     */
    public function search()
    {
      $title = Input::get('q');

      if(config('scout.driver')) {
        return $this->item->search($title)->get();
      }

      // We don't have an smart search driver and return an simple 'like' query.
      return $this->item->where('title', 'LIKE', '%' . $title . '%')
        ->orWhere('alternative_title', 'LIKE', '%' . $title . '%')
        ->get();
    }

    /**
     * Update rating for an movie.
     *
     * @param $itemID
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changeRating($itemID)
    {
      $item = $this->item->find($itemID);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $item->update([
        'rating' => Input::get('rating')
      ]);
    }

    /**
     * Add a new movie to database and create the poster image file.
     *
     * @param TMDB $tmdb
     * @return Item
     */
    public function add(TMDB $tmdb)
    {
      $data = Input::get('item');

      $this->storage->createPosterFile($data['poster']);

      return $this->createItem($data, $tmdb);
    }

    /**
     * Delete movie in database and delete the poster image file.
     *
     * @param $itemID
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function remove($itemID)
    {
      $item = $this->item->find($itemID);

      if( ! $item) {
        return response('Not Found', 404);
      }

      $this->storage->removePosterFile($item->poster);

      $item->delete();
    }

    /**
     * Create the new movie.
     *
     * @param $data
     * @param $tmdb
     * @return Item
     */
    private function createItem($data, $tmdb)
    {
      return $this->item->create([
        'tmdb_id' => $data['tmdb_id'],
        'title' => $data['title'],
        'alternative_title' => $tmdb->alternativeMovieTitle($data["tmdb_id"]),
        'poster' => $data['poster'],
        'rating' => 1,
        'released' => $data['released'],
        'genre' => $data['genre'],
        'created_at' => time(),
      ]);
    }
  }