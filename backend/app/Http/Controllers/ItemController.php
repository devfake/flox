<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\Models\AlternativeTitleService;
  use App\Services\Models\ItemService;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
  use Illuminate\Support\Facades\Input;

  class ItemController {

    private $loadingItems;
    private $item;
    private $storage;
    private $tmdb;

    /**
     * Get the amount of loading items and create an instance for 'item'.
     *
     * @param Item $item
     * @param Storage $storage
     * @param TMDB $tmdb
     */
    public function __construct(Item $item, Storage $storage, TMDB $tmdb)
    {
      $this->loadingItems = config('app.LOADING_ITEMS');
      $this->item = $item;
      $this->storage = $storage;
      $this->tmdb = $tmdb;
    }

    /**
     * Return all items with pagination.
     *
     * @param $orderBy
     * @return mixed
     */
    public function items($type, $orderBy)
    {
      $orderType = $orderBy == 'rating' ? 'asc' : 'desc';

      $item = $this->item->orderBy($orderBy, $orderType)->with('latestEpisode');

      if($type != 'home') {
        $item = $item->where('media_type', $type);
      }

      return $item->simplePaginate($this->loadingItems);
    }

    /**
     * Get all Episodes of an tv show.
     *
     * @param $tmdb_id
     * @return mixed
     */
    public function episodes($tmdb_id)
    {
      return [
        'episodes' => Episode::findByTmdbId($tmdb_id)->get()->groupBy('season_number'),
        'spoiler' => Setting::first()->episode_spoiler_protection
      ];
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
      return $this->item->findByTitle($title)->get();
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
     * Create a new movie / tv show.
     *
     * @param ItemService $item
     * @return Item
     */
    public function add(ItemService $item)
    {
      $data = Input::get('item');

      return $item->create($data);
    }

    /**
     * Delete movie or tv show (with episodes) and remove the poster image file.
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
      $tmdb_id = $item->tmdb_id;

      $item->delete();

      // Delete all related episodes
      // todo: Make this possible in migrations
      Episode::where('tmdb_id', $tmdb_id)->delete();
      AlternativeTitle::where('tmdb_id', $tmdb_id)->delete();
    }

    /**
     * Set an episode as seen/unseen.
     *
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function setSeen($id)
    {
      $episode = Episode::find($id);
      $episode->seen = ! $episode->seen;

      if( ! $episode->save()) {
        return response('Server Error', 500);
      }
    }

    /**
     * Update alternative titles for all tv shows and movies or specific item.
     * For old versions of flox or to keep all alternative titles up to date.
     *
     * @param AlternativeTitleService $alternativeTitle
     * @param null                    $tmdbID
     */
    public function updateAlternativeTitles(AlternativeTitleService $alternativeTitle, $tmdbID = null)
    {
      $alternativeTitle->update($tmdbID);
    }

    /**
     * Toggle all episodes of an season as seen/unseen.
     */
    public function toggleSeason()
    {
      $tmdbId = Input::get('tmdb_id');
      $season = Input::get('season');
      $seen = Input::get('seen');

      $episodes = Episode::where('tmdb_id', $tmdbId)->where('season_number', $season)->get();

      foreach($episodes as $episode) {
        $episode->seen = $seen;
        $episode->save();
      }
    }
  }
