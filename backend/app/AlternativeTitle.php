<?php

  namespace App;

  use App\Services\TMDB;
  use Illuminate\Database\Eloquent\Model;

  class AlternativeTitle extends Model {

    public $timestamps = false;

    protected $fillable = [
      'title',
      'tmdb_id',
      'country'
    ];

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

    /**
     * Update alternative titles for all tv shows and movies or specific item.
     * For old versions of flox or to keep all alternative titles up to date.
     *
     * @param TMDB $tmdb
     * @param Item $item
     * @param null $tmdbID
     */
    public function updateAlternativeTitles(TMDB $tmdb, Item $item, $tmdbID = null)
    {
      set_time_limit(3000);

      $items = $tmdbID ? $item->findByTmdbId($tmdbID)->get() : $item->all();

      $items->each(function($item) use ($tmdb) {
        $this->store($item, $tmdb);
      });
    }
  }
