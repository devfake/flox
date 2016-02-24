<?php

  Route::get('import', function() {
    Excel::load('list.csv', function($reader) {

      dd($reader->get());

      $reader->each(function($sheet) {
        echo $sheet['title'] . "<br>";
      });
    });
  });

  // todo: Rewrite API.
  Route::group(['middleware' => ['web']], function() {

    Route::group(['prefix' => 'api'], function() {

      Route::get('all-categories', 'FloxController@allCategories');
      Route::get('home-items/{category}/{orderBy}/{loading?}', 'FloxController@homeItems');
      Route::get('category-items/{category}/{orderBy}/{loading?}', 'FloxController@categoryItems');
      Route::get('more-category-items/{categoryID}/{orderBy}/{loading}/{loaded}', 'FloxController@moreCategoryItems');

      Route::get('search/flox/{title}', 'FloxController@searchFloxByTitle');
      Route::get('search/tmdb/{title}', 'TMDBController@searchTMDBByTitle');

      Route::post('new', 'FloxController@newItem');
      Route::post('handle-item-remove/{id}', 'FloxController@handleItemRemove');
      Route::post('update-rating/{id}', 'FloxController@updateRating');

    });

    Route::get('/{uri}', function() {
      return view('app');
    })->where('uri', '(.*)');

  });
