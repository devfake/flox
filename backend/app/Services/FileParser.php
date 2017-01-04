<?php

  namespace App\Services;

  use App\Episode;
  use App\Item;
  use Illuminate\Database\Eloquent\Collection;

  class FileParser {

    private $item;
    private $episode;
    private $tmdb;
    private $storage;

    public function __construct(Item $item, Episode $episode, TMDB $tmdb, Storage $storage)
    {
      $this->item = $item;
      $this->episode = $episode;
      $this->tmdb = $tmdb;
      $this->storage = $storage;
    }

    /**
     * Make a request to flox-file-parser and get local files data.
     *
     * @return array
     */
    public function fetch()
    {
      return json_decode(
        file_get_contents(base_path('tests/fixtures/Files/all.json'))
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
        foreach($items as $item) {
          $title = $this->isTvShow($item) ? $item->tv_title : $item->name;

          // See if file is already in our database.
          if($found = $this->foundInDatabase($title, 'title')) {
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
      $tmdb_id = $firstResult['tmdb_id'];

      // Check against our database.
      if($this->foundInDatabase($tmdb_id, 'tmdb_id')) {
        return $this->handleStatus($item, $tmdb_id);
      }

      // Otherwise create a new item from the result.
      $created = $this->item->store($firstResult, $this->tmdb, $this->storage);

      return $this->handleStatus($item, $created->tmdb_id);
    }

    /**
     * See if we can find a item by title or tmdb_id in our database.
     *
     * @param $indicator
     * @return Collection
     */
    public function foundInDatabase($value, $type)
    {
      if($type == 'title') {
        return $this->item->findByTitle($value)->first();
      }

      return $this->item->findByTmdbId($value)->first();
    }

    /**
     * Check which status the file has.
     * Create new src if the status is 'added'.
     * Update src if status is 'updated'.
     * Remove src if status is 'removed'.
     *
     * @param $item
     * @param $tmdb_id
     * @return \Exception|mixed
     */
    public function handleStatus($item, $tmdb_id)
    {
      if($item->status == 'added') {
        return $this->storeSrc($item, $tmdb_id);
      }

      return new \Exception('No status in file found');
    }

    /**
     * Store src from local file into items for movies or episodes for tv shows.
     *
     * @param $item
     * @param $tmdb_id
     */
    private function storeSrc($item, $tmdb_id)
    {
      if($this->isTvShow($item)) {
        $model = $this->episode->searchEpisode($tmdb_id, $item);
      } else {
        $model = $this->item->findByTmdbId($tmdb_id);
      }

      return $model->update([
        'src' => $item->src,
      ]);
    }

    /**
     * If item has title property, it's an tv show.
     *
     * @param $item
     * @return bool
     */
    private function isTvShow($item)
    {
      return isset($item->tv_title);
    }
  }