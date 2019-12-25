<?php

namespace App\Services\Api;

class Plex extends Api
{

  /**
   * @inheritDoc
   */
  protected function abortRequest()
  {
    return !in_array($this->data['Metadata']['type'], ['episode', 'show', 'movie']);
  }

  /**
   * @inheritDoc
   */
  protected function getType()
  {
    $type = $this->data['Metadata']['type'];

    return in_array($type, ['episode', 'show']) ? 'tv' : 'movie';
  }

  /**
   * @inheritDoc
   */
  protected function getTitle()
  {
    return $this->data['Metadata']['grandparentTitle'] ?? $this->data['Metadata']['title'];
  }

  /**
   * @inheritDoc
   */
  protected function shouldRateItem()
  {
    $type = $this->data['Metadata']['type'];

    // Flox has no ratings for seasons or episodes.
    return in_array($type, ['show', 'movie']) && $this->data['event'] === 'media.rate';
  }

  /**
   * @inheritDoc
   */
  protected function getRating()
  {
    $rating = $this->data['Metadata']['userRating'];

    if ($rating > 7) {
      return 1;
    }

    if ($rating > 4) {
      return 2;
    }

    return 3;
  }

  /**
   * @inheritDoc
   */
  protected function shouldEpisodeMarkedAsSeen()
  {
    return $this->data['event'] === 'media.scrobble' && $this->getType() === 'tv';
  }

  /**
   * @inheritDoc
   */
  protected function getEpisodeNumber()
  {
    return $this->data['Metadata']['index'] ?? null;
  }

  /**
   * @inheritDoc
   */
  protected function getSeasonNumber()
  {
    return $this->data['Metadata']['parentIndex'] ?? null;
  }
}
