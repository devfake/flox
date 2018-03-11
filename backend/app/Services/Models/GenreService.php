<?php

  namespace App\Services\Models;

  use App\Genre as Model;
  use App\Services\TMDB;
  use Illuminate\Support\Facades\DB;

  class GenreService {

    private $model;
    private $tmdb;

    /**
     * @param Model $model
     * @param TMDB $tmdb
     */
    public function __construct(Model $model, TMDB $tmdb)
    {
      $this->model = $model;
      $this->tmdb = $tmdb;
    }

    /**
     * Sync the pivot table genre_item.
     * 
     * @param $item
     * @param $ids
     */
    public function sync($item, $ids)
    {
      $item->genre()->sync($ids);
    }

    /**
     * Update the genres table.
     */
    public function updateGenreLists()
    {
      $genres = $this->tmdb->getGenreLists();

      DB::beginTransaction();

      foreach($genres as $mediaType) {
        foreach($mediaType->genres as $genre) {
          $this->model->firstOrCreate(
            ['id' => $genre->id],
            ['name' => $genre->name]
          );
        }
      }

      DB::commit();
    }
  }
