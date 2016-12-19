#!/bin/bash

GOT="Game of Thrones"
BB="Breaking Bad"

# cleanup
mkdir -p app/fixtures
rm -rf app/fixtures/*

mkdir app/fixtures/tv
mkdir app/fixtures/movies

# tv
(
  cd app/fixtures/tv 
  mkdir "$GOT"
  (
    cd "$GOT"
    mkdir s1
    (
      cd s1
      touch 1.mkv
      touch 2.mp4
    )
    mkdir S2
    (
      cd S2
      touch 1.mkv
      touch 2.mkv
    )
  )

  mkdir "$BB"
  (
    cd "$BB"
    mkdir S1
    (
      cd S1
      touch 1.mkv
      touch 1.srt
      touch 2.mkv
      touch 2.srt
    )
    mkdir s2
    (
      cd s2
      touch 1.mp4
      touch 1.srt
      touch 2.mkv
      touch 2.srt
    )
  )
)

find app/fixtures
