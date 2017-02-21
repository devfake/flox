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
     * Get all episodes of a tv show grouped by seasons,
     * the data for the next unseen episode, which will be used in the modal as an indicator,
     * and the setting option to check if spoiler protection is enabled.
     *
     * @param $tmdbId
     * @return array
     */
    public function getAllByTmdbId($tmdbId)
    {
      $episodes = $this->model->findByTmdbId($tmdbId)->get();

      return [
        'episodes' => $episodes->groupBy('season_number'),
        'next_episode' => $episodes->where('seen', 0)->first(),
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

      if($episode) {
        return $episode->update([
          'seen' => ! $episode->seen,
        ]);
      }
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

    /**
     * See if we can find a episode by src or tmdb_id.
     * Or we search a specific episode in our database.
     *
     * @param      $type
     * @param      $value
     * @param null $episode
     * @return \Illuminate\Support\Collection
     */
    public function findBy($type, $value, $episode = null)
    {
      switch($type) {
        case 'src':
          return $this->model->findBySrc($value)->first();
        case 'fp_name':
          return $this->model->findByFPName($value)->first();
        case 'tmdb_id':
          return $this->model->findByTmdbId($value)->first();
        case 'episode':
          return $this->model->findSpecificEpisode($value, $episode)->first();
      }

      return null;
    }
  }
