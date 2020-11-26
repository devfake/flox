<?php

  namespace App\Http\Controllers;

  use App\Services\Models\AlternativeTitleService;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use Illuminate\Support\Facades\Request;
  use Symfony\Component\HttpFoundation\Response;

  class ItemController {

    private $itemService;
    private $episodeService;

    public function __construct(ItemService $itemService, EpisodeService $episodeService)
    {
      $this->itemService = $itemService;
      $this->episodeService = $episodeService;
    }

    public function items($type, $orderBy, $sortDirection)
    {
      return $this->itemService->getWithPagination($type, $orderBy, $sortDirection, Request::input('hideCompleted'));
    }

    public function episodes($tmdbId)
    {
      return $this->episodeService->getAllByTmdbId($tmdbId);
    }

    public function search()
    {
      return $this->itemService->search(Request::input('q'));
    }

    public function changeRating($itemId)
    {
      return $this->itemService->changeRating($itemId, Request::input('rating'));
    }

    public function add()
    {
      return $this->itemService->create(Request::input('item'));
    }

    public function watchlist()
    {
      $item = $this->add();

      $item->update(['watchlist' => true]);

      return $item;
    }

    public function remove($itemId)
    {
      return $this->itemService->remove($itemId);
    }

    public function refresh($itemId)
    {
      $this->itemService->refresh($itemId);

      return response([], Response::HTTP_OK);
    }

    public function refreshAll()
    {
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $this->itemService->refreshAll();

      return response([], Response::HTTP_OK);
    }

    public function updateAlternativeTitles(AlternativeTitleService $alternativeTitle)
    {
      $alternativeTitle->update();
    }

    public function toggleEpisode($id)
    {
      if( ! $this->episodeService->toggleSeen($id)) {
        return response('Server Error', Response::HTTP_INTERNAL_SERVER_ERROR);
      }

      return response('Success', Response::HTTP_OK);
    }

    public function toggleSeason()
    {
      $tmdbId = Request::input('tmdb_id');
      $season = Request::input('season');
      $seen = Request::input('seen');

      $this->episodeService->toggleSeason($tmdbId, $season, $seen);
    }
  }
