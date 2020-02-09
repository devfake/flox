<?php

  function increaseTimeLimit()
  {
    set_time_limit(config('app.PHP_TIME_LIMIT'));
  }

  function isDemo()
  {
    return config('app.env') === 'demo';
  }

  function getFileName($file)
  {
    return $file->changed->name ?? $file->name;
  }

  function mediaType($mediaType)
  {
    if (strpos($mediaType, 'movie') !== false) {
      return 'movie';
    }

    return 'tv';
  }

  function getSlug($title)
  {
    $slug = Illuminate\Support\Str::slug($title);

    return $slug != '' ? $slug : 'no-slug-available';
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
