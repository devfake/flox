<?php

  namespace App\Services;

  use App\Item;
  use Illuminate\Database\Eloquent\Collection;

  class FileParser {

    private $item;
    private $tmdb;

    public function __construct(Item $item, TMDB $tmdb)
    {
      $this->item = $item;
      $this->tmdb = $tmdb;
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
          $title = $this->isTvShow($item) ? $item->title : $item->name;

          // See if file is already in our database.
          if($found = $this->foundInDatabase($title)) {
            $this->storeSrc($found->tmdb_id, $item);

            continue;
          }

          // Otherwise make a new TMDb request.
          $this->searchTmdb($title, $item);
        }
      }
    }

    private function searchTmdb($title, $item)
    {
      $result = $this->tmdb->search($title)[0];

      $tmdb_id = $result['tmdb_id'];

      // Check against our database.
      if($this->foundInDatabase($tmdb_id)) {
        return $this->storeSrc($tmdb_id, $item);
      }

      // Otherwise create a new item from the result.
      // todo: move createItem() from ItemController to Item Model
    }

    /**
     * See if we can find a item by title or tmdb_id in our database.
     *
     * @param $indicator
     * @return Collection
     */
    private function foundInDatabase($indicator)
    {
      $method = is_numeric($indicator) ? 'searchTmdbId' : 'searchTitle';

      return $this->item->{$method}($indicator)->first();
    }

    private function storeSrc($tmdb_id, $item)
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
      return isset($item->title);
    }
  }