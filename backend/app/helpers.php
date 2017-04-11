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