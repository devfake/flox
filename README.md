![flox](http://80.240.132.120/flox/public/assets/img/logo-big.png)

###[Try Demo](http://80.240.132.120/flox/public/)

Flox is a self hosted Movies, Series and Anime watch list. It's build on top of PHP (Laravel), MySQL and React and uses [The Movie Database](https://www.themoviedb.org/) API.

**The current status miss some important features. See Todo.**

The rating based on an 5-Point system.

### Requirements

* PHP 5.5.9+
* [Composer](https://getcomposer.org/)
* [The Movie Database](https://www.themoviedb.org/) Account for the [API-Key](https://www.themoviedb.org/faq/api).

### Install

##### Server

* Download Flox and `cd` into `server`.
* Rename `.env.example` to `.env` and fill all your credentials out (your database and TMDb API-Key).
* Run `composer install`.
* Give `storage` recursive write access.
* Run `php artisan key:generate`.
* Run `php artisan migrate`. This builds the database schema for Flox.
* Since the insertion of new items currently not working, run `php artisan db:seed` for prefabricated items.

##### Client / Public

* Open the `public/assets/js/config.js` file and modify them. The `uri` is needed for the react-router. If your app lives in the root folder, change it to `/`. The rest should be clear.

**Only for development:**
* Run `npm install` in your `client` folder.
* Run `gulp watch` or `gulp watch --production` and make your work.

### Todo

* Fix load icon jerk.
* Edit, remove and add items.
* Login for admin (maybe with options).
* Detail page for items (rather than direct to youtube).
* Easy installer.
* Rewrite Server API.
* Light Theme.
* Modify and add own categorys.
* For series and animes a list of episodes.
