<?php

  Route::group(['prefix' => 'api'], function() {

    Route::post('/login', 'UserController@login');
    Route::get('/logout', 'UserController@logout');

    Route::get('/items/{orderBy}', 'ItemController@items');
    Route::get('/search-items', 'ItemController@search');

    Route::get('/export', 'ItemController@export');

    Route::group(['middleware' => 'auth'], function() {
      Route::get('/get-userdata', 'UserController@userData');
      Route::post('/change-userdata', 'UserController@changeUserData');

      Route::get('/search-tmdb', 'TMDBController@search');
      Route::post('/add', 'ItemController@add');
      Route::patch('/change-rating/{itemID}', 'ItemController@changeRating');
      Route::delete('/remove/{itemID}', 'ItemController@remove');
    });
  });

  Route::get('/{uri?}', function($uri = null) {
    return view('app');
  })->where('uri', '(.*)');
