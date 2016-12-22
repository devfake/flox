import Parser from "./parser"
import { expect } from "chai"
import fs from "fs"
import path from "path"

describe("Parser", () => {
  beforeEach(() => {
    process.env.TV_ROOT = undefined
    process.env.MOVIES_ROOT = undefined
  })

  it("exists", () => {
    const parser = new Parser
  })

  it("requires 2 env variables", () => {
    process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
    process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")

    const parser = new Parser
    expect(parser.fetch()).to.be.ok
  })

  describe(".fetch()", () => {
    let parser, result
    const rootPath = "./app/fixtures"
    const tvPath = rootPath + "/tv/"
    const game_of_thrones = "Game of Thrones", breaking_bad = "Breaking Bad"
    const got_seasons = ["s01", "s02"]
    const bb_seasons = ["s01", "s02"]
    const gotSeasonsPath = tvPath + game_of_thrones
    const bbSeasonsPath = tvPath + breaking_bad
    const absolutePath = path.normalize(__dirname + "/../")

    beforeEach(() => {
      sandbox.spy(fs, "readdirSync")
      sandbox.spy(fs, "existsSync")
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")
      parser = new Parser
    })

    it("has a fetch method", () => {
      expect(typeof parser.fetch).to.eql("function")
    })

    it("should take no params", () => {
      fs.readdirSync.restore()
      sandbox.stub(fs, "readdirSync").returns([])
      expect(parser.fetch.bind(null, "test")).to.throw()
    })

    it("returns a valid json object", () => {
      const result = parser.fetch()
      expect(typeof result).to.be.eql("object")
    })

    it("returns a object with only tv and movies key", () => {
      const result = parser.fetch()
      expect(Object.keys(result)).to.be.eql(["tv", "movies"])
    })

    context("using tv fixtures", () => {
      beforeEach(() => {
        result = parser.fetch()
      })

      it("calls fs.readdirSync with the expected call count and path", () => {
        const normalizedTvPath = fs.realpathSync(path.normalize(tvPath))
        expect(fs.readdirSync.callCount).to.equal(13)
        expect(fs.readdirSync.args[0][0]).to.equal(normalizedTvPath)
      })

      it("returns the found tv-series and puts it into tv", () => {
        expect(result.tv.length).to.be.equal(2)
        expect(result.tv[0].title).to.be.equal(breaking_bad)
        expect(result.tv[1].title).to.be.equal(game_of_thrones)
      })

      it("each tv serie has an array of seasons", () => {
        const got = result.tv.find((t) => t.title === game_of_thrones)
        const bb = result.tv.find((t) => t.title === breaking_bad)

        expect(Array.isArray(got.seasons)).to.be.true
        expect(Array.isArray(bb.seasons)).to.be.true
      })

      context("seasons", () => {
        let got, bb
        let got_s1, got_s2
        let bb_s1, bb_s2

        beforeEach(() => {
          got = result.tv.find((t) => t.title === game_of_thrones)
          bb = result.tv.find((t) => t.title === breaking_bad)

          got_s1 = got.seasons.find((e) => e.season_number === 1)
          got_s2 = got.seasons.find((e) => e.season_number === 2)
          bb_s1 = bb.seasons.find((e) => e.season_number === 1)
          bb_s2 = bb.seasons.find((e) => e.season_number === 2)
        })

        it("has 2 seasons in got and 2 in bb", () => {
          expect(got.seasons.length).to.be.equal(2)
          expect(bb.seasons.length).to.be.equal(2)
        })

        it("each season should be an object", () => {
          expect(typeof got_s1).to.be.equal("object")
          expect(typeof got_s2).to.be.equal("object")
          expect(typeof bb_s1).to.be.equal("object")
          expect(typeof bb_s2).to.be.equal("object")
        })

        it("each season should have a season_number property", () => {
          expect(got_s1).to.have.property("season_number", 1)
          expect(got_s2).to.have.property("season_number", 2)
          expect(bb_s1).to.have.property("season_number", 1)
          expect(bb_s2).to.have.property("season_number", 2)
        })

        it("each season should have an episodes property", () => {
          expect(got_s1).to.have.property("episodes")
          expect(got_s2).to.have.property("episodes")
          expect(bb_s1).to.have.property("episodes")
          expect(bb_s2).to.have.property("episodes")
        })

        context("episodes", () => {
          let got_s1_e1, got_s1_e2, got_s2_e1, got_s2_e2
          let bb_s1_e1, bb_s1_e2, bb_s2_e1, bb_s2_e2
          let episodes = []
          const absolutePath_got = absolutePath + "fixtures/tv/" + game_of_thrones
          const absolutePath_got_s1 = absolutePath_got + "/" + "s1"
          const absolutePath_got_s2 = absolutePath_got + "/" + "S2"
          const absolutePath_bb = absolutePath + "fixtures/tv/" + breaking_bad
          const absolutePath_bb_s1 = absolutePath_bb + "/" + "S1"
          const absolutePath_bb_s2 = absolutePath_bb + "/" + "s2"

          let paths = []

          beforeEach(() => {
            episodes = []
            paths = []

            paths.push(absolutePath_got_s1 + "/1.mkv")
            paths.push(absolutePath_got_s1 + "/2.mp4")
            paths.push(absolutePath_got_s2 + "/1.mkv")
            paths.push(absolutePath_got_s2 + "/2.mkv")
            paths.push(absolutePath_bb_s1 + "/1.mkv")
            paths.push(absolutePath_bb_s1 + "/2.mkv")
            paths.push(absolutePath_bb_s2 + "/1.mp4")
            paths.push(absolutePath_bb_s2 + "/2.mkv")

            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 1,
                hasSubtitles: false,
              },
              actual: {
                episode: got_s1.episodes[0]
              }
            })
            episodes.push({
              expected: {
                fileType: "mp4",
                episode_number: 2,
                hasSubtitles: false,
              },
              actual: {
                episode: got_s1.episodes[1]
              }
            })
            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 1,
                hasSubtitles: false,
              },
              actual: {
                episode: got_s2.episodes[0]
              }
            })
            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 2,
                hasSubtitles: false,
              },
              actual: {
                episode: got_s2.episodes[1]
              }
            })
            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 1,
                hasSubtitles: true,
              },
              actual: {
                episode: bb_s1.episodes[0]
              }
            })
            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 2,
                hasSubtitles: true,
              },
              actual: {
                episode: bb_s1.episodes[1]
              }
            })
            episodes.push({
              expected: {
                fileType: "mp4",
                episode_number: 1,
                hasSubtitles: true,
              },
              actual: {
                episode: bb_s2.episodes[0]
              }
            })
            episodes.push({
              expected: {
                fileType: "mkv",
                episode_number: 2,
                hasSubtitles: true,
              },
              actual: {
                episode: bb_s2.episodes[1]
              }
            })
          })

          it("each season should have 2 episodes", () => {
            expect(got_s1.episodes.length).to.be.equal(2)
            expect(got_s2.episodes.length).to.be.equal(2)
            expect(bb_s1.episodes.length).to.be.equal(2)
            expect(bb_s2.episodes.length).to.be.equal(2)
          })

          it("each episode is an object", () => {
            episodes.forEach(e => {
              expect(typeof e.actual.episode).to.be.equal("object")
            })
          })

          it("each episode has a property episde_number", () => {
            episodes.forEach(e => {
              expect(e.actual.episode).to.have.property("episode_number", e.expected.episode_number)
            })
          })

          it("each episode has a property extension", () => {
            episodes.forEach(e => {
              expect(e.actual.episode).to.have.property("extension", e.expected.fileType)
            })
          })

          it("each episode has a property src", () => {
            episodes.forEach((e, i) => {
              expect(e.actual.episode).to.have.property("src", paths[i]) 
            })
          })

          it("each episode has a property filename", () => {
            episodes.forEach((e, i) => {
              expect(e.actual.episode).to.have.property("filename", '' + e.expected.episode_number) 
            })
          })

          context("subtitles", () => {
            it("each episode has a property subtitles", () => {
              episodes.forEach(e => {
                expect(e.actual.episode).to.have.property("subtitles")
              })
            })

            it("each episode has the expected amount of subtitles", () => {
              episodes.forEach(e => {
                if (!e.expected.hasSubtitles) {
                  expect(e.actual.episode.subtitles.length).to.be.equal(0)
                } else {
                  expect(e.actual.episode.subtitles.length).to.be.equal(1)
                }
              })
            })

            it("each subtitle has the expected properties", () => {
              episodes.forEach(e => {
                if (!e.expected.hasSubtitles) return
                expect(e.actual.episode.subtitles[0].extension).to.exist
                expect(e.actual.episode.subtitles[0].src).to.exist
                expect(e.actual.episode.subtitles[0].filename).to.exist
              })
            })

            it("each subtitle has the same filename as the video", () => {
              episodes.forEach(e => {
                if (!e.expected.hasSubtitles) return
                expect(e.actual.episode.subtitles[0].filename).to.be.equal('' + e.expected.episode_number)
              })
            })

            it("each subtitle should have the right extension", () => {
              episodes.forEach(e => {
                if (!e.expected.hasSubtitles) return
                expect(e.actual.episode.subtitles[0].extension).to.be.equal("srt")
              })
            })

            it("each subtitle should have the right src", () => {
              episodes.forEach(e => {
                if (!e.expected.hasSubtitles) return
                const srcMatch = "^" + absolutePath + ".+\.srt"
                expect(e.actual.episode.subtitles[0].src).to.match(new RegExp(srcMatch))
              })
            })

            it("should check if subtitles exist", () => {
              expect(fs.existsSync.callCount).to.be.equal(10)
            })
          })
        })
      })
    })

    context("using movie fixtures", () => {
      let movies
      let expectedStarWarsResult, expectedWarcraftResult
      let absoluteMoviePath = absolutePath + "fixtures/movies"

      beforeEach(() => {
        expectedStarWarsResult = {
          name: "starwars episode vi return of the jedi",
          extension: "mp4",
          tags: ["hd", "1080p"],
          year: undefined,
          filename: "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip",
          src: absoluteMoviePath + "/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
          subtitles: []
        }
        expectedWarcraftResult = {
          name: "warcraft",
          extension: "mkv",
          filename: "Warcraft.2016.720p.WEB-DL",
          tags: ["720p"],
          src: absoluteMoviePath + "/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
          year: 2016,
          subtitles: [{
            src: absoluteMoviePath + "/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
            filename: "Warcraft.2016.720p.WEB-DL",
            extension: "srt"
          }]
        }
        movies = []
        result = parser.fetch()
      })

      it("returns movies as an array", () => {
        expect(result.movies).to.be.a("array")
      })

      it("should contain 2 movies", () => {
        expect(result.movies.length).to.be.equal(2)
      })

      it("each movie is a object", () => {
        expect(result.movies[0]).to.be.a("object")
        expect(result.movies[1]).to.be.a("object")
      })

      it("each movie has the expected property keys", () => {
        expect(result.movies[0].subtitles).to.be.a("array")
        expect(result.movies[1].subtitles).to.be.a("array")
        expect(result.movies[0].extension).to.be.a("string")
        expect(result.movies[1].extension).to.be.a("string")
        expect(result.movies[0].filename).to.be.a("string")
        expect(result.movies[1].filename).to.be.a("string")
        expect(result.movies[0].src).to.be.a("string")
        expect(result.movies[1].src).to.be.a("string")
        expect(result.movies[0].name).to.be.a("string")
        expect(result.movies[1].name).to.be.a("string")
        expect(result.movies[0].tags).to.be.a("array")
        expect(result.movies[1].tags).to.be.a("array")
        expect(result.movies[0].year).to.be.a("undefined")
        expect(result.movies[1].year).to.be.a("number")
      })

      it("should contain all data for Star Wars", () => {
        const resultSw = result.movies[0]

        expect(resultSw.name).to.be.equal(expectedStarWarsResult.name)
        expect(resultSw.extension).to.be.equal(expectedStarWarsResult.extension)
        expect(resultSw.filename).to.be.equal(expectedStarWarsResult.filename)
        expect(resultSw.src).to.be.equal(expectedStarWarsResult.src)
        expect(resultSw.year).to.be.equal(expectedStarWarsResult.year)
        expect(resultSw.tags).to.be.deep.equal(expectedStarWarsResult.tags)
        expect(resultSw.subtitles).to.be.deep.equal(expectedStarWarsResult.subtitles)
      })

      it("should contain all data for Warcraft", () => {
        const resultWc = result.movies[1]

        expect(resultWc.name).to.be.equal(expectedWarcraftResult.name)
        expect(resultWc.extension).to.be.equal(expectedWarcraftResult.extension)
        expect(resultWc.filename).to.be.equal(expectedWarcraftResult.filename)
        expect(resultWc.src).to.be.equal(expectedWarcraftResult.src)
        expect(resultWc.year).to.be.equal(expectedWarcraftResult.year)
        expect(resultWc.tags).to.be.deep.equal(expectedWarcraftResult.tags)
        expect(resultWc.subtitles).to.be.deep.equal(expectedWarcraftResult.subtitles)
      })
    })
  })

  describe(".normalizeNumber()", () => {
    beforeEach(() => {
      sandbox.spy(Parser, "normalizeNumber")
    })

    it("exists", () => {
      Parser.normalizeNumber()
    })

    it("returns number", () => {
      const result = Parser.normalizeNumber()
      expect(typeof result).to.be.equal("number")
    })

    it("takes a string as argument", () => {
      const result = Parser.normalizeNumber("0")
      expect(Parser.normalizeNumber.firstCall.args.length).to.be.not.equal(0)
      expect(typeof Parser.normalizeNumber.firstCall.args[0]).to.be.equal("string")
    })

    it("returns the expected output", () => {
      const result =  []
      result.push(
        {
          result: Parser.normalizeNumber("s01"),
          expected: 1
        },
        {
          result: Parser.normalizeNumber("S02"),
          expected: 2
        },
        {
          result: Parser.normalizeNumber("s003"),
          expected: 3
        },
        {
          result: Parser.normalizeNumber("S0020"),
          expected: 20
        },
        {
          result: Parser.normalizeNumber("s0"),
          expected: 0
        },
        {
          result: Parser.normalizeNumber("01"),
          expected: 1
        },
        {
          result: Parser.normalizeNumber("01s"),
          expected: 1
        },
        {
          result: Parser.normalizeNumber("s01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber("S01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber("sS01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber("sdfdsgsS01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber("/S01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber(".S01s"),
          expected: 1
        }, 
        {
          result: Parser.normalizeNumber(""),
          expected: -1
        }, 
        {
          result: Parser.normalizeNumber("s"),
          expected: -1
        }, 
        {
          result: Parser.normalizeNumber("01.mkv"),
          expected: 1
        }, 
      )
      result.forEach((item) => {
        expect(item.result).to.be.equal(item.expected)
      })
    })
  })
})
