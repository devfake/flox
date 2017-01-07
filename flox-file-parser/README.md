# Flox-file-parser

Needs TV_ROOT and MOVIES_ROOT env variables to be set with an absolute path.
Takes root directory and returns a JSON tree file.

## install

    $ npm install (use 'npm run install:vagrant' on vagrant)
    $ cp database/config/config.js.example database/config/config.js
    $ npm run db:setup 

For demonstration purpose you can execute generate_fixtures.sh to generate some example data.

    $ sh generate_fixtures.sh

Set your movies and tv root

    $ export TV_ROOT="/vagrant/flox-file-parser/app/fixtures/tv"
    $ export MOVIES_ROOT="/vagrant/flox-file-parser/app/fixtures/movie"

then start the server with

    $ npm start

or with env variables

    $ FP_HOST=127.0.0.1 FP_PORT=3000 npm start
    $ FP_DATABASE=custom_db_name npm run db:setup
    $ FP_DATABASE=custom_db_name npm start

Possible env vars:

|  Env          |  Required  |  Desc                                     |  Default                      |
|:-------------:|:----------:|:-----------------------------------------:|:-----------------------------:|
|  MOVIES_ROOT  |  Yes       |  absolute path to your movie folder       |  -                            |
|  TV_ROOT      |  Yes       |  absolute path to your tv folder          |  -                            |
|  FP_HOST      |  No        |  host address for flox file parser        |  127.0.0.1                    |
|  FP_PORT      |  No        |  port for flox file parser                |  3000                         |
|  DB_USERNAME  |  No        |  the username to access the database      |  root                         |
|  DB_PASSWORD  |  No        |  the password used to access the database |  null                         |
|  FP_DATABASE  |  No        |  the database you want to use             |  flox_file_parser_development |

## tests

    $ NODE_ENV=test npm run db:setup
    $ npm test 

## usage

```
tv
├── Game of Thrones
│   ├── s01
│   │   ├── 01.mkv
│   │   ├── 01.srt
│   │   ├── 02.mp4
│   │   └── 02.srt
│   └── s02
│       ├── 01.mkv
│       └── 02.mkv
├── Breaking Bad
│   ├── s01
│   │   ├── 01.mkv
│   │   └── 02.mkv
│   └── s02
│       ├── 01.mkv
│       └── 02.mkv
```

    $ curl localhost:3000/fetch/movies

returns:
```json
[
  {
    "name": "starwars episode vi return of the jedi",
    "extension": "mp4",
    "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip",
    "src": "/vagrant/flox-file-parser/app/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
    "tags": [
      "hd",
      "1080p"
    ],
    "subtitles": []
  },
  {
    "name": "warcraft",
    "extension": "mkv",
    "filename": "Warcraft.2016.720p.WEB-DL",
    "src": "/vagrant/flox-file-parser/app/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
    "year": 2016,
    "tags": [
      "720p"
    ],
    "subtitles": [
      {
        "filename": "Warcraft.2016.720p.WEB-DL",
        "src": "/vagrant/flox-file-parser/app/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
        "extension": "srt"
      }
    ]
  }
]
```

    $ curl localhost:3000/fetch/tv

returns:
```json
[
  {
    "title": "Breaking Bad",
    "seasons": [
      {
        "season_number": 1,
        "episodes": [
          {
            "extension": "mkv",
            "filename": "1",
            "subtitles": [
              {
                "filename": "1",
                "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/1.srt",
                "extension": "srt"
              }
            ],
            "episode_number": 1,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/1.mkv"
          },
          {
            "extension": "mkv",
            "filename": "2",
            "subtitles": [
              {
                "filename": "2",
                "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/2.srt",
                "extension": "srt"
              }
            ],
            "episode_number": 2,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/2.mkv"
          }
        ]
      },
      {
        "season_number": 2,
        "episodes": [
          {
            "extension": "mp4",
            "filename": "1",
            "subtitles": [
              {
                "filename": "1",
                "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/1.srt",
                "extension": "srt"
              }
            ],
            "episode_number": 1,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/1.mp4"
          },
          {
            "extension": "mkv",
            "filename": "2",
            "subtitles": [
              {
                "filename": "2",
                "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/2.srt",
                "extension": "srt"
              }
            ],
            "episode_number": 2,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/2.mkv"
          }
        ]
      }
    ]
  },
  {
    "title": "Game of Thrones",
    "seasons": [
      {
        "season_number": 2,
        "episodes": [
          {
            "extension": "mkv",
            "filename": "1",
            "subtitles": [],
            "episode_number": 1,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/S2/1.mkv"
          },
          {
            "extension": "mkv",
            "filename": "2",
            "subtitles": [],
            "episode_number": 2,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/S2/2.mkv"
          }
        ]
      },
      {
        "season_number": 1,
        "episodes": [
          {
            "extension": "mkv",
            "filename": "1",
            "subtitles": [],
            "episode_number": 1,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s1/1.mkv"
          },
          {
            "extension": "mp4",
            "filename": "2",
            "subtitles": [],
            "episode_number": 2,
            "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s1/2.mp4"
          }
        ]
      }
    ]
  }
]
```

    $ curl 127.0.0.1:3000/fetch

Returns
```json
{
  "tv": [
    {
      "title": "Breaking Bad",
      "seasons": [
        {
          "season_number": 1,
          "episodes": [
            {
              "extension": "mkv",
              "filename": "1",
              "subtitles": [
                {
                  "filename": "1",
                  "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/1.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/1.mkv"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [
                {
                  "filename": "2",
                  "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/2.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/S1/2.mkv"
            }
          ]
        },
        {
          "season_number": 2,
          "episodes": [
            {
              "extension": "mp4",
              "filename": "1",
              "subtitles": [
                {
                  "filename": "1",
                  "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/1.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/1.mp4"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [
                {
                  "filename": "2",
                  "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/2.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s2/2.mkv"
            }
          ]
        }
      ]
    },
    {
      "title": "Game of Thrones",
      "seasons": [
        {
          "season_number": 2,
          "episodes": [
            {
              "extension": "mkv",
              "filename": "1",
              "subtitles": [],
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/S2/1.mkv"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [],
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/S2/2.mkv"
            }
          ]
        },
        {
          "season_number": 1,
          "episodes": [
            {
              "extension": "mkv",
              "filename": "1",
              "subtitles": [],
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s1/1.mkv"
            },
            {
              "extension": "mp4",
              "filename": "2",
              "subtitles": [],
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s1/2.mp4"
            }
          ]
        }
      ]
    }
  ],
  "movies": [
    {
      "name": "starwars episode vi return of the jedi",
      "extension": "mp4",
      "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip",
      "src": "/vagrant/flox-file-parser/app/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
      "tags": [
        "hd",
        "1080p"
      ],
      "subtitles": []
    },
    {
      "name": "warcraft",
      "extension": "mkv",
      "filename": "Warcraft.2016.720p.WEB-DL",
      "src": "/vagrant/flox-file-parser/app/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
      "year": 2016,
      "tags": [
        "720p"
      ],
      "subtitles": [
        {
          "filename": "Warcraft.2016.720p.WEB-DL",
          "src": "/vagrant/flox-file-parser/app/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
          "extension": "srt"
        }
      ]
    }
  ]
}
```
