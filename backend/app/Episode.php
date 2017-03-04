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
        $releaseSeason = Carbon::createFromFormat('Y-m-d', $season->air_date ?? '1970-12-1');

        foreach($season->episodes as $episode) {
          $releaseEpisode = Carbon::createFromFormat('Y-m-d', $episode->air_date ?? '1970-12-1');

          $this->create([
            'season_tmdb_id' => $season->id,
            'episode_tmdb_id' => $episode->id,
            'season_number' => $episode->season_number,
            'episode_number' => $episode->episode_number,
            'release_episode' => $releaseEpisode->getTimestamp(),
            'release_season' => $releaseSeason->getTimestamp(),
            'name' => $episode->name,
            'tmdb_id' => $tmdbId,
          ]);
        }
      }
    }

    /**
     * Accessors
     */

    public function getReleaseEpisodeHumanFormatAttribute()
    {
      $now = Carbon::now();
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
