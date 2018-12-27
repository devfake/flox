<?php
  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Setting extends Model {

    /**
     * No timestamps needed.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
      'last_fetch_to_file_parser',
    ];

    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
      'show_date' => 'boolean',
      'show_genre' => 'boolean',
      'episode_spoiler_protection' => 'boolean',
      'show_watchlist_everywhere' => 'boolean',
      'refresh_automatically' => 'boolean',
      'daily_reminder' => 'boolean',
      'weekly_reminder' => 'boolean',
    ];
  }
