<?php

  namespace App\Http\Controllers;

  use App\Services\Storage;

  class HomeController {

    public function app(Storage $storage, $uri = null)
    {
      $language = $storage->parseLanguage();

      return view('app')
        ->withLang($language);
    }
  }
