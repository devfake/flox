cd backend
php artisan flox:init --no-interaction -vvv ${FLOX_DB_NAME} ${FLOX_DB_USER} ${FLOX_DB_PASS} ${FLOX_DB_HOST} ${FLOX_DB_PORT}
sed -ri -e 's!TMDB_API_KEY=!TMDB_API_KEY=${TMDB_API_KEY}!g' .env
sed -ri -e 's!TRANSLATION=!TRANSLATION=${FLOX_TRANSLATION}!g' .env
sed -ri -e 's!APP_ENV=local!APP_ENV=production!g' .env
php artisan flox:db --no-interaction -vvv ${FLOX_ADMIN_USER} ${FLOX_ADMIN_PASS}
chown -R ${APACHE_RUN_USER}:${APACHE_RUN_GROUP} /var/www/html

