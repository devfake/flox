<?php

  namespace App;

  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Model;

  class Item extends Model {

    /**
     * Fallback date string for a item.
     */
    const FALLBACK_DATE = '1970-12-1';
    
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
      'last_seen_at', 
      'refreshed_at',
      'created_at',
      'updated_at',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
      'startDate',
    ];
    
    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['genre'];

    /**
     * Guard accessors from import.
     *
     * @var array
     */
    protected $guarded = ['startDate'];

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
        'overview' => $data['overview'],
        'backdrop' => $data['backdrop'],
        'tmdb_rating' => $data['tmdb_rating'],
        'imdb_id' => $data['imdb_id'],
        'imdb_rating' => $data['imdb_rating'],
        'youtube_key' => $data['youtube_key'],
        'last_seen_at' => now(),
        'slug' => $data['slug'],
      ]);
    }

    /**
     * Create a new empty movie / tv show (for FP).
     * 
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
        'rating' => 0,
        'released' => time(),
        'src' => $data['src'],
        'subtitles' => $data['subtitles'],
        'last_seen_at' => now(),
      ]);
    }

    /**
     * @param $tmdbId
     * @return mixed
     */
    public function updateLastSeenAt($tmdbId)
    {
      return $this->where('tmdb_id', $tmdbId)->update([
        'last_seen_at' => now(),
      ]);
    }

    /**
     * Accessor for formatted release date.
     */
    public function getStartDateAttribute()
    {
      if($this->released) {
        return Carbon::createFromTimestamp($this->released)->format('Y-m-d');
      }
    }
    
    /**
     * Belongs to many genres.
     */
    public function genre()
    {
      return $this->belongsToMany(Genre::class);
    }

    /**
     * Can have many episodes.
     */
    public function episodes()
    {
      return $this->hasMany(Episode::class, 'tmdb_id', 'tmdb_id');
    }

    /**
     * Can have many alternative titles.
     */
    public function alternativeTitles()
    {
      return $this->hasMany(AlternativeTitle::class, 'tmdb_id', 'tmdb_id');
    }

    /**
     * The latest unseen episode. 
     */
    public function latestEpisode()
    {
      return $this->hasOne(Episode::class, 'tmdb_id', 'tmdb_id')
        ->orderBy('season_number', 'asc')
        ->orderBy('episode_number', 'asc')
        ->where('seen', false)
        ->latest();
    }

    /**
     * Can have many episodes with a src (from FP).
     */
    public function episodesWithSrc()
    {
      return $this->hasMany(Episode::class, 'tmdb_id', 'tmdb_id')->whereNotNull('src');
    }

    /**
     * Scope to find the result by a genre.
     */
    public function scopeFindByGenreId($query, $genreId)
    {
      return $query->orWhereHas('genre', function($query) use ($genreId) {
        $query->where('genre_id', $genreId);
      });
    }

    /**
     * Scope to find the result via tmdb_id.
     */
    public function scopeFindByTmdbId($query, $tmdbId)
    {
      return $query->where('tmdb_id', $tmdbId);
    }

    /**
     * Scope to find the result via fp_name.
     */
    public function scopeFindByFPName($query, $item, $mediaType)
    {
      return $query->where('media_type', $mediaType)
        ->where(function($query) use ($item) {
          return $query->where('fp_name', $item->name)->orWhere('fp_name', getFileName($item));
        });
    }

    /**
     * Scope to find the result via src.
     */
    public function scopeFindBySrc($query, $src)
    {
      return $query->where('src', $src);
    }

    /**
     * Scope to find the result via title.
     */
    public function scopeFindByTitle($query, $title, $mediaType = null)
    {
      // Only necessarily if we search from file-parser.
      if($mediaType) {
        $query->where('media_type', $mediaType);
      }

      $title = strtolower($title);

      // Some database queries using case sensitive likes -> compare lower case
      return $query->where(function($query) use ($title) {
        return $query->whereRaw('lower(title) like ?', ["%$title%"])
          ->orWhereRaw('lower(original_title) like ?', ["%$title%"])
          ->orWhereHas('alternativeTitles', function($query) use ($title) {
            return $query->whereRaw('lower(title) like ?', ["%$title%"]);
          });
      });
    }

    /**
     * Scope to find the result via title without a like query.
     */
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
