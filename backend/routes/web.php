<?php

  Route::group(['prefix' => 'api'], function() {
    Route::get('/logout', 'UserController@logout');
    Route::post('/login', 'UserController@login');

    Route::get('/episodes/{tmdbId}', 'ItemController@episodes');
    Route::get('/items/{type}/{orderBy}', 'ItemController@items');
    Route::get('/search-items', 'ItemController@search');

    Route::get('/item/{tmdbId}/{mediaType}', 'SubpageController@item');
    Route::get('/imdb-rating/{imdbId}', 'SubpageController@imdbRating');

    Route::get('/suggestions/{tmdbID}/{mediaType}', 'TMDBController@suggestions');
    Route::get('/trending', 'TMDBController@trending');
    Route::get('/upcoming', 'TMDBController@upcoming');

    Route::get('/settings', 'SettingController@settings');

    Route::group(['middleware' => 'auth'], function() {
      Route::get('/export', 'ExportImportController@export');
      Route::post('/import', 'ExportImportController@import');

      Route::get('/check-update', 'SettingController@checkForUpdate');
      Route::get('/version', 'SettingController@getVersion');
      Route::patch('/settings', 'SettingController@updateSettings');

      Route::post('/add', 'ItemController@add');
      Route::patch('/update-alternative-titles/{tmdbId?}', 'ItemController@updateAlternativeTitles');
      Route::patch('/update-genre', 'ItemController@updateGenre');
      Route::patch('/toggle-episode/{id}', 'ItemController@toggleEpisode');
      Route::patch('/toggle-season', 'ItemController@toggleSeason');
      Route::patch('/change-rating/{itemId}', 'ItemController@changeRating');
      Route::delete('/remove/{itemId}', 'ItemController@remove');

      Route::get('/userdata', 'UserController@getUserData');
      Route::patch('/userdata', 'UserController@changeUserData');

      Route::get('/search-tmdb', 'TMDBController@search');

      Route::post('/fetch-files', 'FileParserController@call');
    });
  });

  Route::get('/{uri?}', 'HomeController@app')->where('uri', '(.*)');
