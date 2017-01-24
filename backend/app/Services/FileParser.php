<?php

  namespace App\Services;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Services\Models\ItemService;
  use App\Setting;
  use Carbon\Carbon;

  class FileParser {

    private $item;
    private $episode;
    private $tmdb;
    private $alternativeTitle;
    private $itemCategory;

    public function __construct(
      ItemService $item,
      Episode $episode,
      TMDB $tmdb,
      AlternativeTitle $alternativeTitle
    ){
      $this->item = $item;
      $this->episode = $episode;
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
     * Loop over local files and see if it can find them in database. Otherwise search in TMDb.
     *
     * @param $files
     */
    public function store($files)
    {
      foreach($files as $type => $items) {
        $this->itemCategory = $type;

        foreach($items as $item) {
          $title = $item->name;

          // See if file is already in our database.
          if($found = $this->item->findBy('title', $title)) {
            $this->handleStatus($item, $found->tmdb_id);

            continue;
          }

          // Otherwise make a new TMDb request.
          $this->tmdbSearch($title, $item);
        }
      }
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
     * @return \Exception|mixed
     */
    private function findOrCreateItem($firstResult, $item)
    {
      $tmdbId = $firstResult['tmdb_id'];

      // Check against our database.
      if($this->item->findBy('tmdb_id', $tmdbId)) {
        return $this->handleStatus($item, $tmdbId);
      }

      // Otherwise create a new item from the result.
      $created = $this->item->create($firstResult);

      return $this->handleStatus($item, $created->tmdb_id);
    }

    /**
     * Check which status the file has.
     * Create new src if the status is 'added'.
     * Update src if status is 'updated'.
     * Remove src if status is 'removed'.
     *
     * @param $item
     * @param $tmdb_id
     * @return mixed
     */
    public function handleStatus($item, $tmdbId)
    {
      if($item->status == 'added') {
        return $this->storeSrc($item, $tmdbId);
      }
    }

    /**
     * Store src from local file into items for movies or episodes for tv shows.
     *
     * @param $item
     * @param $tmdb_id
     */
    private function storeSrc($item, $tmdbId)
    {
      if($this->itemCategory == 'tv') {
        $model = $this->episode->findEpisode($tmdbId, $item);
      } else {
        $model = $this->item->findBy('tmdb_id', $tmdbId);
      }

      return $model->update([
        'src' => $item->src,
      ]);
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
