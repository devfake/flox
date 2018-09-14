Flox 2.0
===============
The next version of flox contains many new features and changes. Readme will be updated soon.

### Requirements

* PHP >=7.1
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

### Queue

To import or update any of your entries you need to have at least one worker running.

```bash
# spawn a single worker
php artisan queue:work --daemon --tries=3

# or

./bin/start_queue 4  # number determines the amount of workers, defaults to 1
./bin/stop_queue  # stop all workers
```

Check the [documentation](https://laravel.com/docs/5.5/queues) for more informations.

### Cron Job

To utilize the queues to update automatically you have to set up a cron task once manually on your server.

```
* * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1
```

You can use ```crontab -e``` to add this new Cron task.

Make sure Cron is running and you are good to go.
```
sudo service cron status
```

This Cron will call the Laravel command scheduler every minute. Then, Laravel evaluates your scheduled tasks and runs the tasks that are due.

Currently in Flox defined tasks:

| When   | Description                     |
| ------ | ------------------------------- |
| Daily  | Update all Entities from TMDb   |

### Export / Import

Also you can make a backup of all your movies and shows in the settings page. If you click the `EXPORT MOVIES` button, there will be an download for an `json` file. This file contains all your movies and shows from your database. This backup file will also be automatically saved in your `public/exports` folder.

If you import an backup, all movies and shows in your database will be deleted and replaced. Be sure to make an current backup before you import.
The import will download all poster images.

Make sure that the queue worker is active! Otherwise flox will tell you the import is running, but nothing happens!

### Translation

All titles are in english by default. You can change your language by setting `TRANSLATION` in `backend/.env`. The most commons are `DE`, `IT`, `FR`, `ES` and `RU`. You can try to use your language code.

This will also affect the language of you website. See in `client/resources/languages` if your language is supported. Pull requests are welcome :) 

If there isn't a translation for your language, english will be used.

### Settings

You can edit your admin account (username and password) in the settings page (link is in footer).

You can also set options to display release date and/or genre of your own list. Both will still display on search, trending and upcoming.

There is an option to enable or disable spoiler protection for episode names.

![spoiler](http://80.240.132.120/flox-demo/public/assets/spoiler.png)

### Troubleshooting

## Import does not work

Your import file is probably to big. In default php.ini the max upload file is 2MB. Set the number higher and try again.

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
