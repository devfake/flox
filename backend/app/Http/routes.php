<?php

  // todo: Rewrite API.
  Route::group(['prefix' => 'api'], function() {

    get('all-categories', 'FloxController@allCategories');
    get('home-items/{category}/{orderBy}/{loading?}', 'FloxController@homeItems');
    get('category-items/{category}/{orderBy}/{loading}', 'FloxController@categoryItems');
    get('more-category-items/{categoryID}/{orderBy}/{loading}/{loaded}', 'FloxController@moreCategoryItems');

    get('search/flox/{title}', 'FloxController@searchFloxByTitle');
    get('search/tmdb/{title}', 'TMDBController@searchTMDBByTitle');

    post('new', 'FloxController@newItem');

  });

  Route::get('/{uri}', function() {
    return view('app');
  })->where('uri', '(.*)');
