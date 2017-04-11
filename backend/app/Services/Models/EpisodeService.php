<?php

  namespace App\Services\Models;

  use App\Episode as Model;
  use App\Item;
  use App\Services\TMDB;
  use App\Setting;
  use Carbon\Carbon;

  class EpisodeService {

    private $model;
    private $tmdb;
    private $item;

    /**
     * @param Model $model
     * @param TMDB  $tmdb
     * @param Item  $item
     * @internal param ItemService $itemService
     * @internal param Item $item
     */
    public function __construct(Model $model, TMDB $tmdb, Item $item)
    {
      $this->model = $model;
      $this->tmdb = $tmdb;
      $this->item = $item;
    }

    /**
     * @param $item
     */
    public function create($item)
    {
      // todo: rewrite this and make this more generic. we need to use this in refresh too, if a episode is not in database.
      if($item->media_type == 'tv') {
        $seasons = $this->tmdb->tvEpisodes($item->tmdb_id);

        foreach($seasons as $season) {
          $releaseSeason = Carbon::createFromFormat('Y-m-d', $season->air_date ?? '1970-12-1');

          foreach($season->episodes as $episode) {
            $releaseEpisode = Carbon::createFromFormat('Y-m-d', $episode->air_date ?? '1970-12-1');

            $this->model->create([
              'season_tmdb_id' => $season->id,
              'episode_tmdb_id' => $episode->id,
              'season_number' => $episode->season_number,
              'episode_number' => $episode->episode_number,
              'release_episode' => $releaseEpisode->getTimestamp(),
              'release_season' => $releaseSeason->getTimestamp(),
              'name' => $episode->name,
              'tmdb_id' => $item->tmdb_id,
            ]);
          }
        }
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
      Carbon::setLocale(config('app.TRANSLATION'));

      $episodes = $this->model->findByTmdbId($tmdbId)->orderBy('release_episode')->get();

      return [
        'episodes' => $episodes->groupBy('season_number'),
        'next_episode' => $episodes->where('seen', 0)->first(),
        'spoiler' => Setting::first()->episode_spoiler_protection,
      ];
    }

    /**
     * Set an episode as seen / unseen.
     *
     * @param $id
     * @return mixed
     */
    public function toggleSeen($id)
    {
      $episode = $this->model->find($id);

      if($episode) {
        // Update the parent relation only if we mark the episode as seen.
        if( ! $episode->seen) {
          $this->item->updateLastSeenAt($episode->tmdb_id);
        }

        return $episode->update([
          'seen' => ! $episode->seen,
        ]);
      }
    }

    /**
     * Toggle all episodes of a season as seen / unseen.
     *
     * @param $tmdbId
     * @param $season
     * @param $seen
     */
    public function toggleSeason($tmdbId, $season, $seen)
    {
      $episodes = $this->model->findSeason($tmdbId, $season)->get();

      // Update the parent relation only if we mark the episode as seen.
      if($seen) {
        $this->item->updateLastSeenAt($episodes[0]->tmdb_id);
      }

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
