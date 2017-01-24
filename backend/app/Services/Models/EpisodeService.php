<?php

  namespace App\Services\Models;

  use App\Episode as Model;
  use App\Services\TMDB;
  use App\Setting;

  class EpisodeService {

    private $model;
    private $tmdb;

    /**
     * @param Model $model
     * @param TMDB  $tmdb
     */
    public function __construct(Model $model, TMDB $tmdb)
    {
      $this->model = $model;
      $this->tmdb = $tmdb;
    }

    /**
     * @param $item
     */
    public function create($item)
    {
      if($item->media_type == 'tv') {
        $seasons = $this->tmdb->tvEpisodes($item->tmdb_id);

        $this->model->store($seasons, $item->tmdb_id);
      }
    }

    /**
     * Remove all episodes by tmdb_id.
     *
     * @param $tmdbId
     */
    public function remove($tmdbId)
    {
      $this->model->where('tmdb_id', $tmdbId)->delete();
    }

    /**
     * Get all Episodes of an tv show group by seasons.
     * We need to also access the spoiler setting here.
     *
     * @param $tmdbId
     * @return array
     */
    public function getAllByTmdbId($tmdbId)
    {
      return [
        'episodes' => $this->model->findByTmdbId($tmdbId)->get()->groupBy('season_number'),
        'spoiler' => Setting::first()->episode_spoiler_protection,
      ];
    }

    /**
     * @param $id
     * @return mixed
     */
    public function toggleSeen($id)
    {
      $episode = $this->model->find($id);

      return $episode->update([
        'seen' => ! $episode->seen,
      ]);
    }

    /**
     * @param $tmdbId
     * @param $season
     * @param $seen
     */
    public function toggleSeason($tmdbId, $season, $seen)
    {
      $episodes = $this->model->findSeason($tmdbId, $season)->get();

      $episodes->each(function($episode) use ($seen) {
        $episode->update([
          'seen' => $seen,
        ]);
      });
    }
  }
