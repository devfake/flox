<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Setting;
  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Input;

  class SettingController {

    private $item;
    private $episodes;
    private $version;
    private $setting;
    private $alternativeTitles;

    public function __construct(Item $item, Episode $episodes, AlternativeTitle $alternativeTitles, Setting $setting)
    {
      $this->item = $item;
      $this->episodes = $episodes;
      $this->alternativeTitles = $alternativeTitles;
      $this->setting = $setting;
      $this->version = config('app.version');
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
  }