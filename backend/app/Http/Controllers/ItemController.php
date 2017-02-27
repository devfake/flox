<?php

  namespace App\Http\Controllers;

  use App\Item;
  use App\Services\Models\AlternativeTitleService;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use App\Services\Storage;
  use App\Services\TMDB;
  use Illuminate\Support\Facades\Input;

  class ItemController {

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
      $this->item = $item;
      $this->storage = $storage;
      $this->tmdb = $tmdb;
    }

    /**
     * Return all items with pagination.
     *
     * @param ItemService $itemService
     * @param             $type
     * @param             $orderBy
     * @return mixed
     * @internal param ItemService $item
     */
    public function items(ItemService $itemService, $type, $orderBy)
    {
      return $itemService->getWithPagination($type, $orderBy);
    }

    /**
     * Get all Episodes of an tv show.
     *
     * @param EpisodeService $episodeService
     * @param                $tmdbId
     * @return array
     */
    public function episodes(EpisodeService $episodeService, $tmdbId)
    {
      return $episodeService->getAllByTmdbId($tmdbId);
    }

    /**
     * Search for items by 'title' in database.
     *
     * @return mixed
     */
    public function search()
    {
      $title = Input::get('q');

      // We don't have an smart search driver and return an simple 'like' query.
      return $this->item->findByTitle($title)->with('latestEpisode')->withCount('episodesWithSrc')->get();
    }

    /**
     * Update rating for an movie.
     *
     * @param ItemService $itemService
     * @param             $itemId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changeRating(ItemService $itemService, $itemId)
    {
      return $itemService->changeRating($itemId, Input::get('rating'));
    }

    /**
     * Create a new movie / tv show.
     *
     * @param ItemService $item
     * @return Item
     */
    public function add(ItemService $item)
    {
      return $item->create(Input::get('item'));
    }

    /**
     * Delete movie or tv show (with episodes and alternative titles).
     * Also remove the poster image file.
     *
     * @param ItemService $itemService
     * @param             $itemId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function remove(ItemService $itemService, $itemId)
    {
      return $itemService->remove($itemId);
    }

    /**
     * Update alternative titles for all tv shows and movies or specific item.
     * For old versions of flox or to keep all alternative titles up to date.
     *
     * @param AlternativeTitleService $alternativeTitle
     * @param null                    $tmdbId
     */
    public function updateAlternativeTitles(AlternativeTitleService $alternativeTitle, $tmdbId = null)
    {
      $alternativeTitle->update($tmdbId);
    }

    /**
     * Set an episode as seen / unseen.
     *
     * @param EpisodeService $episode
     * @param                $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function toggleEpisode(EpisodeService $episode, $id)
    {
      if( ! $episode->toggleSeen($id)) {
        return response('Server Error', 500);
      }

      return response('Success', 200);
    }

    /**
     * Toggle all episodes of an season as seen / unseen.
     *
     * @param EpisodeService $episode
     */
    public function toggleSeason(EpisodeService $episodeService)
    {
      $tmdbId = Input::get('tmdb_id');
      $season = Input::get('season');
      $seen = Input::get('seen');

      $episodeService->toggleSeason($tmdbId, $season, $seen);
    }
  }
