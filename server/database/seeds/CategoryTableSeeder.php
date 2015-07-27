<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
          'name' => 'Movies',
          'slug' => 'movies'
        ]);

        DB::table('categories')->insert([
          'name' => 'Series',
          'slug' => 'series'
        ]);

        DB::table('categories')->insert([
          'name' => 'Animes',
          'slug' => 'animes'
        ]);
    }
}
