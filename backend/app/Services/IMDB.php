<?php

  namespace App\Services;

  class IMDB {

    public function parseRating($id = null)
    {
      // Web scraping is not working anymore. We should use the IMDb API instead
      // Keeping the code here in the meantime
      // config('services.imdb.url') . $id
      return null;
    }
  }
