<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Episode extends Model {

    public $timestamps = false;

    protected $fillable = [
      'tmdb_id',
      'name',
      'season_number',
      'episode_number',
      'episode_tmdb_id',
      'seen',
      'season_tmdb_id',
      'created_at'
    ];
  }
