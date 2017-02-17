#!/bin/bash
MYSQL="mysql -h db -P 3306 -uroot -proot -e"

echo "wait for mysql service to start..."
until $MYSQL "create database if not exists flox;"; do
  echo "Mysql service starting...."
  sleep 1
done
echo "Mysql service started."

cd /
chmod -R a+rwx flox

cd flox/backend
composer install --no-dev
php artisan flox:init -n flox root root
php artisan flox:db -n admin admin

php-fpm
