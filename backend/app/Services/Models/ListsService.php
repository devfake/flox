<?php

  namespace App\Services\Models;

  use App\Item;
  use App\Lists;

  class ListsService {

    private $lists;
    private $item;
    private $itemService;

    /**
     * @param Lists $lists
     * @param Item $item
     * @param ItemService $itemService
     */
    public function __construct(Lists $lists, Item $item, ItemService $itemService)
    {
      $this->lists = $lists;
      $this->item = $item;
      $this->itemService = $itemService;
    }

    /**
     * @return mixed
     */
    public function all()
    {
      $lists = $this->lists->withCount('items');
      
      if (auth()->guest()) {
        $lists->onlyPublic();
      }
      
      return [
        'lists' => $lists->get(),
        'watchlist_count' => $this->item->watchlist()->count(),
        'latest_watchlist' => $this->item->watchlist()->latest()->first(),
      ];
    }

    /**
     * @param $tmdbId
     * @return array
     */
    public function forItem($tmdbId)
    {
      $found = $this->itemService->findBy('tmdb_id', $tmdbId);
      
      if ( ! $found) {
        return [];
      }
     
      // ansonsten brauchen wir die ids, wo das item schon in den listen drin ist
    }

    /**
     * @param $data
     * 
     * @return array
     */
    public function store($data)
    {
      return $this->lists->create([
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

    /**
     * @param Lists $list
     *
     * @return void
     * @throws \Exception
     */
    public function remove(Lists $list)
    {
      $list->delete();
    }
  }
