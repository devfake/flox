![flox](http://80.240.132.120/flox/public/assets/img/logo-big.png)

###[Try Demo](http://80.240.132.120/flox/public/)

Flox is a self hosted Movie watch list. It's build on top of PHP (Laravel), MySQL and React and uses [The Movie Database](https://www.themoviedb.org/) API.

**The current status miss some important features. See Todo.**

The rating based on an 5-Point system with 0.5 steps.

### Requirements

* PHP 5.5.9+
* [Composer](https://getcomposer.org/)
* [The Movie Database](https://www.themoviedb.org/) Account for the [API-Key](https://www.themoviedb.org/faq/api).

### Install

##### Backend

* Download Flox and `cd` into `backend`.
* Rename `.env.example` to `.env` and fill all your credentials out (your database and TMDb API-Key).
* Run `composer install`.
* Give `storage` recursive write access.
* Run `php artisan key:generate`.
* Run `php artisan migrate`. This builds the database schema for Flox.
* Since the insertion of new items currently not working, run `php artisan db:seed` for prefabricated items.

##### Client / Public

* Open the `/public/assets/js/config.js` file and modify them. The `uri` is needed for the react-router. If your app lives in the root folder, change it to `/`. The rest should be clear.

**Only for development:**
* Run `npm install` in your `client` folder.
* Run `gulp watch` or `gulp watch --production` and make your work.

### Misc

There is a light theme option: Add `light-theme` class to `body` in `/client/views/app.blade.php`.

### Todo

* Add movies.
* Login for admin (create movie categories).
* Import lists from imdb and letterboxd.
