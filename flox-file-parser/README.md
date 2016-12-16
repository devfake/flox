# Flox-file-parser

Takes root directory and returns a JSON tree file.

$ curl 127.0.0.1:3000/fetch_files

Returns
```json
{
  "tv": [
    {
      "title": "Breaking Bad",
      "seasons": [
        {
          "episodes": [
            {
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s01/01.mkv"
            },
            {
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s01/02.mkv"
            }
          ],
          "season_number": 1
        },
        {
          "episodes": [
            {
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s02/01.mkv"
            },
            {
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Breaking Bad/s02/02.mkv"
            }
          ],
          "season_number": 2
        }
      ]
    },
    {
      "title": "Game of Thrones",
      "seasons": [
        {
          "episodes": [
            {
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s01/01.mkv"
            },
            {
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s01/02.mkv"
            }
          ],
          "season_number": 1
        },
        {
          "episodes": [
            {
              "episode_number": 1,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s02/01.mkv"
            },
            {
              "episode_number": 2,
              "src": "/vagrant/flox-file-parser/app/fixtures/tv/Game of Thrones/s02/02.mkv"
            }
          ],
          "season_number": 2
        }
      ]
    }
  ],
  "movies": {}
}
```

Folder structure:
```
  - TV:
    +--+ Game of Thrones
    |  +--+ S01
    |     +-- 01.mp4
    |     +-- 02.mkv
    +--- Breaking Bad

  - Movies:
```
