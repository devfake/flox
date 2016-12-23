<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;
  use Laravel\Scout\Searchable;

  class Item extends Model {

    // Uncomment this if you are using Laravel Scout.
    //use Searchable;

    public $timestamps = false;

    protected $fillable = [
      'tmdb_id',
      'title',
      'original_title',
      'poster',
      'media_type',
      'rating',
      'released',
      'created_at',
      'genre',
    ];

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

    public function scopeSearchTmdbId($query, $tmdb_id)
    {
      return $query->where('tmdb_id', $tmdb_id);
    }

    public function scopeSearchTitle($query, $title)
    {
      return $query->where('title', 'like', '%' . $title . '%')
        ->orWhere('original_title', 'like', '%' . $title . '%')
        ->orWhereHas('alternativeTitles', function($query) use ($title) {
          $query->where('title', 'like', '%' . $title . '%');
        });
    }
  }
