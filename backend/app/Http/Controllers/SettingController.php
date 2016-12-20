<?php

  namespace App\Http\Controllers;

  use App\Episode;
  use App\Http\Requests\ImportRequest;
  use App\Item;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Artisan;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;

  class SettingController {

    private $item;
    private $episodes;
    private $storage;
    private $version;

    public function __construct(Item $item, Episode $episodes, Storage $storage)
    {
      $this->item = $item;
      $this->episodes = $episodes;
      $this->storage = $storage;
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

      $file = 'flox--' . date('Y-m-d---H-i') . '.json';

      $this->storage->saveExport($file, json_encode($data));

      return response()->download(base_path('../public/exports/' . $file));
    }

    /**
     * Reset item table and restore backup. Download every poster image new.
     *
     * @param ImportRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function import(ImportRequest $request)
    {
      set_time_limit(300);

      $file = $request->file('import');
      $extension = $file->getClientOriginalExtension();

      if($extension !== 'json') {
        return response('Wrong File', 422);
      }

      $data = json_decode(file_get_contents($file));

      $this->item->truncate();
      foreach($data->items as $item) {
        $this->item->create((array) $item);
        $this->storage->createPosterFile($item->poster);
      }

      $this->episodes->truncate();
      foreach($data->episodes as $episode) {
        $this->episodes->create((array) $episode);
      }
    }

    /**
     * Check the latest release of flox and compare them to the local version.
     *
     * @return string
     */
    public function checkUpdate()
    {
      $client = new Client();
      $response = json_decode($client->get('https://api.github.com/repos/devfake/flox/releases')->getBody());

      $lastestVersion = $response[0]->name;

      return version_compare($this->version, $lastestVersion, '<') ? 'true' : 'false';
    }
    /**
     * Parse full genre list of all movies in database and save them.
     *
     * @param TMDB $tmdb
     */
    public function updateGenre(TMDB $tmdb)
    {
      set_time_limit(300);

      $items = Item::all();

      foreach($items as $item) {
        if( ! $item->genre) {
          $data = [];
          $genres = $tmdb->movie($item->tmdb_id)->genres;
          foreach($genres as $genre) {
            $data[] = $genre->name;
          }

          $item->genre = implode($data, ', ');
          $item->save();

          // Help for TMDb request limit.
          sleep(1);
        }
      }
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
      $settings = Setting::first();

      if( ! $settings) {
        $settings = Setting::create([
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
     * Save new user settings.
     */
    public function changeSettings()
    {
      Setting::first()->update([
        'show_genre' => Input::get('genre'),
        'show_date' => Input::get('date'),
        'episode_spoiler_protection' => Input::get('spoiler'),
      ]);
    }
  }