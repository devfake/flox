<?php

  // todo: Rewrite API.
  Route::group(['prefix' => 'api', 'middleware' => ['web']], function() {

    Route::get('all-categories', 'FloxController@allCategories');
    Route::get('home-items/{category}/{orderBy}/{loading?}', 'FloxController@homeItems');
    Route::get('category-items/{category}/{orderBy}/{loading?}', 'FloxController@categoryItems');
    Route::get('more-category-items/{categoryID}/{orderBy}/{loading}/{loaded}', 'FloxController@moreCategoryItems');

    Route::get('search/flox/{title}', 'FloxController@searchFloxByTitle');
    Route::get('search/tmdb/{title}', 'TMDBController@searchTMDBByTitle');

    Route::post('new', 'FloxController@newItem');

  });

  Route::get('/{uri}', function() {
    return view('app');
  })->where('uri', '(.*)');
