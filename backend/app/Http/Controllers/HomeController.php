<?php

  namespace App\Http\Controllers;

  use App\Services\Storage;

  class HomeController {

    public function app($uri = null, Storage $storage)
    {
      $language = $storage->parseLanguage();

      return view('app')
        ->withLang($language);
    }
  }