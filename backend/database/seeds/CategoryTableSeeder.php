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
          'name' => 'Horror',
          'slug' => 'horror'
        ]);

        DB::table('categories')->insert([
          'name' => 'Action',
          'slug' => 'action'
        ]);

        DB::table('categories')->insert([
          'name' => 'Comedy',
          'slug' => 'comedy'
        ]);
    }
}
