<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Genre extends Model {

    public $timestamps = false;

    protected $fillable = [
      'name',
      'id',
    ];
  }
