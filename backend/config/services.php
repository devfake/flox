<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'tmdb' => [
      'key' => env('TMDB_API_KEY'),
      'poster' => 'http://image.tmdb.org/t/p/w185',
      'poster_subpage' => 'http://image.tmdb.org/t/p/w342',
      'backdrop' => 'http://image.tmdb.org/t/p/w1280',
    ],

    'fp' => [
      'host' => env('FP_HOST'),
      'port' => env('FP_PORT'),
    ],

];
