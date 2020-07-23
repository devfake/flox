# NOTE : This dockerfile uses a feature called docker multistage builds
# which would create two intermediate images that can be later removed
# if needed. This is done to keep the size of the final image smaller.
# Removal command : docker image prune (Please know what you're about to
# do while using this.
# Ref : https://docs.docker.com/develop/develop-images/multistage-build
#       https://docs.docker.com/engine/reference/commandline/image_prune
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
COPY crontab /etc/cron/crontab /
RUN apt-get update \
    && apt-get install -y curl wget libzip-dev cron supervisor \
    && apt-get clean \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo_mysql zip \
    && chmod +x /wait-for-it.sh \
    && chmod +x /init-run.sh \
    && chmod +x /entrypoint.sh \
    && crontab /etc/cron/crontab
# Launch the httpd in foreground
ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]
