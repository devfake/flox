#!/bin/bash
set -eu

prepare_flox() {
  echo Start flox db setup
  mysql -uroot -e "drop database if exists flox; create database flox;"

  (cd backend
    : $(php artisan flox:db -n admin admin)
  )

  echo flox setup done!
}

prepare_file_parser() {
  echo Start flox-file-parser db setup

  (cd flox-file-parser
    : $(npm run db:setup)
    : $(./generate_fixtures.sh)
  )

  echo flox-file-parser setup done!
}

stop_file_parser() {
  set +e

  echo Stopping file-parser...
  ps -C "node server.js" -o pid= | xargs -I % kill % > /dev/null

  set -e
}

start_file_parser() {
  echo Start file-parser...

  (cd flox-file-parser
    source .envrc
    npm start&
    sleep 3
  )
}

stop_file_parser

echo Start setup...
prepare_flox&
prepare_file_parser&
wait

start_file_parser
echo Done!
