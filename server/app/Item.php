<?php

namespace Flox;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Item extends Model implements SluggableInterface
{

  use SluggableTrait;

  protected $sluggable = [
    'build_from' => 'title',
    'save_to' => 'slug',
  ];

  public $timestamps = false;

  public function categories()
  {
    return $this->belongsTo('Flox\Category', 'category_id');
  }
}
