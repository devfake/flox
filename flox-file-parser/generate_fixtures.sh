#!/bin/bash

declare -a tv_series=('Game of Thrones' 'Breaking Bad')

# cleanup
mkdir -p app/fixtures
rm -rf app/fixtures/*

mkdir app/fixtures/tv
mkdir app/fixtures/movies

# generate tv, seasons and episodes
for tv in "${tv_series[@]}"; do
  mkdir app/fixtures/tv/"$tv"
  
  pushd app/fixtures/tv/"$tv" > /dev/null
  for season in 1 2; do
    mkdir s0${season}

    pushd s0${season} > /dev/null
      for episode in 1 2; do
        touch 0${episode}.mkv
      done
    popd > /dev/null
  done
  popd > /dev/null  
done

find app/fixtures
