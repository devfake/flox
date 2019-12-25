<?php

  namespace App\Http\Controllers;

  use App\AlternativeTitle;
  use App\Episode;
  use App\Item;
  use App\Setting;
  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Cache;
  use Illuminate\Support\Facades\Request;
  use Illuminate\Support\Str;
  use Symfony\Component\HttpFoundation\Response;

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

      return [
        'username' => Auth::check() ? Auth::user()->username : '',
        'genre' => $settings->show_genre,
        'date' => $settings->show_date,
        'spoiler' => $settings->episode_spoiler_protection,
        'version' => $this->version,
        'watchlist' => $settings->show_watchlist_everywhere,
        'ratings' => $settings->show_ratings,
        'refresh' => $settings->refresh_automatically,
        'reminders_send_to' => $settings->reminders_send_to,
        'daily' => $settings->daily_reminder,
        'weekly' => $settings->weekly_reminder,
      ];
    }

    /**
     * @return string
     */
    public function generateApiKey()
    {
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $key = Str::random(24);

      Auth::user()->update([
        'api_key' => $key,
      ]);

      return $key;
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
      return Auth::user()->api_key;
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
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      Cache::flush();

      $this->setting->first()->update([
        'show_genre' => Request::input('genre'),
        'show_date' => Request::input('date'),
        'episode_spoiler_protection' => Request::input('spoiler'),
        'show_watchlist_everywhere' => Request::input('watchlist'),
        'show_ratings' => Request::input('ratings'),
      ]);
    }

    /**
     * Update refresh check.
     */
    public function updateRefresh()
    {
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $this->setting->first()->update([
        'refresh_automatically' => Request::input('refresh'),
      ]);
    }

    /**
     * Update reminders mail.
     */
    public function updateRemindersSendTo()
    {
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $this->setting->first()->update([
        'reminders_send_to' => Request::input('reminders_send_to'),
      ]);
    }

    /**
     * Update reminder options.
     */
    public function updateReminderOptions()
    {
      if (isDemo()) {
        return response('Success', Response::HTTP_OK);
      }

      $this->setting->first()->update([
        'daily_reminder' => Request::input('daily'),
        'weekly_reminder' => Request::input('weekly'),
      ]);
    }
  }
