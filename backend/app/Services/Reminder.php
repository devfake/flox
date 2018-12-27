<?php

  namespace App\Services;
  
  use App\Episode;
  use App\Item;
  use App\Mail\DailyReminder;
  use App\Mail\WeeklyReminder;
  use App\Setting;
  use Illuminate\Support\Facades\Mail;

  class Reminder {
    
    /**
     * Send daily reminder via mail.
     */
    public function sendDaily()
    {
      $settings = Setting::first();

      $startToday = today()->startOfDay()->timestamp;
      $endToday = today()->endOfDay()->timestamp;

      $episodes = Episode::whereBetween('release_episode', [$startToday, $endToday])
        ->with('item')
        ->orderBy('tmdb_id')
        ->get();

      $movies = Item::where('media_type', 'movie')
        ->whereBetween('released', [$startToday, $endToday])
        ->get();

      if (count($episodes) || count($movies)) {
        Mail::to($settings->reminders_send_to)
          ->send(new DailyReminder($episodes, $movies)); 
      }
    }

    /**
     * Send a weekly summary.
     */
    public function sendWeekly()
    {
      $settings = Setting::first();
      
      $startWeek = today()->startOfWeek()->timestamp;
      $endWeek = today()->endOfWeek()->timestamp;

      $episodes = Episode::whereBetween('release_episode', [$startWeek, $endWeek])
        ->with('item')
        ->orderBy('tmdb_id')
        ->get();

      $movies = Item::where('media_type', 'movie')
        ->whereBetween('released', [$startWeek, $endWeek])
        ->get();

      if (count($episodes) || count($movies)) {
        Mail::to($settings->reminders_send_to)
          ->send(new WeeklyReminder($episodes, $movies, $startWeek, $endWeek));
      }
    }
  }
