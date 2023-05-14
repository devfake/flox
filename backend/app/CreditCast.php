<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CreditCast extends Model
{
    /**
     * No timestamps needed.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
      'person'
    ];

    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Belongs to one person.
     */
    public function person()
    {
      return $this->belongsTo(Person::class);
    }

    /**
     * Create the new cast.
     *
     * @param $data
     * @return CreditCast
     */
     public function store($itemId, $cast)
     {
       return $this->firstOrCreate(
         ['item_id' => $itemId, 'person_id' => $cast->id],
         [
            'id' => $cast->id,
            'character' => $cast->character,
            'known_for_department' => $cast->known_for_department,
            'credit_id' => $cast->credit_id,
            'order' => $cast->order
         ]
       );
     }
}
