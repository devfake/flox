<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class ListItem extends Model {
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function item()
    {
      return $this->belongsTo(Item::class);
    }
  }
