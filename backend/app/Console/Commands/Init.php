<?php

  namespace App\Console\Commands;

  use Illuminate\Console\Command;

  class Init extends Command {

    protected $signature = 'flox:init';
    protected $description = 'Create .env file, set the app key and fill database credentials';

    private $requests = [
      'DB_DATABASE' => 'Name',
      'DB_USERNAME' => 'Username',
      'DB_PASSWORD' => 'Password',
    ];

    public function __construct()
    {
      parent::__construct();
    }

    public function handle()
    {
      $this->createENVFile();
      $this->fillDatabaseCredentials();
      $this->setAppKey();
    }

    private function createENVFile()
    {
      if( ! file_exists('.env')) {
        $this->info('CREATING .ENV FILE');
        copy('.env.example', '.env');
      }
    }

    private function fillDatabaseCredentials()
    {
      foreach($this->requests as $type => $text) {
        if( ! env($type)) {
          $value = $this->ask('Enter your Database ' . $text);
          $this->changeENV($type, $value);
        }
      }
    }

    private function setAppKey()
    {
      if( ! env('APP_KEY')) {
        $this->info('GENERATING APP KEY');
        $this->callSilent('key:generate');
      }
    }

    private function changeENV($type, $value)
    {
      file_put_contents('.env', str_replace(
        $type . '=',
        $type . '=' . $value,
        file_get_contents('.env')
      ));
    }
  }
