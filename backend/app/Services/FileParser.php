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
    const UPDATED = 'updated';

    const SUPPORTED_FIELDS = ['src', 'subtitles'];

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

      return json_decode(file_get_contents(base_path('tests/fixtures/fp/all.json')));
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
        case self::UPDATED:
          return $this->validateUpdate($item);
        case self::REMOVED:
          return $this->remove($item);
      }
    }

    /**
     * See if it can find the item in our database.
     * Otherwise search in TMDb.
     *
     * @param $item
     * @return bool|mixed
     */
    private function validateStore($item)
    {
      // See if file is already in our database.
      if($found = $this->itemService->findBy('title', $item->name)) {
        return $this->store($item, $found->tmdb_id);
      }

      // Otherwise make a new TMDb request.
      return $this->tmdbSearch($item);
    }

    /**
     * See if it can find the item in our database.
     * Otherwise search in TMDb and try to find them in our database again and update the fields.
     *
     * @param $item
     * @return mixed
     */
    private function validateUpdate($item)
    {
      // See if file is already in our database.
      if($found = $this->findItemBySrc($item)) {
        return $this->update($item, $found);
      }

      // Otherwise make a new TMDb request.
      $this->tmdbSearch($item);

      return $this->validateUpdate($item);
    }

    /**
     * Make a new request to TMDb and check against the database. Otherwise create a new item.
     *
     * @param $item
     * @return bool|mixed
     */
    private function tmdbSearch($item)
    {
      $result = $this->tmdb->search($item->name);

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
     * Store current supported fields from local file into our database.
     *
     * @param $item
     * @param $tmdbId
     * @return mixed
     */
    private function store($item, $tmdbId)
    {
      if($model = $this->findItem($item, $tmdbId)) {
        foreach(self::SUPPORTED_FIELDS as $field) {
          $model->{$field} = $item->{$field};
        }

        $model->save();
      }
    }

    /**
     * Iterate over all changed properties and update them in our database.
     *
     * @param $item
     * @param $model
     * @return mixed
     */
    private function update($item, $model)
    {
      foreach($item->changed as $field => $value) {
        if(in_array($field, self::SUPPORTED_FIELDS)) {
          $model->{$field} = $value;
        }
      }

      return $model->save();
    }

    /**
     * Reset all supported fields for local file from our database.
     *
     * @param $item
     * @return mixed
     */
    private function remove($item)
    {
      if($model = $this->findItemBySrc($item)) {
        foreach(self::SUPPORTED_FIELDS as $field) {
          $model->{$field} = null;
        }

        $model->save();
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
