<?php

  Route::group(['prefix' => 'api'], function() {
    Route::post('/login', 'UserController@login');
    Route::get('/logout', 'UserController@logout');

    Route::get('/items/{orderBy}', 'ItemController@items');
    Route::get('/search-items', 'ItemController@search');

    Route::get('/suggestions/{tmdbID}', 'TMDBController@suggestions');
    Route::get('/trending', 'TMDBController@trending');
    Route::get('/upcoming', 'TMDBController@upcoming');

    Route::get('/settings', 'SettingController@settings');

    Route::group(['middleware' => 'auth'], function() {
      Route::get('/export', 'SettingController@export');
      Route::post('/import', 'SettingController@import');

      Route::get('/update-genre', 'SettingController@updateGenre');
      Route::patch('/settings', 'SettingController@changeSettings');

      Route::patch('/userdata', 'UserController@changeUserData');

      Route::get('/search-tmdb', 'TMDBController@search');
      Route::post('/add', 'ItemController@add');
      Route::patch('/change-rating/{itemID}', 'ItemController@changeRating');
      Route::delete('/remove/{itemID}', 'ItemController@remove');
    });
  });

  Route::get('/{uri?}', function($uri = null) {
    return view('app');
  })->where('uri', '(.*)');
