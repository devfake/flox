<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;
  use Laravel\Scout\Searchable;

  class Item extends Model {

    // Uncomment this if you are using Laravel Scout.
    //use Searchable;

    public $timestamps = false;

    protected $fillable = [
      'tmdb_id',
      'title',
      'original_title',
      'poster',
      'rating',
      'released',
      'created_at',
      'genre',
    ];
  }
