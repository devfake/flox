<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Services\FileParser;
  use App\Services\Storage;
  use App\Services\TMDB;
  use App\Setting;
  use Carbon\Carbon;
  use GuzzleHttp\Client;
  use GuzzleHttp\Exception\ConnectException;
  use Illuminate\Contracts\Routing\ResponseFactory;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Support\Facades\Artisan;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;
  use Symfony\Component\HttpFoundation\BinaryFileResponse;
  use Symfony\Component\HttpFoundation\Response;
  use Symfony\Component\HttpFoundation\Request;

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
     * @return BinaryFileResponse
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
     * Reset item table and restore backup. Download every poster image new.
     *
     * @return ResponseFactory|Response
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
          // Fallback if export was from an older version of flox.
          if( ! isset($item->last_seen_at)) {
            $item->last_seen_at = Carbon::createFromTimestamp($item->created_at);
          }

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
     * @param Client $client
     * @return string
     */
    public function checkForUpdate(Client $client)
    {
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
     * @return Response
     */
    public function fetchFiles(FileParser $parser)
    {
      increaseTimeLimit();

      try {
        $parser->fetch();
      } catch(ConnectException $e) {
        return response("Can't connect to file-parser. Make sure the server is running.", Response::HTTP_NOT_FOUND);
      } catch(\Exception $e) {
        return response("Error in file-parser:" . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
      }
    }

    /**
     * Will be called from flox-file-parser itself.
     *
     * @param Request $request
     * @param FileParser $parser
     * @return JsonResponse
     */
    public function fetchFilesResponse(Request $request, FileParser $parser)
    {
      increaseTimeLimit();

      $content = json_decode($request->getContent());

      return $parser->updateDatabase($content);
    }
  }
