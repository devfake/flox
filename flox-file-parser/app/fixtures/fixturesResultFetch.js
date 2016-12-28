var fetch = module.exports.fetch = {
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
                  "src": __dirname + "/tv/Breaking Bad/S1/1.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 1,
              "src": __dirname + "/tv/Breaking Bad/S1/1.mkv"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [
                {
                  "filename": "2",
                  "src": __dirname + "/tv/Breaking Bad/S1/2.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 2,
              "src": __dirname + "/tv/Breaking Bad/S1/2.mkv"
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
                  "src": __dirname + "/tv/Breaking Bad/s2/1.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 1,
              "src": __dirname + "/tv/Breaking Bad/s2/1.mp4"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [
                {
                  "filename": "2",
                  "src": __dirname + "/tv/Breaking Bad/s2/2.srt",
                  "extension": "srt"
                }
              ],
              "episode_number": 2,
              "src": __dirname + "/tv/Breaking Bad/s2/2.mkv"
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
              "src": __dirname + "/tv/Game of Thrones/S2/1.mkv"
            },
            {
              "extension": "mkv",
              "filename": "2",
              "subtitles": [],
              "episode_number": 2,
              "src": __dirname + "/tv/Game of Thrones/S2/2.mkv"
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
              "src": __dirname + "/tv/Game of Thrones/s1/1.mkv"
            },
            {
              "extension": "mp4",
              "filename": "2",
              "subtitles": [],
              "episode_number": 2,
              "src": __dirname + "/tv/Game of Thrones/s1/2.mp4"
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
      "src": __dirname + "/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
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
      "src": __dirname + "/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
      "year": 2016,
      "tags": [
        "720p"
      ],
      "subtitles": [
        {
          "filename": "Warcraft.2016.720p.WEB-DL",
          "src": __dirname + "/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
          "extension": "srt"
        }
      ]
    }
  ]
}

var expectedTv = module.exports.expectedTv = fetch.tv
var expectedMovies = module.exports.expectedMovies = fetch.movies

var expected_bb = module.exports.expected_bb = expectedTv[0]
var expected_got = module.exports.expected_got = expectedTv[1]

var expected_bb_s1 = module.exports.expected_bb_s1 = expected_bb.seasons[0]
var expected_bb_s2 = module.exports.expected_bb_s2 = expected_bb.seasons[1]

var expected_got_s1 = module.exports.expected_got_s1 = expected_got.seasons[1]
var expected_got_s2 = module.exports.expected_got_s2 = expected_got.seasons[0]

var expected_bb_s1_e1 = module.exports.expected_bb_s1_e1 = expected_bb_s1.episodes[0]
var expected_bb_s1_e2 = module.exports.expected_bb_s1_e2 = expected_bb_s1.episodes[1]
var expected_bb_s2_e1 = module.exports.expected_bb_s2_e1 = expected_bb_s2.episodes[0]
var expected_bb_s2_e2 = module.exports.expected_bb_s2_e2 = expected_bb_s2.episodes[1]

var expected_got_s1_e1 = module.exports.expected_got_s1_e1 = expected_got_s1.episodes[0]
var expected_got_s1_e2 = module.exports.expected_got_s1_e2 = expected_got_s1.episodes[1]
var expected_got_s2_e1 = module.exports.expected_got_s2_e1 = expected_got_s2.episodes[0]
var expected_got_s2_e2 = module.exports.expected_got_s2_e2 = expected_got_s2.episodes[1]

var allEpisodes = module.exports.allEpisodes = [
  expected_bb_s1_e1,
  expected_bb_s1_e2,
  expected_bb_s2_e1,
  expected_bb_s2_e2,
  expected_got_s1_e1,
  expected_got_s1_e2,
  expected_got_s2_e1,
  expected_got_s2_e2,
]

var expected_sw = module.exports.expected_sw = expectedMovies[0]
var expected_wc = module.exports.expected_wc = expectedMovies[1]

