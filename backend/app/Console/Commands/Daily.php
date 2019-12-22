<?php

  namespace App\Console\Commands;

  use App\Services\Reminder;
  use Illuminate\Console\Command;

  class Daily extends Command {

    protected $signature = 'flox:daily';
    protected $description = 'Send a daily reminder of released episodes and movies';

    private $reminder;

    public function __construct(Reminder $reminder)
    {
      parent::__construct();
      
      $this->reminder = $reminder;
    }

    public function handle()
    {
      $this->reminder->sendDaily();
    }
  }
