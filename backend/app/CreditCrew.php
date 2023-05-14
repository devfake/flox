<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CreditCrew extends Model
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
     * Create the new crew.
     *
     * @param $data
     * @return CreditCrew
     */
     public function store($itemId, $crew)
     {
       return $this->firstOrCreate(
         ['item_id' => $itemId, 'person_id' => $crew->id],
         [
            'id' => $crew->id,
            'known_for_department' => $crew->known_for_department,
            'credit_id' => $crew->credit_id,
            'department' => $crew->department,
            'job' => $crew->job
         ]
       );
     }
}
