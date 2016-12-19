<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class AlternativeTitle extends Model {

    public $timestamps = false;

    protected $fillable = ['title', 'tmdb_id', 'country'];
  }
