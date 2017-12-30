<?php

  namespace App\Console\Commands;

  use App\Services\Models\GenreService;
  use App\User;
  use Illuminate\Console\Command;
  use Illuminate\Support\Facades\DB as LaravelDB;

  class DB extends Command {

    private $genreService;
    
    protected $signature = 'flox:db {--fresh : Whether all data should be reset} {username?} {password?}';
    protected $description = 'Create database migrations and admin account';

    public function __construct(GenreService $genreService)
    {
      parent::__construct();

      $this->genreService = $genreService;
    }

    public function handle()
    {
      if($this->option('fresh')) {
        $this->alert('ALL DATA WILL BE REMOVED');
      }
      
      try {
        $this->createMigrations();
      } catch(\Exception $e) {
        $this->error('Can not connect to the database. Error: ' . $e->getMessage());
        $this->error('Make sure your database credentials in .env are correct');

        return false;
      }
      
      $this->createUser();
    }

    private function createMigrations()
    {
      $this->info('TRYING TO MIGRATE DATABASE');
      
      if($this->option('fresh')) {
        $this->call('migrate:fresh', ['--force' => true]);
      } else {
        $this->call('migrate', ['--force' => true]);
      }
      
      $this->info('MIGRATION COMPLETED');
    }

    private function createUser()
    {
      $username = $this->ask('Enter your admin username', $this->argument("username"));
      $password = $this->ask('Enter your admin password', $this->argument("password"));

      if($this->option('fresh')) {
        LaravelDB::table('users')->delete();
      }
      
      $user = new User();
      $user->username = $username;
      $user->password = bcrypt($password);
      $user->save();
    }
  }
