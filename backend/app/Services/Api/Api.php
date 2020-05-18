<?php

namespace App\Services\Api;

use App\Episode;
use App\Item;
use App\Services\Models\ItemService;
use App\Services\TMDB;
use Symfony\Component\HttpFoundation\Response;

abstract class Api
{

  /**
   * @var array
   */
  protected $data = [];

  /**
   * @var Item
   */
  private $item;

  /**
   * @var TMDB
   */
  private $tmdb;

  /**
   * @var ItemService
   */
  private $itemService;

  /**
   * @var Episode
   */
  private $episode;

  public function __construct(Item $item, TMDB $tmdb, ItemService $itemService, Episode $episode)
  {
    $this->item = $item;
    $this->tmdb = $tmdb;
    $this->itemService = $itemService;
    $this->episode = $episode;
  }

  public function handle(array $data)
  {
    logInfo('api data:', $data);

    $this->data = $data;

    if ($this->abortRequest()) {
      abort(Response::HTTP_NOT_IMPLEMENTED);
    }

    $found = $this->item
      ->findByTitle($this->getTitle(), $this->getType())
      ->first();

    // Nothing found in our database, so we search in TMDb.
    if (!$found) {
      $foundFromTmdb = $this->tmdb->search($this->getTitle(), $this->getType());

      if (!$foundFromTmdb) {
        return false;
      }

      // The first result is mostly the one we need.
      $firstResult = $foundFromTmdb[0];

      // Search again in our database with the TMDb ID.
      $found = $this->item->findByTmdbId($firstResult['tmdb_id'])->first();

      if (!$found) {
        $found = $this->itemService->create($firstResult);
      }
    }

    if ($this->shouldRateItem()) {
      $found->update([
        'rating' => $this->getRating(),
      ]);
    }

    if ($this->shouldEpisodeMarkedAsSeen()) {
      $episode = $this->episode
        ->findByTmdbId($found->tmdb_id)
        ->findByEpisodeNumber($this->getEpisodeNumber())
        ->findBySeasonNumber($this->getSeasonNumber())
        ->first();

      // Mark the episode as seen and update the last_seen_at attribute of the item
      if ($episode) {
        $found->updateLastSeenAt($found->tmdb_id);
        $episode->update([
          'seen' => true,
        ]);
      }
    }
  }

  /**
   * Abort the complete request if it's not a movie or episode.
   *
   * @return bool
   */
  abstract protected function abortRequest();

  /**
   * Is it a movie or tv show? Should return 'tv' or 'movie'.
   *
   * @return string
   */
  abstract protected function getType();

  /**
   * Title for the item (name of the movie or tv show).
   *
   * @return string
   */
  abstract protected function getTitle();

  /**
   * Rating for flox in a 3-Point system.
   *
   * 1 = Good.
   * 2 = Medium.
   * 3 = Bad.
   *
   * @return int
   */
  abstract protected function getRating();

  /**
   * Check if rating is requested.
   *
   * @return bool
   */
  abstract protected function shouldRateItem();

  /**
   * Check if seen episode is requested.
   *
   * @return bool
   */
  abstract protected function shouldEpisodeMarkedAsSeen();

  /**
   * Number of the episode.
   *
   * @return null|int
   */
  abstract protected function getEpisodeNumber();

  /**
   * Number of the season.
   *
   * @return null|int
   */
  abstract protected function getSeasonNumber();
}
