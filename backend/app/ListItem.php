<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class ListItem extends Model {
    
    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function item()
    {
      return $this->belongsTo(Item::class);
    }
  }
