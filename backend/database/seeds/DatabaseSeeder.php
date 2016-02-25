<?php

  use Illuminate\Database\Seeder;

  class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $this->call(CategoryTableSeeder::class);
      $this->call(UserTableSeeder::class);

      foreach(range(1,20) as $i) {
        $this->call(ItemTableSeeder::class);
      }
    }
  }
