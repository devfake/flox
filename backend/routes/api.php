<?php

  Route::group(['middleware' => 'auth.basic'], function() {
    Route::patch('/update-files', 'FileParserController@receive');
    Route::post('/import', 'ExportImportController@import');
    Route::get('/export', 'ExportImportController@export');
  });

  Route::get('/last-fetched', 'FileParserController@lastFetched');
