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

    /*
     * Scopes
     */

    public function scopeSearchEpisode($query, $tmdb_id, $episode)
    {
      return $query->where('tmdb_id', $tmdb_id)
        ->where('season_number', $episode->season_number)
        ->where('episode_number', $episode->episode_number);
    }
  }
