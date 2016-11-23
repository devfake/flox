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

    /**
     * Parse language file.
     *
     * @return mixed
     */
    public function parseLanguage()
    {
      $alternative = config('app.TRANSLATION') ?: 'EN';
      $filename = strtolower($alternative) . '.json';

      // Get english fallback
      if( ! LaravelStorage::disk('languages')->exists($filename)) {
        $filename = 'en.json';
      }

      return LaravelStorage::disk('languages')->get($filename);
    }
  }