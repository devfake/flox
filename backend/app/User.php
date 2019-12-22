<?php

  namespace App;

  use Illuminate\Foundation\Auth\User as Authenticatable;

  class User extends Authenticatable {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'username',
      'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
      'password',
      'remember_token',
    ];
  }
