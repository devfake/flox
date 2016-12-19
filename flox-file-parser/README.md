# Flox-file-parser

Takes root directory and returns a JSON tree file.

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
  "movies": {}
}
```
