<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Setting extends Model {

    public $timestamps = false;

    protected $fillable  = ['show_date', 'show_genre', 'episode_spoiler_protection'];
  }
