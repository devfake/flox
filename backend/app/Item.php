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
    public function store($data, TMDB $tmdb, Storage $storage)
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
        $this->createEpisodes($tmdbId, $tmdb);
      }

      $this->addAlternativeTitles($item, $tmdb);

      return $item;
    }

    /**
     * Update alternative titles for all tv shows and movies or specific item.
     * For old versions of flox or to kepp all alternative titles up to date.
     *
     * @param TMDB $tmdb
     */
    public function updateAlternativeTitles(TMDB $tmdb, $tmdbID = null)
    {
      set_time_limit(3000);

      $items = $tmdbID ? $this->searchTmdbId($tmdbID)->get() : $this->all();

      $items->each(function($item) use ($tmdb) {
        $this->addAlternativeTitles($item, $tmdb);
      });
    }

    /**
     * Store all alternative titles for tv shows and movies.
     *
     * @param      $item
     * @param TMDB $tmdb
     */
    public function addAlternativeTitles($item, TMDB $tmdb)
    {
      $alternativeTitles = $tmdb->getAlternativeTitles($item);

      foreach($alternativeTitles as $title) {
        AlternativeTitle::firstOrCreate([
          'title' => $title->title,
          'tmdb_id' => $item['tmdb_id'],
          'country' => $title->iso_3166_1,
        ]);
      }
    }

    /**
     * Save all episodes of each season.
     *
     * @param $seasons
     * @param $tmdbId
     */
    private function createEpisodes($tmdbId, TMDB $tmdb)
    {
      $seasons = $tmdb->tvEpisodes($tmdbId);

      foreach($seasons as $season) {
        foreach($season->episodes as $episode) {
          $new = new Episode();
          $new->season_tmdb_id = $season->id;
          $new->episode_tmdb_id = $episode->id;
          $new->season_number = $episode->season_number;
          $new->episode_number = $episode->episode_number;
          $new->name = $episode->name;
          $new->tmdb_id = $tmdbId;
          $new->created_at = time();
          $new->save();
        }
      }
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

    public function scopeFindByTmdbId($query, $tmdb_id)
    {
      return $query->where('tmdb_id', $tmdb_id);
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
