<?php

  use Illuminate\Database\Seeder;
  use Illuminate\Database\Eloquent\Model;

  class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $this->call(CategoryTableSeeder::class);
      foreach(range(1,20) as $i) {
        $this->call(ItemTableSeeder::class);
      }
    }
  }
