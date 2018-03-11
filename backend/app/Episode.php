<?php

  namespace App;

  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Model;

  class Episode extends Model {

    protected $appends = ['release_episode_human_format'];

    protected $fillable = [
      'tmdb_id',
      'name',
      'src',
      'season_number',
      'episode_number',
      'episode_tmdb_id',
      'seen',
      'season_tmdb_id',
      'subtitles',
      'created_at',
      'updated_at',
      'release_episode',
      'release_season',
      'fp_name',
    ];

    /**
     * Accessors
     */

    public function getReleaseEpisodeHumanFormatAttribute()
    {
      $now = now();
      $release = Carbon::createFromTimestamp($this->release_episode);

      if($release > $now) {
        return $release->diffForHumans();
      }

      return null;
    }

    /*
     * Relations
     */

    public function item()
    {
      return $this->belongsTo(Item::class, 'tmdb_id', 'tmdb_id');
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
      return $query->where('fp_name', $item->name)->orWhere('fp_name', getFileName($item));
    }

    public function scopeFindSpecificEpisode($query, $tmdbId, $episode)
    {
      $season = $episode->changed->season_number ?? $episode->season_number;
      $episode = $episode->changed->episode_number ?? $episode->episode_number;

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
