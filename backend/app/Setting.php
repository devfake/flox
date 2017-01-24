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
    ];
  }
