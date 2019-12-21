<?php

  namespace App;

  use Illuminate\Database\Eloquent\Model;

  class Lists extends Model {

    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
      'is_public' => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     * 
     * @var array 
     */
    protected $appends = [
      'latest_backdrop',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function items()
    {
      return $this->belongsToMany(Item::class, 'list_items', 'list_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function latestItem()
    {
      return $this->hasOne(ListItem::class, 'list_id')->latest();
    }

    /**
     * @return mixed
     */
    public function getLatestBackdropAttribute()
    {
      $latestItem = $this->latestItem;
      
      if ($latestItem) {
        return $latestItem->item->backdrop;
      }
    }

    /**
     * Only public visible lists.
     * 
     * @param $query
     * @return mixed
     */
    public function scopeOnlyPublic($query)
    {
      return $query->where('is_public', true);
    }
  }
