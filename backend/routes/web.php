<?php

  Route::group(['prefix' => 'api'], function() {
    Route::post('/login', 'UserController@login');
    Route::get('/logout', 'UserController@logout');

    Route::get('/items/{type}/{orderBy}', 'ItemController@items');
    Route::get('/search-items', 'ItemController@search');

    Route::get('/suggestions/{tmdbID}/{mediaType}', 'TMDBController@suggestions');
    Route::get('/trending', 'TMDBController@trending');
    Route::get('/upcoming', 'TMDBController@upcoming');

    Route::get('/settings', 'SettingController@settings');

    Route::group(['middleware' => 'auth'], function() {
      Route::get('/export', 'SettingController@export');
      Route::post('/import', 'SettingController@import');

      Route::get('/check-update', 'SettingController@checkForUpdate');
      Route::post('/fetch-files', 'SettingController@fetchFiles');

      Route::get('/sync-scout', 'SettingController@syncScout');
      Route::patch('/update-genre', 'SettingController@updateGenre');
      Route::patch('/settings', 'SettingController@updateSettings');
      Route::patch('/update-alternative-titles/{tmdbID?}', 'ItemController@updateAlternativeTitles');

      Route::get('/version', 'SettingController@getVersion');
      Route::get('/userdata', 'UserController@getUserData');

      Route::patch('/userdata', 'UserController@changeUserData');
      Route::patch('/toggle-episode/{id}', 'ItemController@toggleEpisode');
      Route::patch('/toggle-season', 'ItemController@toggleSeason');
      Route::get('/episodes/{tmdb_id}', 'ItemController@episodes');

      Route::get('/search-tmdb', 'TMDBController@search');
      Route::post('/add', 'ItemController@add');
      Route::patch('/change-rating/{itemID}', 'ItemController@changeRating');
      Route::delete('/remove/{itemID}', 'ItemController@remove');
    });
  });

  Route::get('/{uri?}', 'HomeController@app')->where('uri', '(.*)');
