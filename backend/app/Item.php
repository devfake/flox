<?php

namespace Flox;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Item extends Model implements SluggableInterface
{

  use SluggableTrait;

  public $timestamps = false;

  protected $sluggable = [
    'build_from' => 'title',
    'save_to' => 'slug',
  ];

  public function categories()
  {
    return $this->belongsTo('Flox\Category', 'category_id');
  }
}
