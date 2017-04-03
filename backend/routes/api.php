<?php

  Route::group(['middleware' => 'auth.basic'], function() {
    Route::patch('/update-files', 'FileParserController@receive');
  });

  Route::get('/last-fetched', 'FileParserController@lastFetched');
