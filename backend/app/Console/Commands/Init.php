<?php

  namespace App\Console\Commands;

  use Illuminate\Console\Command;

  class Init extends Command {

    protected $signature = 'flox:init {database?} {username?} {password?} {hostname=localhost} {port=3306}';
    protected $description = 'Create .env file, set the app key and fill database credentials';

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
      $value = $this->ask('Enter your Database Name', $this->argument("database"));
      $this->changeENV('DB_DATABASE', $value);

      $value = $this->ask('Enter your Database Username', $this->argument("username"));
      $this->changeENV('DB_USERNAME', $value);

      $value = $this->ask('Enter your Database Password', $this->argument("password"));
      $this->changeENV('DB_PASSWORD', $value);

      $value = $this->ask('Enter your Database Hostname', $this->argument("hostname"));
      $this->changeENV('DB_HOST', $value);

      $value = $this->ask('Enter your Database Port', $this->argument("port"));
      $this->changeENV('DB_PORT', $value);
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
      file_put_contents('.env', preg_replace(
        "/$type=.*/",
        $type . '=' . $value,
        file_get_contents('.env')
      ));
    }
  }
