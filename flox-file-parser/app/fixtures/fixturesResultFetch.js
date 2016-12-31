var fetch = module.exports.fetch = {
  "tv": [
    {
      "tv_title": "Breaking Bad",
      "season_number": 1,
      "episode_number": 1,
      "extension": "mkv",
      "year": null,
      "filename": "1",
      "tags": [],
      "subtitles": __dirname + "/tv/Breaking Bad/S1/1.srt",
      "src": __dirname + "/tv/Breaking Bad/S1/1.mkv"
    },
    {
      "tv_title": "Breaking Bad",
      "season_number": 1,
      "episode_number": 2,
      "extension": "mkv",
      "tags": [],
      "filename": "2",
      "year": null,
      "subtitles": __dirname + "/tv/Breaking Bad/S1/2.srt",
      "src": __dirname + "/tv/Breaking Bad/S1/2.mkv"
    },
    {
      "tv_title": "Breaking Bad",
      "season_number": 2,
      "episode_number": 1,
      "extension": "mp4",
      "tags": [],
      "year": null,
      "filename": "1",
      "subtitles": __dirname + "/tv/Breaking Bad/s2/1.srt",
      "src": __dirname + "/tv/Breaking Bad/s2/1.mp4"
    },
    {
      "tv_title": "Breaking Bad",
      "season_number": 2,
      "episode_number": 2,
      "tags": [],
      "extension": "mkv",
      "year": null,
      "filename": "2",
      "subtitles": __dirname + "/tv/Breaking Bad/s2/2.srt",
      "src": __dirname + "/tv/Breaking Bad/s2/2.mkv"
    },
    {
      "tv_title": "Game of Thrones",
      "season_number": 2,
      "episode_number": 1,
      "extension": "mkv",
      "tags": [],
      "year": null,
      "filename": "1",
      "subtitles": null,
      "src": __dirname + "/tv/Game of Thrones/S2/1.mkv"
    },
    {
      "tv_title": "Game of Thrones",
      "season_number": 2,
      "episode_number": 2,
      "tags": [],
      "extension": "mkv",
      "year": null,
      "filename": "2",
      "subtitles": null,
      "src": __dirname + "/tv/Game of Thrones/S2/2.mkv"
    },
    {
      "tv_title": "Game of Thrones",
      "season_number": 1,
      "episode_number": 1,
      "extension": "mkv",
      "filename": "1",
      "tags": [],
      "subtitles": null,
      "year": null,
      "src": __dirname + "/tv/Game of Thrones/s1/1.mkv"
    },
    {
      "tv_title": "Game of Thrones",
      "season_number": 1,
      "tags": [],
      "episode_number": 2,
      "extension": "mp4",
      "filename": "2",
      "year": null,
      "subtitles": null,
      "src": __dirname + "/tv/Game of Thrones/s1/2.mp4"
    },
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
      "year": null,
      "subtitles": null
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
      "subtitles": __dirname + "/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
    }
  ]
}

var expectedTv = module.exports.expectedTv = fetch.tv
var expectedMovies = module.exports.expectedMovies = fetch.movies

var expected_bb_s1_e1 = module.exports.expected_bb_s1_e1 = expectedTv[0]
var expected_bb_s1_e2 = module.exports.expected_bb_s1_e2 = expectedTv[1]
var expected_bb_s2_e1 = module.exports.expected_bb_s2_e1 = expectedTv[2]
var expected_bb_s2_e2 = module.exports.expected_bb_s2_e2 = expectedTv[3]

var expected_got_s1_e1 = module.exports.expected_got_s1_e1 = expectedTv[4]
var expected_got_s1_e2 = module.exports.expected_got_s1_e2 = expectedTv[5]
var expected_got_s2_e1 = module.exports.expected_got_s2_e1 = expectedTv[6]
var expected_got_s2_e2 = module.exports.expected_got_s2_e2 = expectedTv[7]

var expected_got_seasons = module.exports.expected_got_seasons = 2
var expected_bb_seasons = module.exports.expected_bb_seasons = 2

var expected_sw = module.exports.expected_sw = expectedMovies[0]
var expected_wc = module.exports.expected_wc = expectedMovies[1]

