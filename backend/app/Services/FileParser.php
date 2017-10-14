<?php

  namespace App\Services;

  use App\AlternativeTitle;
  use App\Item;
  use App\Services\Models\EpisodeService;
  use App\Services\Models\ItemService;
  use App\Setting;
  use Carbon\Carbon;
  use GuzzleHttp\Client;
  use Illuminate\Database\Eloquent\ModelNotFoundException;
  use Illuminate\Support\Facades\DB;
  use Symfony\Component\HttpFoundation\Response;

  class FileParser {

    const ADDED = 'added';
    const REMOVED = 'removed';
    const UPDATED = 'updated';

    // [field in local file => field in database]
    const SUPPORTED_FIELDS = ['src' => 'src', 'subtitles' => 'subtitles', 'name' => 'fp_name'];

    private $itemService;
    private $episodeService;
    private $tmdb;
    private $alternativeTitle;
    private $itemCategory;
    private $client;

    public function __construct(
      ItemService $itemService,
      EpisodeService $episodeService,
      TMDB $tmdb,
      AlternativeTitle $alternativeTitle,
      Client $client
    ){
      $this->itemService = $itemService;
      $this->episodeService = $episodeService;
      $this->tmdb = $tmdb;
      $this->alternativeTitle = $alternativeTitle;
      $this->client = $client;
    }

    /**
     * Make a request to flox-file-parser and get local files data.
     *
     * @return int
     */
    public function fetch()
    {
      error_log("Making request to flox-file-parser...");
      $timestamp = $this->lastFetched()['last_fetch_to_file_parser'];
      $fpUrl = config('services.fp.host') . ':' . config('services.fp.port');
      $fpUri = '/fetch/' . $timestamp;

      $response = $this->client->get($fpUrl . $fpUri);

      error_log("Flox-file-parser request done!");

      return $response->getStatusCode();
    }

    /**
     * Loop over all local files.
     *
     * @param $files
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateDatabase($files)
    {
      error_log("FileParser.updateDatabase");
      DB::beginTransaction();

      $this->updateLastFetched();

      foreach((array) $files as $type => $items) {
        $this->itemCategory = $type;

        foreach($items as $item) {
          try {
            error_log("Updating data:");
            error_log(print_r($item, 1));
            $this->handleStatus($item);
          } catch(\Exception $e) {
            error_log($e->getMessage(), Response::HTTP_BAD_REQUEST);
            return response()->json($e->getMessage(), Response::HTTP_BAD_REQUEST);
          }
        }
      }

      error_log("Updating data: Done!");
      DB::commit();
    }

    /**
     * Check which status the file has.
     * If we can't handle the status, throw an exception.
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
        default:
          $this->abortParser($item);
      }
    }

    /**
     * See if it can find the item in our database, filtered by media_type.
     * Otherwise search in TMDb or create an empty item.
     *
     * @param $item
     * @return bool|mixed
     */
    private function validateStore($item)
    {
      // See if file is already in our database.
      if($found = $this->itemService->findBy('title_strict', $item->name, $this->itemCategory)) {
        return $this->store($item, $found->tmdb_id);
      }

      // Otherwise make a new TMDb request.
      $found = $this->searchTmdb($item);

      if( ! $found) {
        // Create an empty item if nothing is found.
        return $this->createEmptyItem($item);
      }

      return $this->findOrCreateItem($found, $item);
    }

    /**
     * See if it can find the item in our database, filtered by media_type.
     * Check if it is an empty item and search against TMDb and update them.
     * Otherwise create an empty item.
     *
     * @param $item
     * @return mixed
     */
    private function validateUpdate($item)
    {
      // See if file is already in our database.
      if($found = $this->findItemByFPName($item)) {
        if( ! $found->tmdb_id) {
          return $this->searchTmdbAndUpdateEmptyItem($found, $item);
        }

        return $this->update($item, $found->tmdb_id);
      }

      // Create an empty item if nothing is found.
      return $this->createEmptyItem($item);
    }

    /**
     * If result was found in TMDb, remove empty item and re-create from TMDb.
     * Otherwise remove and re-create empty item.
     *
     * @param $emptyItem
     * @param $file
     * @return Item|mixed
     */
    private function searchTmdbAndUpdateEmptyItem($emptyItem, $file)
    {
      $found = $this->searchTmdb($file);

      // We will create a new empty or a real item from TMDb.
      $this->itemService->remove($emptyItem->id);

      if( ! $found) {
        return $this->createEmptyItem($file);
      }

      // Create a new item with TMDb specific values.
      $created = $this->itemService->create($found);

      // We are searching for the changed name (if available) in the next iteration.
      if($this->itemCategory == 'tv') {
        $created->update(['fp_name' => getFileName($file)]);
      }

      // Update FP specific values.
      return $this->update($file, $created->tmdb_id);
    }

    /**
     * Make a new request to TMDb and check against the database.
     * Otherwise create a new item.
     *
     * @param $item
     * @return bool|mixed
     */
    private function searchTmdb($item)
    {
      $found = $this->tmdb->search(getFileName($item), $this->itemCategory);

      if( ! $found) {
        return false;
      }

      return $found[0];
    }

    /**
     * If TMDb can't find anything, create a simple item with data from local file.
     *
     * @param $item
     * @return mixed
     */
    private function createEmptyItem($item)
    {
      return $this->itemService->createEmpty($item, $this->itemCategory);
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
        foreach(self::SUPPORTED_FIELDS as $fromFile => $toDatabase) {
          $model->{$toDatabase} = $item->{$fromFile};
        }

        return $model->save();
      }
    }

    /**
     * Iterate over all changed properties and update them in our database.
     *
     * @param $item
     * @param $tmdbId
     * @return mixed
     */
    private function update($item, $tmdbId)
    {
      // Remove all fields, so we can start from scratch.
      $this->remove($item);

      if($model = $this->findItem($item, $tmdbId)) {
        foreach(self::SUPPORTED_FIELDS as $fromFile => $toDatabase) {
          if(isset($item->changed->{$fromFile})) {
            $model->{$toDatabase} = $item->changed->{$fromFile};
          } else {
            // Re-populate the fields which hasn't changed.
            $model->{$toDatabase} = $item->{$fromFile};
          }
        }

        return $model->save();
      }

      throw new ModelNotFoundException("No item for '$item->name' found in database");
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
        foreach(self::SUPPORTED_FIELDS as $fromFile => $toDatabase) {
          $model->{$toDatabase} = null;
        }

        $model->save();
      }
    }

    /**
     * Cancel the complete fetch and make a rollback of fetched files.
     *
     * @param $item
     * @throws \Exception
     */
    private function abortParser($item)
    {
      DB::rollBack();

      $itemAsString = json_encode($item);

      throw new \Exception("Failed to parse file '$item->name' with status '$item->status'. Please open an issue: https://github.com/devfake/flox/issues and include the following content:\n\n $itemAsString");
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
     * @return mixed
     */
    private function findItemByFPName($item)
    {
      $found = $this->itemService->findBy('fp_name', $item, $this->itemCategory);

      // Search against episodes if no empty item for a tv show was found.
      if( ! $found && $this->itemCategory == 'tv') {
        $episode = $this->episodeService->findBy('fp_name', $item);

        if($episode) {
          $found = $this->itemService->findBy('tmdb_id', $episode->tmdb_id);
        }
      }

      return $found;
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
    private function updateLastFetched()
    {
      Setting::first()->update([
        'last_fetch_to_file_parser' => Carbon::now(),
      ]);
    }

    /**
     * @return mixed
     */
    public function lastFetched()
    {
      $lastFetch = Setting::first()->last_fetch_to_file_parser;

      return [
        'last_fetch_to_file_parser' => $lastFetch->timestamp ?? 0,
      ];
    }
  }
