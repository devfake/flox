<?php

  namespace App\Http\Controllers;

  use App\Services\Api\Plex;

  class ApiController {

    /**
     * @var Plex
     */
    private $plex;

    public function __construct(Plex $plex)
    {
      $this->plex = $plex;
    }

    public function plex()
    {
      $payload = json_decode(request('payload'), true);

      $this->plex->handle($payload);
    }
  }
