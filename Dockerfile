# syntax=docker/dockerfile:experimental
FROM composer:1.10.17@sha256:8d37a3118fc4dc5408f014faab1c3d6f9fbed7322f2cf887443f1bff7e722f5d AS composer
COPY . /flox
RUN --mount=type=cache,target=/tmp/cache set -ex; \
    \
    cd /flox/backend; \
    composer install;

FROM php:7.4.12-fpm-buster@sha256:ed5f18ce68f67f7fdff07a75a61c68c90a7c93c1568021b003dd41059358ad5e
RUN set -ex; \
    \
    groupadd --system foo; \
    useradd --no-log-init --system --gid foo --create-home foo; \
    \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        supervisor \
        busybox-static \
        gosu \
        sqlite3 \
        rsync \
    ; \
    rm -rf /var/lib/apt/lists/*; \
    \
    mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"; \
    \
    mkdir -p \
        /var/log/supervisord \
        /var/run/supervisord \
        /var/spool/cron/crontabs \
        /var/www/flox \
    ; \
    echo '* * * * * php /var/www/flox/backend/artisan schedule:run >> /dev/null 2>&1' > /var/spool/cron/crontabs/foo;

RUN set -ex; \
    \
    savedAptMark="$(apt-mark showmanual)"; \
    \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        libpq-dev \
    ; \
    \
    docker-php-ext-install -j "$(nproc)" \
        bcmath \
        pdo_mysql \
        pdo_pgsql \
        opcache \
    ; \
    \
    # reset apt-mark's "manual" list so that "purge --auto-remove" will remove all build dependencies
    apt-mark auto '.*' > /dev/null; \
    apt-mark manual $savedAptMark; \
    ldd "$(php -r 'echo ini_get("extension_dir");')"/*.so \
        | awk '/=>/ { print $3 }' \
        | sort -u \
        | xargs -r dpkg-query -S \
        | cut -d: -f1 \
        | sort -u \
        | xargs -rt apt-mark manual; \
    \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
    rm -rf /var/lib/apt/lists/*;

RUN set -ex; \
    \
    apt-get update; \
    \
    apt-get install -y \
        nginx \
    ;

COPY --from=composer /flox /usr/share/flox
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/cron.sh /cron.sh
COPY docker/supervisord.conf /supervisord.conf
COPY docker/default.conf /etc/nginx/sites-enabled/default

WORKDIR /var/www/flox

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/supervisord.conf"]
