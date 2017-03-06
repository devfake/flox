<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\Storage;
  use Carbon\Carbon;
  use Illuminate\Support\Facades\Input;
  use Symfony\Component\HttpFoundation\Response;

  class ExportImportController {

    private $item;
    private $episodes;
    private $storage;
    private $version;
    private $alternativeTitles;

    public function __construct(Item $item, Episode $episodes, AlternativeTitle $alternativeTitles, Storage $storage)
    {
      $this->item = $item;
      $this->episodes = $episodes;
      $this->alternativeTitles = $alternativeTitles;
      $this->storage = $storage;
      $this->version = config('app.version');
    }

    /**
     * Save all movies and series as json file and return a download response.
     *
     * @return mixed
     */
    public function export()
    {
      $data['items'] = $this->item->all();
      $data['episodes'] = $this->episodes->all();
      $data['alternative_titles'] = $this->alternativeTitles->all();

      $filename = $this->storage->createExportFilename();

      $this->storage->saveExport($filename, json_encode($data));

      return response()->download(base_path('../public/exports/' . $filename));
    }

    /**
     * Reset item table and restore backup.
     * Downloads every poster image new.
     *
     * @return Response
     */
    public function import()
    {
      // todo: run data update after import
      increaseTimeLimit();

      $file = Input::file('import');

      $extension = $file->getClientOriginalExtension();

      if($extension !== 'json') {
        return response('This is not a flox backup file.', Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      $data = json_decode(file_get_contents($file));

      if(isset($data->items)) {
        $this->item->truncate();
        foreach($data->items as $item) {
          // Fallback if export was from an older version of flox (<= 1.2.2).
          if( ! isset($item->last_seen_at)) {
            $item->last_seen_at = Carbon::createFromTimestamp($item->created_at);
          }

          $this->item->create((array) $item);
          // todo: download backdrop and subpage poster
          $this->storage->downloadPoster($item->poster);
        }
      }

      if(isset($data->episodes)) {
        $this->episodes->truncate();
        foreach($data->episodes as $episode) {
          $this->episodes->create((array) $episode);
        }
      }

      if(isset($data->alternative_titles)) {
        $this->alternativeTitles->truncate();
        foreach($data->alternative_titles as $title) {
          $this->alternativeTitles->create((array) $title);
        }
      }
    }
  }
