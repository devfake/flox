# Flox-file-parser

Takes root directory and returns a JSON tree file.

```
tv
├── Game of Thrones
│   ├── s01
│   │   ├── 01.mkv
│   │   └── 02.mkv
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

    $ curl 127.0.0.1:3000/fetch_files

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
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s01/01.mkv"
            },
            {
              "extension": "mkv",
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s01/02.mkv"
            }
          ]
        },
        {
          "season_number": 2,
          "episodes": [
            {
              "extension": "mkv",
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s02/01.mkv"
            },
            {
              "extension": "mkv",
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s02/02.mkv"
            }
          ]
        }
      ]
    },
    {
      "title": "Game of Thrones",
      "seasons": [
        {
          "season_number": 1,
          "episodes": [
            {
              "extension": "mkv",
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s01/01.mkv"
            },
            {
              "extension": "mkv",
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s01/02.mkv"
            }
          ]
        },
        {
          "season_number": 2,
          "episodes": [
            {
              "extension": "mkv",
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s02/01.mkv"
            },
            {
              "extension": "mkv",
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s02/02.mkv"
            }
          ]
        }
      ]
    }
  ],
  "movies": {}
}
```
