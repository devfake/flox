<?php
  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Setting extends Model {

    public $timestamps = false;

    protected $dates = [
      'last_fetch_to_file_parser',
    ];

    protected $fillable  = [
      'show_date',
      'show_genre',
      'episode_spoiler_protection',
      'last_fetch_to_file_parser',
      'show_watchlist_everywhere',
      'show_ratings',
    ];
    
    protected $casts = [
      'show_date' => 'boolean',
      'show_genre' => 'boolean',
      'episode_spoiler_protection' => 'boolean',
      'show_watchlist_everywhere' => 'boolean',
    ];
  }
