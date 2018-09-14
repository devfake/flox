<?php

  namespace App\Http\Controllers;

  use App\Jobs\UpdateItem;
  use App\Services\Models\AlternativeTitleService;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Input;
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
      return $this->itemService->getWithPagination($type, $orderBy, $sortDirection);
    }

    public function episodes($tmdbId)
    {
      return $this->episodeService->getAllByTmdbId($tmdbId);
    }

    public function search()
    {
      return $this->itemService->search(Input::get('q'));
    }

    public function changeRating($itemId)
    {
      return $this->itemService->changeRating($itemId, Input::get('rating'));
    }

    public function add()
    {
      return $this->itemService->create(Input::get('item'));
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
        return response('Server Error', 500);
      }

      return response('Success', 200);
    }

    public function toggleSeason()
    {
      $tmdbId = Input::get('tmdb_id');
      $season = Input::get('season');
      $seen = Input::get('seen');

      $this->episodeService->toggleSeason($tmdbId, $season, $seen);
    }
  }
