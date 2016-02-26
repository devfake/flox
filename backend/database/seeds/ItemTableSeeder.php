<?php

  use Illuminate\Database\Seeder;
  use Illuminate\Support\Str;

  class ItemTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('items')->insert([
          'tmdb_id' => 99861,
          'title' => 'Avengers: Age of Ultron',
          'slug' => Str::slug('Avengers: Age of Ultron'),
          'poster' => '/t90Y3G8UGQp0f0DrP60wRu9gfrH.jpg',
          'category_id' => 1,
          'rating' => 2,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 135397,
        'title' => 'Jurassic World',
          'slug' => Str::slug('Jurassic World'),
          'poster' => '/uXZYawqUsChGSj54wcuBtEdUJbh.jpg',
          'category_id' => null,
          'rating' => 4.5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 68726,
        'title' => 'Pacific Rim',
          'slug' => Str::slug('Pacific Rim'),
          'poster' => '/sCJEwEShZvruTpQ2a4yiX3Q9EyZ.jpg',
          'category_id' => 1,
          'rating' => 3.5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 242224,
        'title' => 'The Babadook',
          'slug' => Str::slug('The Babadook'),
          'poster' => '/b3YzM03YxkOaJw2PglfKlcwr8bM.jpg',
          'category_id' => null,
          'rating' => 4,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 26447,
        'title' => 'Dragon Ball Z',
          'slug' => Str::slug('Dragon Ball Z'),
          'poster' => '/4YJSp7sAcxD3nea9n9mjwU2Y3DV.jpg',
          'category_id' => 3,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 184346,

        'title' => 'Deliver Us from Evil',
          'slug' => Str::slug('Deliver Us from Evil'),
          'poster' => '/yEIMu6tgUPNmbLfH7fugKOe12id.jpg',
          'category_id' => 1,
          'rating' => 4,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 21208,

        'title' => 'Orphan',
          'slug' => Str::slug('Orphan'),
          'poster' => '/dVP8tE9bV2oIv1l0aWtTUJndZvc.jpg',
          'category_id' => 1,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 4607,
        'title' => 'Lost',
          'slug' => Str::slug('Lost'),
          'poster' => '/jyGspygDXJMydTOJj7iWNx9Elyd.jpg',
          'category_id' => 2,
          'rating' => 3.5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 2288,
        'title' => 'Prison Break',
          'slug' => Str::slug('Prison Break'),
          'poster' => '/38KlJOm67KyZqT9ZcBSsmET04HG.jpg',
          'category_id' => 2,
          'rating' => 4,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 44217,
        'title' => 'Vikings',
          'slug' => Str::slug('Vikings'),
          'poster' => '/mBDlsOhNOV1MkNii81aT14EYQ4S.jpg',
          'category_id' => null,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 1399,
        'title' => 'Game of Thrones',
          'slug' => Str::slug('Game of Thrones'),
          'poster' => '/jIhL6mlT7AblhbHJgEoiBIOUVl1.jpg',
          'category_id' => 2,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 1413,
        'title' => 'American Horror Story',
          'slug' => Str::slug('American Horror Story'),
          'poster' => '/uRl2hCJw2SXOMJhmcJF6UlBmBij.jpg',
          'category_id' => 2,
          'rating' => 4,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 61459,
        'title' => 'Parasyte -the maxim-',
          'slug' => Str::slug('Parasyte -the maxim-'),
          'poster' => '/pUdUxvuqabs6JDru00wmMIjibbS.jpg',
          'category_id' => 3,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 13916,
        'title' => 'Death Note',
          'slug' => Str::slug('Death Note'),
          'poster' => '/nhIkKuOpOXOE6ud0naCHTjRoOwq.jpg',
          'category_id' => 3,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 16830,
        'title' => 'Hellsing',
          'slug' => Str::slug('Hellsing'),
          'poster' => '/fK5eCcDxukp75lmDWvQkhJvYtOj.jpg',
          'category_id' => 3,
          'rating' => 4,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);

      DB::table('items')->insert([
        'tmdb_id' => 46298,
        'title' => 'Hunter x Hunter',
          'slug' => Str::slug('Hunter x Hunter'),
          'poster' => '/l5CLmiz0yPwusw3D10XaQDuSFTm.jpg',
          'category_id' => null,
          'rating' => 5,
          'released' => '1429912800',
          'seen' => '1429912800',
          'created_at' => '1429912800',
      ]);
    }
  }
