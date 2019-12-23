<?php

namespace App\Services\Api;

class Plex extends Api
{

  /**
   * Abort the complete request if it's not a movie or episode.
   *
   * @return bool
   */
  protected function abortRequest()
  {
    return !in_array($this->data['Metadata']['type'], ['episode', 'show', 'movie']);
  }

  /**
   * Is it a movie or tv show? Should return 'tv' or 'movie'.
   *
   * @return string
   */
  protected function getType()
  {
    $type = $this->data['Metadata']['type'];

    return in_array($type, ['episode', 'show']) ? 'tv' : 'movie';
  }

  /**
   * Title for the item (name of the movie or tv show).
   *
   * @return string
   */
  protected function getTitle()
  {
    return $this->data['Metadata']['grandparentTitle'] ?? $this->data['Metadata']['title'];
  }

  /**
   * Check if rating is requested.
   *
   * @return bool
   */
  protected function shouldRateItem()
  {
    $type = $this->data['Metadata']['type'];

    // Flox has no ratings for seasons or episodes.
    return in_array($type, ['show', 'movie']) && $this->data['event'] === 'media.rate';
  }

  /**
   * Rating for flox in a 3-Point system.
   *
   * 1 = Good.
   * 2 = Medium.
   * 3 = Bad.
   *
   * @return int
   */
  protected function getRating()
  {
    $rating = +$this->data['rating'];

    if ($rating > 7) {
      return 1;
    }

    if ($rating > 4) {
      return 2;
    }

    return 3;
  }

  /**
   * Check if seen episode is requested.
   *
   * @return bool
   */
  protected function shouldEpisodeMarkedAsSeen()
  {
    return $this->data['event'] === 'media.scrobble' && $this->getType() === 'tv';
  }

  /**
   * Number of the episode.
   *
   * @return null|int
   */
  protected function getEpisodeNumber()
  {
    return $this->data['Metadata']['index'] ?? null;
  }

  /**
   * Number of the season.
   *
   * @return null|int
   */
  protected function getSeasonNumber()
  {
    return $this->data['Metadata']['parentIndex'] ?? null;
  }
}
