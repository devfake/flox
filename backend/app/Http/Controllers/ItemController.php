<?php

  namespace App\Http\Controllers;

  use App\Episode;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
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
        'episodes' => Episode::where('tmdb_id', $tmdb_id)->get()->groupBy('season_number'),
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
      return $this->item->where('title', 'LIKE', '%' . $title . '%')
        ->orWhere('original_title', 'LIKE', '%' . $title . '%')
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
    }

    /**
     * Create the new movie.
     *
     * @param $data
     * @return Item
     */
    private function createItem($data, TMDB $tmdb)
    {
      $tmdbId = $data['tmdb_id'];
      $mediaType = $data['media_type'];

      $item = $this->item->create([
        'tmdb_id' => $tmdbId,
        'title' => $data['title'],
        'media_type' => $mediaType,
        'original_title' => $data['original_title'],
        'poster' => $data['poster'],
        'rating' => 1,
        'released' => $data['released'],
        'genre' => $data['genre'],
        'created_at' => time(),
      ]);

      if($mediaType == 'tv') {
        $this->createEpisodes($tmdbId, $tmdb);
      }

      return $item;
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
     * Toggle all episodes of an season as seen/unseen.
     */
    public function toggleSeason()
    {
      $tmdb_id = Input::get('tmdb_id');
      $season = Input::get('season');
      $seen = Input::get('seen');

      $episodes = Episode::where('tmdb_id', $tmdb_id)->where('season_number', $season)->get();

      foreach($episodes as $episode) {
        $episode->seen = $seen;
        $episode->save();
      }
    }

    /**
     * Save all episodes of each season.
     *
     * @param $seasons
     * @param $tmdbId
     */
    private function createEpisodes($tmdbId, TMDB $tmdb)
    {
      $seasons = $tmdb->tvEpisodes($tmdbId);

      foreach($seasons as $season) {
        foreach($season->episodes as $episode) {
          $new = new Episode();
          $new->season_tmdb_id = $season->id;
          $new->episode_tmdb_id = $episode->id;
          $new->season_number = $episode->season_number;
          $new->episode_number = $episode->episode_number;
          $new->name = $episode->name;
          $new->tmdb_id = $tmdbId;
          $new->created_at = time();
          $new->save();
        }
      }
    }
  }