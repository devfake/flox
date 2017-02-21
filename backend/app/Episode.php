<?php

  namespace App;

  use App\Services\TMDB;
  use Illuminate\Database\Eloquent\Model;

  class Episode extends Model {

    public $timestamps = false;

    protected $fillable = [
      'tmdb_id',
      'name',
      'src',
      'season_number',
      'episode_number',
      'episode_tmdb_id',
      'seen',
      'season_tmdb_id',
      'created_at',
      'subtitles',
    ];

    /**
     * Save all episodes of each season.
     *
     * @param $seasons
     * @param $tmdbId
     */
    public function store($seasons, $tmdbId)
    {
      foreach($seasons as $season) {
        foreach($season->episodes as $episode) {
          $this->create([
            'season_tmdb_id' => $season->id,
            'episode_tmdb_id' => $episode->id,
            'season_number' => $episode->season_number,
            'episode_number' => $episode->episode_number,
            'name' => $episode->name,
            'tmdb_id' => $tmdbId,
            'created_at' => time(),
          ]);
        }
      }
    }

    /*
     * Scopes
     */

    public function scopeFindByTmdbId($query, $tmdbId)
    {
      return $query->where('tmdb_id', $tmdbId);
    }

    public function scopeFindBySrc($query, $src)
    {
      return $query->where('src', $src);
    }

    public function scopeFindByFPName($query, $item)
    {
      $changed = isset($item->changed->name) ? $item->changed->name : $item->name;

      return $query->where('fp_name', $item->name)->orWhere('fp_name', $changed);
    }

    public function scopeFindSpecificEpisode($query, $tmdbId, $episode)
    {
      $season = isset($episode->changed->season_number) ? $episode->changed->season_number : $episode->season_number;
      $episode = isset($episode->changed->episode_number) ? $episode->changed->episode_number : $episode->episode_number;

      return $query->where('tmdb_id', $tmdbId)
        ->where('season_number', $season)
        ->where('episode_number', $episode);
    }

    public function scopeFindSeason($query, $tmdbId, $season)
    {
      return $query->where('tmdb_id', $tmdbId)
        ->where('season_number', $season);
    }
  }
