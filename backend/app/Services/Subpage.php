<?php

  namespace App\Services;

  use App\Services\Models\ItemService;

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
      if($found = $this->itemService->findBy('tmdb_id', $tmdbId)) {
        return $found;
      }

      $found = $this->tmdb->details($tmdbId, $mediaType);
      $found->genre_ids = collect($found->genres)->pluck('id')->all();

      $item = $this->tmdb->createItem($found, $mediaType);
      $item['youtube_key'] = $this->itemService->parseYoutubeKey($found->videos);
      $item['imdb_id'] = $this->itemService->parseImdbId($found, $mediaType);

      return $item;
    }
  }
