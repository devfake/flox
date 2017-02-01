<?php

  const FIVE_MINUTES = 300;

  function increaseTimeLimit()
  {
    set_time_limit(FIVE_MINUTES);
  }