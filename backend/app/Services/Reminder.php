<?php

  namespace App\Services;
  
  use App\Episode;
  use App\Item;
  use App\Mail\DailyReminder;
  use App\Setting;
  use Illuminate\Support\Facades\Mail;

  class Reminder {

    private $settings;

    public function __construct()
    {
      $this->settings = Setting::first();
    }

    /**
     * Send daily reminder via mail.
     */
    public function sendDaily()
    {
      $startToday = today()->startOfDay()->timestamp;
      $endToday = today()->endOfDay()->timestamp;

      $episodes = Episode::whereBetween('release_episode', [$startToday, $endToday])
        ->with('item')
        ->orderBy('tmdb_id')
        ->get();

      $movies = Item::where('media_type', 'movie')
        ->whereBetween('released', [$startToday, $endToday])
        ->get();

      if ($episodes || $movies) {
        Mail::to($this->settings->reminders_send_to)
          ->send(new DailyReminder($episodes, $movies)); 
      }
    }
  }
