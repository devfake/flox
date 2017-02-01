<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\FileParser;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Artisan;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;
  use Symfony\Component\HttpFoundation\Response;

  class SettingController {

    private $item;
    private $episodes;
    private $storage;
    private $version;
    private $setting;
    private $alternativeTitles;

    public function __construct(Item $item, Episode $episodes, AlternativeTitle $alternativeTitles, Storage $storage, Setting $setting)
    {
      $this->item = $item;
      $this->episodes = $episodes;
      $this->alternativeTitles = $alternativeTitles;
      $this->storage = $storage;
      $this->setting = $setting;
      $this->version = config('app.version');
    }

    /**
     * Save all movies and series as json file and return an download response.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function export()
    {
      $data['items'] = $this->item->all();
      $data['episodes'] = $this->episodes->all();
      $data['alternative_titles'] = $this->alternativeTitles->all();

      $file = 'flox--' . date('Y-m-d---H-i') . '.json';

      $this->storage->saveExport($file, json_encode($data));

      return response()->download(base_path('../public/exports/' . $file));
    }

    /**
     * Reset item table and restore backup. Download every poster image new.
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function import()
    {
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
          $this->item->create((array) $item);
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

    /**
     * Check the latest release of flox and compare them to the local version.
     *
     * @return string
     */
    public function checkForUpdate()
    {
      $client = new Client();
      $response = json_decode($client->get('https://api.github.com/repos/devfake/flox/releases')->getBody());

      $lastestVersion = $response[0]->name;

      return version_compare($this->version, $lastestVersion, '<') ? 'true' : 'false';
    }

    /**
     * Parse full genre list of all movies and tv shows in our database and save them.
     *
     * @param TMDB $tmdb
     */
    public function updateGenre(TMDB $tmdb)
    {
      increaseTimeLimit();

      $items = $this->item->all();

      $items->each(function($item) use ($tmdb) {
        $genres = $tmdb->details($item->tmdb_id, $item->media_type)->genres;
        $data = collect($genres)->pluck('name')->all();

        $item->genre = implode($data, ', ');
        $item->save();
      });
    }

    /**
     * Sync Flox with laravel scout driver in settings.
     */
    public function syncScout()
    {
      Artisan::call('flox:sync');
    }

    /**
     * Return user settings for frontend.
     *
     * @return array
     */
    public function settings()
    {
      $settings = $this->setting->first();

      if( ! $settings) {
        $settings = $this->setting->create([
          'show_genre' => 0,
          'show_date' => 1,
          'episode_spoiler_protection' => 1,
        ]);
      }

      return [
        'username' => Auth::check() ? Auth::user()->username : '',
        'genre' => $settings->show_genre,
        'date' => $settings->show_date,
        'spoiler' => $settings->episode_spoiler_protection,
        'version' => $this->version,
      ];
    }

    /**
     * @return array
     */
    public function getVersion()
    {
      return [
        'version' => $this->version,
      ];
    }

    /**
     * Update new settings.
     */
    public function updateSettings()
    {
      $this->setting->first()->update([
        'show_genre' => Input::get('genre'),
        'show_date' => Input::get('date'),
        'episode_spoiler_protection' => Input::get('spoiler'),
      ]);
    }

    /**
     * Call flox-file-parser.
     *
     * @param FileParser $parser
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchFiles(FileParser $parser)
    {
      increaseTimeLimit();

      $files = $parser->fetch();

      return $parser->updateDatabase($files);
    }
  }
