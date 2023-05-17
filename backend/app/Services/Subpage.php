<?php

  namespace App\Services;

  use App\Services\Models\ItemService;
  use App\Services\Models\PersonService;
  use Symfony\Component\HttpFoundation\Response;

  class Subpage {

    private $itemService;
    private $personService;
    private $tmdb;

    public function __construct(
      ItemService $itemService,
      PersonService $personService,
      TMDB $tmdb
    )
    {
      $this->itemService = $itemService;
      $this->personService = $personService;
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
      $found->credit_cast = $this->personService->castFromTMDB($tmdbId, $found->credits->cast);
      $found->credit_crew = $this->personService->crewFromTMDB($tmdbId, $found->credits->crew);

      $item = $this->tmdb->createItem($found, $mediaType);
      $item['youtube_key'] = $this->itemService->parseYoutubeKey($found, $mediaType);
      $item['imdb_id'] = $this->itemService->parseImdbId($found);

      return $item;
    }
  }
