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
    ];

    /**
     * Create the new movie / tv show.
     *
     * @param $data
     * @return Item
     */
    public function store($data, TMDB $tmdb, Storage $storage, Episode $episode, AlternativeTitle $alternativeTitle)
    {
      $tmdbId = $data['tmdb_id'];
      $mediaType = $data['media_type'];

      $item = $this->create([
        'tmdb_id' => $tmdbId,
        'title' => $data['title'],
        'media_type' => $mediaType,
        'original_title' => $data['original_title'],
        'poster' => $data['poster'],
        'rating' => 1,
        'released' => $data['released'],
        'genre' => $data['genre'],
        'created_at' => time(),
      ]);

      $storage->createPosterFile($data['poster']);

      if($mediaType == 'tv') {
        $episode->store($tmdbId, $tmdb);
      }

      $alternativeTitle->store($item, $tmdb);

      return $item;
    }

    /**
     * Update alternative titles for all tv shows and movies or specific item.
     * For old versions of flox or to keep all alternative titles up to date.
     *
     * @param TMDB $tmdb
     */
    public function updateAlternativeTitles(TMDB $tmdb, AlternativeTitle $alternativeTitle, $tmdbID = null)
    {
      set_time_limit(3000);

      $items = $tmdbID ? $this->searchTmdbId($tmdbID)->get() : $this->all();

      $items->each(function($item) use ($tmdb, $alternativeTitle) {
        $alternativeTitle->store($item, $tmdb);
      });
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

    public function scopeFindByTitle($query, $title)
    {
      return $query->where('title', 'like', '%' . $title . '%')
        ->orWhere('original_title', 'like', '%' . $title . '%')
        ->orWhereHas('alternativeTitles', function($query) use ($title) {
          $query->where('title', 'like', '%' . $title . '%');
        });
    }
  }
