<?php

  namespace App\Services;

  use Illuminate\Support\Facades\Storage as LaravelStorage;

  class Storage {

    /**
     * Save backup as json into /public/exports.
     *
     * @param $file
     * @param $items
     */
    public function saveExport($file, $items)
    {
      LaravelStorage::disk('export')->put($file, $items);
    }

    /**
     * Create the poster image file.
     *
     * @param $poster
     */
    public function createPosterFile($poster)
    {
      if($poster) {
        LaravelStorage::put($poster, file_get_contents('http://image.tmdb.org/t/p/w185' . $poster));
      }
    }

    /**
     * Delete the poster image file.
     *
     * @param $poster
     */
    public function removePosterFile($poster)
    {
      LaravelStorage::delete($poster);
    }
  }