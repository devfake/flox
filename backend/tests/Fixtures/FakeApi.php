<?php

namespace Tests\Fixtures;

use App\Services\Api\Api;

class FakeApi extends Api
{

  /**
   * @inheritDoc
   */
  protected function abortRequest()
  {
    return $this->data['data']['abort'];
  }

  /**
   * @inheritDoc
   */
  protected function getType()
  {
    return $this->data['data']['type'];
  }

  /**
   * @inheritDoc
   */
  protected function getTitle()
  {
    return $this->data['data']['title'];
  }

  /**
   * @inheritDoc
   */
  protected function getRating()
  {
    return $this->data['data']['rating'];
  }

  /**
   * @inheritDoc
   */
  protected function shouldRateItem()
  {
    return $this->data['data']['rate'];
  }

  /**
   * @inheritDoc
   */
  protected function shouldEpisodeMarkedAsSeen()
  {
    return $this->data['data']['seen'];
  }

  /**
   * @inheritDoc
   */
  protected function getEpisodeNumber()
  {
    return $this->data['data']['episode'];
  }

  /**
   * @inheritDoc
   */
  protected function getSeasonNumber()
  {
    return $this->data['data']['season'];
  }
}
