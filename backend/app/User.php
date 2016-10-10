<?php

  namespace App;

  use Illuminate\Foundation\Auth\User as Authenticatable;

  class User extends Authenticatable {

    protected $fillable = [
      'username', 'password',
    ];

    protected $hidden = [
      'password', 'remember_token',
    ];
  }
