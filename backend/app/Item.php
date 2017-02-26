<?php

  namespace App;

  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Model;
  use Laravel\Scout\Searchable;

  class Item extends Model {

    // Uncomment this if you are using Laravel Scout.
    //use Searchable;

    protected $dates = ['last_seen'];

    protected $fillable = [
      'tmdb_id',
      'title',
      'original_title',
      'poster',
      'media_type',
      'rating',
      'released',
      'genre',
      'fp_name',
      'src',
      'subtitles',
      'last_seen_at',
      'created_at',
      'updated_at',
    ];

    /**
     * Create the new movie / tv show.
     *
     * @param $data
     * @return Item
     */
    public function store($data)
    {
      return $this->create([
        'tmdb_id' => $data['tmdb_id'],
        'title' => $data['title'],
        'media_type' => $data['media_type'],
        'original_title' => $data['original_title'],
        'poster' => $data['poster'] ? $data['poster'] : '',
        'rating' => 0,
        'released' => $data['released'],
        'genre' => $data['genre'],
        'last_seen_at' => Carbon::now(),
      ]);
    }

    /**
     * @param $data
     * @param $mediaType
     * @return Item
     */
    public function storeEmpty($data, $mediaType)
    {
      return $this->create([
        'tmdb_id' => null,
        'fp_name' => $data['name'],
        'title' => $data['name'],
        'media_type' => $mediaType,
        'poster' => '',
        'rating' => 1,
        'released' => time(),
        'src' => $data['src'],
        'subtitles' => $data['subtitles'],
        'last_seen_at' => Carbon::now(),
      ]);
    }

    /**
     * @param $tmdbId
     * @return mixed
     */
    public function updateLastSeenAt($tmdbId)
    {
      return $this->where('tmdb_id', $tmdbId)->update([
        'last_seen_at' => Carbon::now(),
      ]);
    }

    /*
     * Relations
     */

    public function episodes()
    {
      return $this->hasMany(Episode::class, 'tmdb_id', 'tmdb_id');
    }

    public function alternativeTitles()
    {
      return $this->hasMany(AlternativeTitle::class, 'tmdb_id', 'tmdb_id');
    }

    public function latestEpisode()
    {
      return $this->hasOne(Episode::class, 'tmdb_id', 'tmdb_id')
        ->orderBy('id', 'desc')
        ->where('seen', true)
        ->latest();
    }

    public function episodesWithSrc()
    {
      return $this->hasOne(Episode::class, 'tmdb_id', 'tmdb_id')->whereNotNull('src');
    }

    /*
     * Scopes
     */

    public function scopeFindByTmdbId($query, $tmdbId)
    {
      return $query->where('tmdb_id', $tmdbId);
    }

    public function scopeFindByFPName($query, $item, $mediaType)
    {
      $changed = isset($item->changed->name) ? $item->changed->name : $item->name;

      return $query->where('media_type', $mediaType)
        ->where(function($query) use ($item, $changed) {
          return $query->where('fp_name', $item->name)->orWhere('fp_name', $changed);
        });
    }

    public function scopeFindBySrc($query, $src)
    {
      return $query->where('src', $src);
    }

    public function scopeFindByTitle($query, $title, $mediaType = null)
    {
      // Only necessarily if we search from file-parser.
      if($mediaType) {
        $query->where('media_type', $mediaType);
      }

      return $query->where(function($query) use ($title) {
        return $query->where('title', 'like', '%' . $title . '%')
          ->orWhere('original_title', 'like', '%' . $title . '%')
          ->orWhereHas('alternativeTitles', function($query) use ($title) {
            return $query->where('title', 'like', '%' . $title . '%');
          });
      });
    }

    public function scopeFindByTitleStrict($query, $title, $mediaType)
    {
      return $query->where('media_type', $mediaType)
        ->where(function($query) use ($title) {
          $query->where('title', $title)
          ->orWhere('original_title', $title)
          ->orWhere('fp_name', $title)
          ->orWhereHas('alternativeTitles', function($query) use ($title) {
            $query->where('title', $title);
          });
        });
    }
  }
