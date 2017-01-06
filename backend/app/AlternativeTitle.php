<?php

  namespace App;

  use App\Services\TMDB;
  use Illuminate\Database\Eloquent\Model;

  class AlternativeTitle extends Model {

    public $timestamps = false;

    protected $fillable = ['title', 'tmdb_id', 'country'];

    /**
     * Store all alternative titles for tv shows and movies.
     *
     * @param $item
     * @param TMDB $tmdb
     */
    public function store($item, TMDB $tmdb)
    {
      $alternativeTitles = $tmdb->getAlternativeTitles($item);

      foreach($alternativeTitles as $title) {
        $this->firstOrCreate([
          'title' => $title->title,
          'tmdb_id' => $item['tmdb_id'],
          'country' => $title->iso_3166_1,
        ]);
      }
    }
  }
