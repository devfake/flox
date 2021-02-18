cd backend
php artisan flox:init --no-interaction -vvv ${FLOX_DB_NAME} ${FLOX_DB_USER} ${FLOX_DB_PASS} ${FLOX_DB_HOST} ${FLOX_DB_PORT}
sed -ri -e 's!TMDB_API_KEY=!TMDB_API_KEY=${TMDB_API_KEY}!g' .env
sed -ri -e 's!TRANSLATION=!TRANSLATION=${FLOX_TRANSLATION}!g' .env
sed -ri -e 's!APP_URL=http://localhost!APP_URL=${FLOX_APP_URL:-http://localhost}!g' .env
sed -ri -e 's!MAIL_DRIVER=smtp!MAIL_DRIVER=${MAIL_DRIVER}!g' .env
sed -ri -e 's!MAIL_HOST=smtp.mailtrap.io!MAIL_HOST=${MAIL_HOST}!g' .env
sed -ri -e 's!MAIL_PORT=2525!MAIL_PORT=${MAIL_PORT}!g' .env
sed -ri -e 's!MAIL_USERNAME=null!MAIL_USERNAME=${MAIL_USERNAME}!g' .env
sed -ri -e 's!MAIL_PASSWORD=null!MAIL_PASSWORD=${MAIL_PASSWORD}!g' .env
sed -ri -e 's!MAIL_ENCRYPTION=null!MAIL_ENCRYPTION=${MAIL_ENCRYPTION}!g' .env
php artisan flox:db --no-interaction -vvv ${FLOX_ADMIN_USER} ${FLOX_ADMIN_PASS}
chown -R ${APACHE_RUN_USER}:${APACHE_RUN_GROUP} /var/www/html
