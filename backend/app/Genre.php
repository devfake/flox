<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Genre extends Model {

    /**
     * No timestamps needed.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Scope to find the genre by name.
     */
    public function scopeFindByName($query, $genre)
    {
      return $query->where('name', $genre);
    }
  }
