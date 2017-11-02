<?php

  function increaseTimeLimit()
  {
    set_time_limit(config('app.PHP_TIME_LIMIT'));
  }

  function getFileName($file)
  {
    return $file->changed->name ?? $file->name;
  }

  function mediaType($mediaType)
  {
    return $mediaType == 'movies' ? 'movie' : 'tv';
  }

  function getSlug($title)
  {
    return str_slug($title) != '' ? str_slug($title) : 'no-slug-available';
  }

  // There is no 'EN' region in TMDb.
  function getRegion($translation)
  {
    return strtolower($translation) == 'en' ? 'us' : $translation;
  }
  
  function logInfo($message, $context = [])
  {
    if( ! app()->runningUnitTests()) {
      info($message, $context);
    }
  }
