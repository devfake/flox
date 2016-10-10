<?php

  namespace App\Console\Commands;

  use App\User;
  use Illuminate\Console\Command;

  class DB extends Command {

    protected $signature = 'flox:db';
    protected $description = 'Create database migrations and admin account';

    public function __construct()
    {
      parent::__construct();
    }

    public function handle()
    {
      try {
        $this->createMigrations();
      } catch(\Exception $e) {
        $this->error('Can not connect to the database. Error: ' . $e->getMessage());
        $this->error('Make sure your database credentials in .env are correct');

        return;
      }

      $this->createUser();
    }

    private function createMigrations()
    {
      $this->info('TRYING TO MIGRATE DATABASE');
      $this->call('migrate', ['--force' => true]);
      $this->info('MIGRATION COMPLETED');
    }

    private function createUser()
    {
      $username = $this->ask('Enter your admin username');
      $password = $this->ask('Enter your admin password');

      $user = new User();
      $user->username = $username;
      $user->password = bcrypt($password);
      $user->save();
    }
  }
