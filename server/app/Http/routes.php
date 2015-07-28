<?php

  Route::group(['prefix' => 'api'], function() {

    get('all-categories', 'APIController@allCategories');
    get('home-items/{category}/{orderBy}', 'APIController@homeItems');
    get('category-items/{category}/{orderBy}', 'APIController@categoryItems');
    //get('item/{slug}', 'APIController@slugItem');

    get('search/flox/{title}', 'APIController@searchFloxByTitle');
    get('search/tmdb/{title}', 'APIController@searchTMDBByTitle');
    //get('search/tmdb/id/{id}', 'APIController@searchTMDBByID');

    post('new', 'APIController@newItem');

  });

  Route::get('/{uri}', function() {
    return view('app');
  })->where('uri', '(.*)');
