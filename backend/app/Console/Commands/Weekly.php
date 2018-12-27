<?php

  namespace App\Console\Commands;

  use App\Services\Reminder;
  use Illuminate\Console\Command;

  class Weekly extends Command {

    protected $signature = 'flox:weekly';
    protected $description = 'Send a weekly summary of released episodes and movies';

    private $reminder;

    public function __construct(Reminder $reminder)
    {
      parent::__construct();
      
      $this->reminder = $reminder;
    }

    public function handle()
    {
      $this->reminder->sendWeekly();
    }
  }
