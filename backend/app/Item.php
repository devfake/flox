<?php

  namespace App;

  use App\Services\Storage;
  use App\Services\TMDB;
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
      'fp_name',
      'src',
      'subtitles',
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
        'rating' => 1,
        'released' => $data['released'],
        'genre' => $data['genre'],
        'created_at' => time(),
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
        'created_at' => time(),
        'src' => $data['src'],
        'subtitles' => $data['subtitles'],
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

    /*
     * Scopes
     */

    public function scopeFindByTmdbId($query, $tmdbId)
    {
      return $query->where('tmdb_id', $tmdbId);
    }

    public function scopeFindByFPName($query, $item)
    {
      $changed = isset($item->changed->name) ? $item->changed->name : $item->name;

      return $query->where('fp_name', $item->name)->orWhere('fp_name', $changed);
    }

    public function scopeFindBySrc($query, $src)
    {
      return $query->where('src', $src);
    }

    public function scopeFindByTitle($query, $title)
    {
      return $query->where('title', 'like', '%' . $title . '%')
        ->orWhere('original_title', 'like', '%' . $title . '%')
        ->orWhereHas('alternativeTitles', function($query) use ($title) {
          $query->where('title', 'like', '%' . $title . '%');
        });
    }
  }
