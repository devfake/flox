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
     * Create the export filename.
     *
     * @return string
     */
    public function createExportFilename()
    {
      return 'flox--' . date('Y-m-d---H-i') . '.json';
    }

    /**
     * Download poster and backdrop image files.
     *
     * @param $poster
     * @param $backdrop
     */
    public function downloadImages($poster, $backdrop)
    {
      if($poster) {
        LaravelStorage::put($poster, file_get_contents(config('services.tmdb.poster') . $poster));
        LaravelStorage::disk('subpage')->put($poster, file_get_contents(config('services.tmdb.poster_subpage') . $poster));
      }

      if($backdrop) {
        LaravelStorage::disk('backdrop')->put($backdrop, file_get_contents(config('services.tmdb.backdrop') . $backdrop));
      }
    }

    /**
     * Delete poster and backdrop image files.
     *
     * @param $poster
     * @param $backdrop
     */
    public function removeImages($poster, $backdrop)
    {
      LaravelStorage::delete($poster);
      LaravelStorage::disk('subpage')->delete($poster);
      LaravelStorage::disk('backdrop')->delete($backdrop);
    }

    /**
     * Parse language file.
     *
     * @return mixed
     */
    public function parseLanguage()
    {
      $alternative = config('app.TRANSLATION');
      $filename = strtolower($alternative) . '.json';

      // Get english fallback
      if( ! LaravelStorage::disk('languages')->exists($filename)) {
        $filename = 'en.json';
      }

      return LaravelStorage::disk('languages')->get($filename);
    }
  }
