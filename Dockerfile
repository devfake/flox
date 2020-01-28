# start with the official node image and name it
FROM node:latest AS node
COPY ./client /flox/client
COPY ./public /flox/public
#RUN git clone https://github.com/devfake/flox.git \
RUN cd flox/client \
    && npm install \
    && npm run build


# build front end as named composer
FROM composer:latest AS composer
COPY ./backend /backend
WORKDIR /backend
RUN composer install


# continue with the official PHP image
FROM php:apache
# copy the built files from the previous images into the PHP image
COPY --from=node ./flox /var/www/html/
COPY --from=composer /backend /var/www/html/backend
COPY ./bin /var/www/html/bin
WORKDIR /var/www/html
# apache configs + document root
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
# mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin
RUN a2enmod rewrite headers
# install php modules
COPY ./entrypoint.sh /
COPY ./wait-for-it.sh /
COPY ./init-run.sh /
RUN apt-get update \
    && apt-get install -y curl wget libzip-dev \
    && apt-get clean \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo_mysql zip \
    && chmod +x /wait-for-it.sh \
    && chmod +x /init-run.sh \
    && chmod +x /entrypoint.sh
# Launch the httpd in foreground
ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]

## continue with the official PHP alpine image
#FROM php:alpine
## copy the built files from the previous images into the PHP image
#COPY --from=node /flox /var/www/html
#COPY --from=composer /backend /var/www/html/backend
#WORKDIR /var/www/html
## Concatenated RUN commands
#RUN apk add --update apache2 php-apache2 libzip-dev wget curl\
#    && chown -R www-data:www-data /var/www/html \
#    && mkdir -p /run/apache2 \
#    && sed -i '/LoadModule rewrite_module/s/^#//g' /etc/apache2/httpd.conf \
#    && sed -i '/LoadModule session_module/s/^#//g' /etc/apache2/httpd.conf \
#    && sed -ri -e 's!/var/www/localhost/htdocs!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/httpd.conf \
#    && sed -ri -e 's!User apache!User www-data!g' /etc/apache2/httpd.conf \
#    && sed -ri -e 's!Group apache!Group www-data!g' /etc/apache2/httpd.conf \
#    && sed -i 's/AllowOverride\ None/AllowOverride\ All/g' /etc/apache2/httpd.conf \
#    && sed -i 's/AllowOverride\ None/AllowOverride\ All/g' /etc/apache2/httpd.conf \
#    && printf "DirectoryIndex index.html index.php\n\n" >> /etc/apache2/httpd.conf \
#    && printf "<FilesMatch \.php$>\n\tSetHandler application/x-httpd-php\n</FilesMatch>" >> /etc/apache2/httpd.conf \
#    && docker-php-ext-install pdo_mysql zip\
#    && rm  -rf /tmp/* /var/cache/apk/*
## Setup flox for the first run
#RUN cd backend \
#    && php artisan flox:init ${FLOX_DB_NAME} ${FLOX_DB_USER} ${FLOX_DB_PASS} ${FLOX_DB_HOST} ${FLOX_DB_PORT} \
#    && sed -ri -e 's!TMDB_API_KEY=!TMDB_API_KEY=${TMDB_API_KEY}!g' .env \
#    && php artisan flox:db ${FLOX_ADMIN_USER} ${FLOX_ADMIN_PASS}
## Launch the httpd in foreground
#CMD rm -rf /run/apache2/* || true && /usr/sbin/httpd -DFOREGROUND
