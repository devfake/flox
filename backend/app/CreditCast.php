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
     public function store(int $tmdbId, array $cast)
     {
       return $this->firstOrCreate(
         [
           'tmdb_id' => $tmdbId,
           'person_id' => $cast['person']['id']
         ],
         [
           'character' => $cast['character'],
           'known_for_department' => $cast['known_for_department'],
           'credit_id' => $cast['credit_id'],
           'order' => $cast['order']
         ]
       );
     }

     public function fromTMDB(int $tmdbId, object $cast)
     {
       return [
         'tmdb_id' => $tmdbId,
         'person_id' => $cast->id,
         'character' => $cast->character,
         'known_for_department' => $cast->known_for_department,
         'credit_id' => $cast->credit_id,
         'order' => $cast->order
       ];
     }
}
