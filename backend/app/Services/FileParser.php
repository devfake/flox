<?php

  namespace App\Services;

  use App\AlternativeTitle;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use App\Setting;
  use Carbon\Carbon;

  class FileParser {

    const ADDED = 'added';
    const REMOVED = 'removed';

    private $itemService;
    private $episodeService;
    private $tmdb;
    private $alternativeTitle;
    private $itemCategory;

    public function __construct(
      ItemService $itemService,
      EpisodeService $episodeService,
      TMDB $tmdb,
      AlternativeTitle $alternativeTitle
    ){
      $this->itemService = $itemService;
      $this->episodeService = $episodeService;
      $this->tmdb = $tmdb;
      $this->alternativeTitle = $alternativeTitle;
    }

    /**
     * Make a request to flox-file-parser and get local files data.
     *
     * @return array
     */
    public function fetch()
    {
      $this->updateTimestamp();

      return json_decode(
        file_get_contents(base_path('tests/fixtures/fp/all.json'))
      );
    }

    /**
     * Loop over all local files.
     *
     * @param $files
     */
    public function updateDatabase($files)
    {
      foreach($files as $type => $items) {
        $this->itemCategory = $type;

        foreach($items as $item) {
          $this->handleStatus($item);
        }
      }
    }

    /**
     * Check which status the file has.
     *
     * @param $item
     * @return bool|mixed|void
     */
    private function handleStatus($item)
    {
      switch($item->status) {
        case self::ADDED:
          return $this->validateStore($item);
        case self::REMOVED:
          return $this->remove($item);
      }
    }

    /**
     * See if it can find the item in our database. Otherwise search in TMDb.
     *
     * @param $item
     * @return bool|mixed
     */
    private function validateStore($item)
    {
      $title = $item->name;

      // See if file is already in our database.
      if($found = $this->itemService->findBy('title', $title)) {
        return $this->store($item, $found->tmdb_id);
      }

      // Otherwise make a new TMDb request.
      return $this->tmdbSearch($title, $item);
    }

    /**
     * Make a new request to TMDb and check against the database. Otherwise create a new item.
     *
     * @param $title
     * @param $item
     * @return bool|mixed
     */
    private function tmdbSearch($title, $item)
    {
      $result = $this->tmdb->search($title);

      if( ! $result) {
        return false;
      }

      return $this->findOrCreateItem($result[0], $item);
    }

    /**
     * Check tmdb_id against the database or create a new item.
     *
     * @param $firstResult
     * @param $item
     * @return mixed
     */
    private function findOrCreateItem($firstResult, $item)
    {
      $tmdbId = $firstResult['tmdb_id'];

      // Check against our database.
      if($this->itemService->findBy('tmdb_id', $tmdbId)) {
        return $this->store($item, $tmdbId);
      }

      // Otherwise create a new item from the result.
      $created = $this->itemService->create($firstResult);

      return $this->store($item, $created->tmdb_id);
    }

    /**
     * Store src from local file into items for movies or episodes for tv shows.
     *
     * @param $item
     * @param $tmdbId
     * @return mixed
     */
    private function store($item, $tmdbId)
    {
      $model = $this->findItem($item, $tmdbId);

      if($model) {
        return $model->update([
          'src' => $item->src,
          'subtitles' => $item->subtitles,
        ]);
      }
    }

    /**
     * Remove src for local file in items for movies or episodes for tv shows.
     *
     * @param $item
     * @return mixed
     */
    private function remove($item)
    {
      $model = $this->findItemBySrc($item);

      if($model) {
        return $model->update([
          'src' => null,
          'subtitles' => null,
        ]);
      }
    }

    /**
     * @param $item
     * @param $tmdbId
     * @return \Illuminate\Support\Collection|mixed
     */
    private function findItem($item, $tmdbId)
    {
      if($this->itemCategory == 'tv') {
        return $this->episodeService->findBy('episode', $tmdbId, $item);
      }

      return $this->itemService->findBy('tmdb_id', $tmdbId);
    }

    /**
     * @param $item
     * @return \Illuminate\Support\Collection|mixed
     */
    private function findItemBySrc($item)
    {
      if($this->itemCategory == 'tv') {
        return $this->episodeService->findBy('src', $item->src);
      }

      return $this->itemService->findBy('src', $item->src);
    }

    /**
     * Update last time we fetched flox-file-parser.
     */
    private function updateTimestamp()
    {
      Setting::first()->update([
        'last_fetch_to_file_parser' => Carbon::now(),
      ]);
    }
  }
