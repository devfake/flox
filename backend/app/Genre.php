<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Genre extends Model {

    public $timestamps = false;

    protected $fillable = [
      'name',
      'id',
    ];
    
    public function scopeFindByName($query, $genre)
    {
      return $query->where('name', $genre);
    }
  }
