FROM php:7.0.15-fpm-alpine 

ENV DEBIAN_FRONTEND=noninteractive

RUN apk add --update mysql-client &&\
    docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk add --update git zip unzip vim bash

COPY docker_entrypoint.sh /usr/bin

CMD ["docker_entrypoint.sh"]
