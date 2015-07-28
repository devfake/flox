<?php

  Route::group(['prefix' => 'api'], function() {

    get('all-categories', 'APIController@allCategories');
    get('home-items/{category}/{orderBy}/{loading?}', 'APIController@homeItems');
    get('category-items/{category}/{orderBy}/{loading}', 'APIController@categoryItems');
    get('more-category-items/{categoryID}/{orderBy}/{loading}/{loaded}', 'APIController@moreCategoryItems');

    get('search/flox/{title}', 'APIController@searchFloxByTitle');
    get('search/tmdb/{title}', 'APIController@searchTMDBByTitle');

    post('new', 'APIController@newItem');

  });

  Route::get('/{uri}', function() {
    return view('app');
  })->where('uri', '(.*)');
