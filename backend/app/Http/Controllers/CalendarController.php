<?php

  namespace App\Http\Controllers;
  
  use App\Services\Calendar;

  class CalendarController {

    private $calendar;

    public function __construct(Calendar $calendar)
    {
      $this->calendar = $calendar;
    }

    public function items()
    {
      return $this->calendar->items();
    }
  }
