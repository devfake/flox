Flox
===============
[![Build Status](https://travis-ci.org/devfake/flox.svg?branch=master)](https://travis-ci.org/devfake/flox)

Flox is a self hosted Movie, Series and Animes watch list. It's build on top of Laravel and Vue.js and uses [The Movie Database](https://www.themoviedb.org/) API.
The rating based on an 3-Point system for `good`, `medium` and `bad`.

### [Try live demo](http://80.240.132.120/flox-demo/public/) and [login](http://80.240.132.120/flox-demo/public/login) with `demo / demo` to add new movies or change ratings.

![flox](http://80.240.132.120/flox-demo/public/assets/screenshot.png)

### Requirements

* PHP >=5.6.4
* Database (MySQL or [other](https://laravel.com/docs/5.3/database))
* [Composer](https://getcomposer.org/)
* The Movie Database Account for the free [API-Key](https://www.themoviedb.org/faq/api)

### Install

```bash
git clone https://github.com/devfake/flox
cd flox/backend
composer install
php artisan flox:init # Enter here your database credentials
php artisan flox:db # Running migrations and enter your admin credentials for the site
```
* Give `backend/storage`, `public/assets` and `public/exports` recursive write access.
* Enter your TMDb API-Key in `backend/.env`
* Set your `CLIENT_URI` in `backend/.env`. If you use something like XAMPP or MAMP, the CLIENT_URI should be `/flox/public`. If you use something like Homestead, the CLIENT_URI should be `/`.
```bash
# CLIENT_URI=/flox/public
http://localhost:8888/flox/public

# CLIENT_URI=/subfolder/for/flox/public
http://mydomain.com/subfolder/for/flox/public

# CLIENT_URI=/
http://mydomain.com
```

### Suggestions

If you hover over an item, you can click on `Suggestions` to search for recommendations and similar movies or shows.

### Popular Movies

`Trending` will display a list of the current popular movies on TMDb. This list updates daily.

### Upcoming Movies

`Upcoming` will display new movies which will be released soon. TMDb do not yet support regional queries but this is coming soon.

### Update

For each update i will make an extra [release](https://github.com/devfake/flox/releases).
These are the common steps to upgrade flox:
```bash
git fetch
git checkout x.x.x
cd backend
composer install
php artisan migrate
```

If you go to the settings page of your installation, flox will automatically check for new updates.

### Export / Import

Also you can make a backup of all your movies and shows in the settings page. If you click the `EXPORT MOVIES` button, there will be an download for an `json` file. This file contains all your movies and shows from your database. This backup file will also be automatically saved in your `public/exports` folder.

If you import an backup, all movies and shows in your database will be deleted and replaced. Be sure to make an current backup before you import.
The import will download all poster images.

### Translation

All titles are in english by default. You can change your language by setting `TRANSLATION` in `backend/.env`. The most commons are `DE`, `IT`, `FR`, `ES` and `RU`. You can try to use your language code.

This will also affect the language of you website. See in `client/resources/languages` if your language is supported. Pull requests are welcome :) 

If there isn't a translation for your language, english will be used.

### Better Search

You can use [Laravel Scout](https://laravel.com/docs/master/scout) for better search results with typos. Something like `findg nemo`.
Add your driver and API-Keys in `backend/.env` and uncomment `use Searchable;` in `backend/app/Item.php` on line 11.

To sync your own list with your Laravel Scout driver, run `php artisan flox:sync` (If you using Laravel Scout later).

[Algolia](https://www.algolia.com/) is a great service and has a free hacker plan.

**Note**: This works only for **your** database.

### Settings

You can edit your admin account (username and password) in the settings page (link is in footer).

You can also set options to display release date and/or genre of your own list. Both will still display on search, trending and upcoming.

There is an option to enable or disable spoiler protection for episode names.

![spoiler](http://80.240.132.120/flox-demo/public/assets/spoiler.png)

### Development

* Run `npm install` or `yarn` in your `/client` folder.
* Make sure you have installed `webpack` globally.
* Run `npm run dev` or  `npm run build`.

### Contribution

Like this project? Want to contribute? Awesome! Feel free to open some pull requests or just open an issue.

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/devfake/flox/releases).

### License

Flox is published under the MIT license. See LICENSE for more information.
