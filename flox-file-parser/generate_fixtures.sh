#!/bin/bash

GOT="Game of Thrones"
BB="Breaking Bad"

# cleanup
mkdir -p app/fixtures
rm -rf app/fixtures/*

# tv
(
  cd app/fixtures
  mkdir tv && cd tv
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

# movies
WARCRAFT="Warcraft.2016.720p.WEB-DL"
STARWARS="StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
(
  cd app/fixtures
  mkdir movies && cd movies
  mkdir $WARCRAFT
  (
    cd "$WARCRAFT"
    touch "$WARCRAFT.mkv"
    touch "$WARCRAFT.srt"
  )

  mkdir "Star Wars"
  (
    cd "Star Wars"
    mkdir "StarWars Episode VI Return of The Jedi 1080p BDRip"
    (
      cd "StarWars Episode VI Return of The Jedi 1080p BDRip"
      touch "$STARWARS.mp4"
      mkdir "subtitles"
      (
        cd "subtitles"
        touch "$STARWARS.srt"
      )
    )
  )

  mkdir "Ignore.Movie.BDRip"
  (
    cd "Ignore.Movie.BDRip"
    touch "Ignore.Movie.unsupported.filetype.abc"
  )

)

find app/fixtures
