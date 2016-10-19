<?php

  namespace App\Console\Commands;

  use Illuminate\Console\Command;

  class Sync extends Command {

    protected $signature = 'flox:sync';
    protected $description = 'Synchronize your movies with your scout search driver';

    public function __construct()
    {
      parent::__construct();
    }

    public function handle()
    {
      $scoutDriver = env('SCOUT_DRIVER');

      try {
        $this->info('TRYING TO SYNC YOUR MOVIES TO ' . strtoupper($scoutDriver));
        $this->call('scout:flush', ['model' => 'App\\Item']);
        $this->call('scout:import', ['model' => 'App\\Item']);
        $this->info('SYNCHRONIZATION COMPLETED');
      } catch(\Exception $e) {
        $this->error('Can not connect to ' . $scoutDriver . '. Error: ' . $e->getMessage());
        $this->error('Make sure your ' . $scoutDriver . ' credentials in .env are correct');

        return;
      }
    }
  }
