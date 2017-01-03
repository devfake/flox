<?php

  namespace App\Services;

  use App\Item;
  use Illuminate\Database\Eloquent\Collection;

  class FileParser {

    private $item;
    private $tmdb;
    private $storage;

    public function __construct(Item $item, TMDB $tmdb, Storage $storage)
    {
      $this->item = $item;
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
        file_get_contents(base_path('tests/fixtures/media_files.json'))
      );
    }

    /**
     * Loop over local files and see if it can find them in database,
     * otherwise create a new item.
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
          $this->searchTmdb($title, $item);
        }
      }
    }

    private function searchTmdb($title, $item)
    {
      $result = $this->tmdb->search($title);

      // If no match found,
      if( ! $result) {
        return false;
      }

      $result = $result[0];
      $tmdb_id = $result['tmdb_id'];

      // Check against our database.
      if($this->foundInDatabase($tmdb_id, 'tmdb_id')) {
        return $this->handleStatus($item, $tmdb_id);
      }

      // Otherwise create a new item from the result.
      $created = $this->item->createItem($result, $this->tmdb, $this->storage);

      return $this->handleStatus($item, $created->tmdb_id);
    }

    /**
     * See if we can find a item by title or tmdb_id in our database.
     *
     * @param $indicator
     * @return Collection
     */
    private function foundInDatabase($value, $type)
    {
      if($type == 'title') {
        return $this->item->searchTitle($value)->first();
      }

      return $this->item->searchTmdbId($value)->first();
    }

    private function handleStatus($item, $tmdb_id)
    {
      if($item->status == 'added') {
        return $this->storeSrc($item, $tmdb_id);
      }

      if($item->status == 'removed') {
        //
      }
    }

    private function storeSrc($item, $tmdb_id)
    {
      if($this->isTvShow($item)) {
        return $this->storeTvSrc($tmdb_id, $item);
      }

      return $this->storeMovieSrc($tmdb_id, $item->src);
    }

    private function storeTvSrc($tmdb_id, $item)
    {
      return '';
    }

    /**
     * Store the src for a movie directly in items table.
     *
     * @param $tmdb_id
     * @param $item
     */
    private function storeMovieSrc($tmdb_id, $src)
    {
      return $this->item->searchTmdbId($tmdb_id)->update([
        'src' => $src,
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