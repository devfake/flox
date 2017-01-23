<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class AlternativeTitle extends Model {

    public $timestamps = false;

    protected $fillable = [
      'title',
      'tmdb_id',
      'country',
    ];

    /**
     * Store all alternative titles for tv shows and movies.
     *
     * @param $titles
     * @param $tmdbId
     */
    public function store($titles, $tmdbId)
    {
      foreach($titles as $title) {
        $this->firstOrCreate([
          'title' => $title->title,
          'tmdb_id' => $tmdbId,
          'country' => $title->iso_3166_1,
        ]);
      }
    }

    /*
     * Scopes
     */
    public function scopeFindByTmdbId($query, $tmdbId)
    {
      return $query->where('tmdb_id', $tmdbId);
    }
  }
