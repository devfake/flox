<?php

  namespace App\Services;

  use App\Item;

  class FileParser {

    protected $response;

    public function __construct()
    {
      $this->response = $this->parseMediaFiles();
      $this->item = new Item();
    }

    public function parseMediaFiles()
    {
      return file_get_contents(base_path('tests/fixtures/media_files.json'));
    }

    public function getTmdbId($title)
    {
      $item = $this->item->where('title', $title)->orWhere('original_title', $title)->first(['id', 'tmdb_id']);

      if( ! $item) {
        return null;
      }
      
      return $item->tmdb_id;
    }
  }