<?php

namespace Flox;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Category extends Model implements SluggableInterface
{

  use SluggableTrait;

  protected $sluggable = [
    'build_from' => 'title',
    'save_to' => 'slug',
  ];

  public function items()
  {
    return $this->hasMany('Flox\Item');
  }

  /**
   * http://softonsofa.com/tweaking-eloquent-relations-how-to-get-hasmany-relation-count-efficiently/
   */
  public function itemsCount()
  {
    return $this->hasOne('Flox\Item')
      ->selectRaw('category_id, count(*) as aggregate')
      ->groupBy('category_id');
  }

  public function getItemsCountAttribute()
  {
    if ( ! $this->relationLoaded('itemsCount')) {
      $this->load('itemsCount');
    }

    $related = $this->getRelation('itemsCount');

    return ($related) ? (int) $related->aggregate : 0;
  }
}
