<?php

  namespace App\Services;

  use App\Services\Models\ItemService;
  use Symfony\Component\HttpFoundation\Response;

  class Subpage {

    private $itemService;
    private $tmdb;

    public function __construct(ItemService $itemService, TMDB $tmdb)
    {
      $this->itemService = $itemService;
      $this->tmdb = $tmdb;
    }

    public function item($tmdbId, $mediaType)
    {
      if($found = $this->itemService->findBy('tmdb_id_strict', $tmdbId, $mediaType)) {
        return $found;
      }

      $found = $this->tmdb->details($tmdbId, $mediaType);

      if( ! (array) $found) {
        return response('Not found', Response::HTTP_NOT_FOUND);
      }

      $found->genre_ids = collect($found->genres)->pluck('id')->all();

      $item = $this->tmdb->createItem($found, $mediaType);
      $item['youtube_key'] = $this->itemService->parseYoutubeKey($found, $mediaType);
      $item['imdb_id'] = $this->itemService->parseImdbId($found);

      return $item;
    }
  }
