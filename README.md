![flox](http://80.240.132.120/flox-demo/public/assets/img/dark.jpg)

Flox
===============
Flox is a self hosted Movie watch list. It's build on top of PHP (Laravel), MySQL and Vue.js and uses [The Movie Database](https://www.themoviedb.org/) API.
The rating based on an 3-Point system for `good`, `medium` and `bad`.

[Try live demo](http://80.240.132.120/flox-demo/public/) and [login](http://80.240.132.120/flox-demo/public/login) with `demo / demo` to add new movies or change ratings.

### Requirements

* PHP >=5.6.4
* [Composer](https://getcomposer.org/)
* [The Movie Database](https://www.themoviedb.org/) Account for the [API-Key](https://www.themoviedb.org/faq/api)

### Install

* Download Flox and `cd` into `backend` and run
```bash
composer install
php artisan flox:init # Enter here your database credentials
php artisan flox:db # Running migrations and enter your admin credentials for the site
```
* Enter your TMDB API-Key in `backend/.env`
* Set your `CLIENT_URI` in `backend/.env`. If you use something like XAMPP or MAMP, the CLIENT_URI should be `/flox/public`. If you use something like Homestead, the CLIENT_URI should be `/`.

### Alternative Language

All movie titles are in english by default. You can check if TMDB has an alternative title by setting `ALTERNATIVE_LANGUAGE` in `backend/.env`.
The most commons are `DE`, `IT`, `FR`, `ES` and `RU`.

### Better Search

You can use [Laravel Scout](https://laravel.com/docs/master/scout) for better search results with typos. Something like `findg nemo`.
Add your driver and API-Keys in `backend/.env` and uncomment `use Searchable;` in `backend/app/Item.php` on line 11.

To sync your own movie list with your Laravel Scout driver, run `php artisan flox:sync` (If you using Laravel Scout later).

[Algolia](https://www.algolia.com/) is a great service and has a free hacker plan.

Note: Laravel Scout is on the demo site not active.

### Development

* Run `npm install` in your `/client` folder.
* Make sure you have installed `webpack` globally.
* Run `npm run dev` or  `npm run build`.

### Misc

* Give `backend/storage` and `public/assets` recursive write access.

### Todo

* Settings
  * Export and import
  * Sync scout driver
* Ajax request for settings
* Better responsive
