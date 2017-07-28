<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\Models\ItemService;
  use App\Services\Storage;
  use App\Setting;
  use Carbon\Carbon;
  use Illuminate\Support\Facades\Input;
  use Symfony\Component\HttpFoundation\Response;

  class ExportImportController {

    private $item;
    private $episodes;
    private $storage;
    private $version;
    private $alternativeTitles;
    private $settings;

    public function __construct(Item $item, Episode $episodes, AlternativeTitle $alternativeTitles, Storage $storage, Setting $settings)
    {
      $this->item = $item;
      $this->episodes = $episodes;
      $this->alternativeTitles = $alternativeTitles;
      $this->storage = $storage;
      $this->settings = $settings;
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
      $data['settings'] = $this->settings->all();

      $filename = $this->storage->createExportFilename();

      $this->storage->saveExport($filename, json_encode($data));

      return response()->download(base_path('../public/exports/' . $filename));
    }

    /**
     * Reset item table and restore backup.
     * Downloads every poster image new.
     *
     * @param ItemService $itemService
     * @return Response
     */
    public function import(ItemService $itemService)
    {
      increaseTimeLimit();

      $file = Input::file('import');

      $extension = $file->getClientOriginalExtension();

      if($extension !== 'json') {
        return response('This is not a flox backup file.', Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      $data = json_decode(file_get_contents($file));

      $this->importItems($data, $itemService);
      $this->importEpisodes($data);
      $this->importAlternativeTitles($data);
      $this->importSettings($data);
    }

    private function importItems($data, ItemService $itemService)
    {
      if(isset($data->items)) {
        $this->item->truncate();
        foreach($data->items as $item) {
          // Fallback if export was from an older version of flox (<= 1.2.2).
          if( ! isset($item->last_seen_at)) {
            $item->last_seen_at = Carbon::createFromTimestamp($item->created_at);
          }

          // For empty items (from file-parser) we don't need access to details.
          if($item->tmdb_id) {
            $item = $itemService->makeDataComplete((array) $item);
            $this->storage->downloadImages($item['poster'], $item['backdrop']);
          }

          $this->item->create((array) $item);
        }

        $itemService->refreshAll();
      }
    }

    private function importEpisodes($data)
    {
      if(isset($data->episodes)) {
        $this->episodes->truncate();
        foreach($data->episodes as $episode) {
          $this->episodes->create((array) $episode);
        }
      }
    }

    private function importAlternativeTitles($data)
    {
      if(isset($data->alternative_titles)) {
        $this->alternativeTitles->truncate();
        foreach($data->alternative_titles as $title) {
          $this->alternativeTitles->create((array) $title);
        }
      }
    }

    private function importSettings($data)
    {
      if(isset($data->settings)) {
        $this->settings->truncate();
        foreach($data->settings as $setting) {
          $this->settings->create((array) $setting);
        }
      }
    }
  }
