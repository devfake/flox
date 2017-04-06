<?php

  const TEN_MINUTES = 600;

  function increaseTimeLimit()
  {
    set_time_limit(TEN_MINUTES);
  }

  function getFileName($file)
  {
    return $file->changed->name ?? $file->name;
  }

  function mediaType($mediaType)
  {
    return $mediaType == 'movies' ? 'movie' : 'tv';
  }