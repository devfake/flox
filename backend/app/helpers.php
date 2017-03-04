<?php

  const FIVE_MINUTES = 300;

  function increaseTimeLimit()
  {
    set_time_limit(FIVE_MINUTES);
  }

  function getFileName($file)
  {
    return $file->changed->name ?? $file->name;
  }