import Parser from "./parser"
import { expect } from "chai"
import fs from "fs"
import path from "path"
import db from "../../database/models"
import fixturesResultFetch from "../fixtures/fixturesResultFetch"

const file_history = db.sequelize.models.file_history

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
      const filterMovies = {
        where: {
          src: { 
            $and: [
              { $ne: fixturesResultFetch.expected_wc.src },
              { $ne: fixturesResultFetch.expected_sw.src }
            ]
          } 
        }
      }

      context("database", () => {
        it("should have 8 entries", () => {
          const { tv } = parser.fetch()

          return tv.then(() => {
            return expect(file_history.count(filterMovies)).to.eventually.be.equal(fixturesResultFetch.allEpisodes.length)
          })
        })

        it("each episode should be successfully saved with their expected src", () => {
          const { tv } = parser.fetch()

          return tv.then(() => {
            const expectedSrc = fixturesResultFetch.allEpisodes.map((e) => e.src).sort()
            const getSrc = (rows) => rows.map((e) => e.src).sort()

            return expect(file_history.findAll(filterMovies).then(getSrc)).to.eventually.be.eql(expectedSrc)
          })
        })

        it("should wait until each result is successfully saved", () => {
          let expectedToBeResolved = false

          sandbox.stub(file_history, "findOrCreate", () => { 
            return new Promise((res, rej) => { 
              setTimeout(() => {
                expectedToBeResolved = true
                res()
              }, 1000) 
            })
          })

          const { tv } = parser.fetch()
          return tv.then((res) => {
            return expect(expectedToBeResolved).to.be.true
          })
        })

        it("should save the current time in 'added'", () => {
          const getAdded = (rows) => rows.map((e) => e.added)

          const expectedTimestamp = Date.parse("01 Jan 2000")
          const expectedTime = new Date(expectedTimestamp)
          const expectedAdded = fixturesResultFetch.allEpisodes.map((e) => expectedTime)

          sandbox.stub(Date, "now").returns(expectedTimestamp)

          const { tv } = parser.fetch()

          return tv.then(() => {
            return expect(file_history.findAll(filterMovies).then(getAdded)).to.eventually.be.eql(expectedAdded)
          })
        })

        it("should left 'removed' as null", () => {
          const expectedTimestamp = Date.parse("01 Jan 2000")
          const expectedTime = new Date(expectedTimestamp)
          const getRemoved = (rows) => rows.map((e) => e.removed)
          const expectedResult = fixturesResultFetch.allEpisodes.map(() => null)

          sandbox.stub(Date, "now").returns(expectedTimestamp)

          const { tv } = parser.fetch()

          return tv.then(() => {
            return expect(file_history.findAll(filterMovies).then(getRemoved)).to.eventually.be.eql(expectedResult)
          })

        })

        it("should not insert into db if the src already exists", () => {
          const createEpisodes = () => {
            return fixturesResultFetch.allEpisodes.map((e) => {
              return { 
                src: e.src,
                added: Date.now()
              }
            })
          }
          const fh = file_history.bulkCreate(createEpisodes())

          return fh.then(() => {
            const { tv } = parser.fetch()

            return tv.then(() => {
              return expect(file_history.count(filterMovies)).to.eventually.be.equal(8)
            })
          })        
        })
      })

      it("calls fs.readdirSync with the expected call count and path", () => {
        const result = parser.fetch()
        const normalizedTvPath = fs.realpathSync(path.normalize(tvPath))
        expect(fs.readdirSync.callCount).to.equal(13)
        expect(fs.readdirSync.args[0][0]).to.equal(normalizedTvPath)
      })

      it("returns the found tv-series and puts it into tv", () => {
        const { tv } = parser.fetch()

        return tv.then((res) => {
          expect(res.length).to.be.equal(fixturesResultFetch.expectedTv.length)
          expect(res[0].title).to.be.equal(breaking_bad)
          expect(res[1].title).to.be.equal(game_of_thrones)
        })
      })

      it("each tv serie has an array of seasons", () => {
        const { tv } = parser.fetch()

        return tv.then((res) => {
          const got = res.find((t) => t.title === game_of_thrones)
          const bb = res.find((t) => t.title === breaking_bad)

          expect(Array.isArray(got.seasons)).to.be.true
          expect(Array.isArray(bb.seasons)).to.be.true
        })
      })

      context("seasons", () => {
        let got, bb
        let got_s1, got_s2
        let bb_s1, bb_s2

        beforeEach(() => {
          result = parser.fetch()

          return result.tv.then((res) => {
            got = res.find((t) => t.title === game_of_thrones)
            bb = res.find((t) => t.title === breaking_bad)

            got_s1 = got.seasons.find((e) => e.season_number === 1)
            got_s2 = got.seasons.find((e) => e.season_number === 2)
            bb_s1 = bb.seasons.find((e) => e.season_number === 1)
            bb_s2 = bb.seasons.find((e) => e.season_number === 2)
          })
        })

        it("has 2 seasons in got and 2 in bb", () => {
          return result.tv.then(() => {
            expect(got.seasons.length).to.be.equal(fixturesResultFetch.expected_got.seasons.length)
            expect(bb.seasons.length).to.be.equal(fixturesResultFetch.expected_bb.seasons.length)
          })
        })

        it("each season should be an object", () => {
          expect(typeof got_s1).to.be.equal("object")
          expect(typeof got_s2).to.be.equal("object")
          expect(typeof bb_s1).to.be.equal("object")
          expect(typeof bb_s2).to.be.equal("object")
        })

        it("each season should have a season_number property", () => {
          expect(got_s1).to.have.property("season_number", fixturesResultFetch.expected_got_s1.season_number)
          expect(got_s2).to.have.property("season_number", fixturesResultFetch.expected_got_s2.season_number)
          expect(bb_s1).to.have.property("season_number", fixturesResultFetch.expected_bb_s1.season_number)
          expect(bb_s2).to.have.property("season_number", fixturesResultFetch.expected_bb_s2.season_number)
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

            episodes.push({
              expected: fixturesResultFetch.expected_got_s1_e1,
              actual: {
                episode: got_s1.episodes[0]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_got_s1_e2,
              actual: {
                episode: got_s1.episodes[1]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_got_s2_e1,
              actual: {
                episode: got_s2.episodes[0]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_got_s2_e2,
              actual: {
                episode: got_s2.episodes[1]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_bb_s1_e1,
              actual: {
                episode: bb_s1.episodes[0]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_bb_s1_e2,
              actual: {
                episode: bb_s1.episodes[1]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_bb_s2_e1,
              actual: {
                episode: bb_s2.episodes[0]
              }
            })
            episodes.push({
              expected: fixturesResultFetch.expected_bb_s2_e2,
              actual: {
                episode: bb_s2.episodes[1]
              }
            })
          })

          it("each season should have 2 episodes", () => {
            expect(got_s1.episodes.length).to.be.equal(fixturesResultFetch.expected_got_s1.episodes.length)
            expect(got_s2.episodes.length).to.be.equal(fixturesResultFetch.expected_got_s2.episodes.length)
            expect(bb_s1.episodes.length).to.be.equal(fixturesResultFetch.expected_bb_s1.episodes.length)
            expect(bb_s2.episodes.length).to.be.equal(fixturesResultFetch.expected_bb_s2.episodes.length)
          })

          it("each episode is an object", () => {
            episodes.forEach(e => {
              expect(typeof e.actual.episode).to.be.equal("object")
            })
          })

          it("each episode has a property episode_number", () => {
            episodes.forEach(e => {
              expect(e.actual.episode).to.have.property("episode_number", e.expected.episode_number)
            })
          })

          it("each episode has a property extension", () => {
            episodes.forEach(e => {
              expect(e.actual.episode).to.have.property("extension", e.expected.extension)
            })
          })

          it("each episode has a property src", () => {
            episodes.forEach((e, i) => {
              expect(e.actual.episode).to.have.property("src", e.expected.src) 
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
                expect(e.actual.episode.subtitles.length).to.be.equal(e.expected.subtitles.length)
                  .and.be.below(2) //currently max one subtitle supported
              })
            })

            it("each subtitle has the same filename as the video", () => {
              episodes.forEach(e => {
                if (!e.actual.subtitles) return
                expect(e.actual.episode.subtitles[0].filename).to.be.equal(e.expected.subtitles[0].filename)
              })
            })

            it("each subtitle should have the right extension", () => {
              episodes.forEach(e => {
                if (!e.actual.subtitles) return
                expect(e.actual.episode.subtitles[0].extension).to.be.equal(e.expected.subtitles[0].extension)
              })
            })

            it("each subtitle should have the right src", () => {
              episodes.forEach(e => {
                if (!e.actual.subtitles) return
                expect(e.actual.episode.subtitles[0].src).to.be.equal(e.expected.subtitles[0].src)
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
      let absoluteMoviePath = absolutePath + "fixtures/movies"

      it("returns movies as an array", () => {
        const result = parser.fetch()
        return expect(result.movies).to.be.eventually.a("array")
      })

      it("should contain 2 movies", () => {
        const result = parser.fetch()
        return expect(result.movies).to.be.eventually.have.lengthOf(fixturesResultFetch.expectedMovies.length)
      })

      it("each movie is a object", () => {
        const result = parser.fetch()
        return Promise.all([
          expect(result.movies.then((m) => m[0])).to.be.eventually.a("object"),
          expect(result.movies.then((m) => m[1])).to.be.eventually.a("object")
        ])
      })

      it("each movie has the expected property keys", () => {
        const result = parser.fetch()
        return Promise.all([
          expect(result.movies.then((m) => m[0].subtitles)).to.be.eventually.a("array"),
          expect(result.movies.then((m) => m[1].subtitles)).to.be.eventually.a("array"),
          expect(result.movies.then((m) => m[0].extension)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[1].extension)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[0].filename)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[1].filename)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[0].src)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[1].src)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[0].name)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[1].name)).to.be.eventually.a("string"),
          expect(result.movies.then((m) => m[0].tags)).to.be.eventually.a("array"),
          expect(result.movies.then((m) => m[1].tags)).to.be.eventually.a("array"),
          expect(result.movies.then((m) => m[0].year)).to.be.eventually.a("undefined"),
          expect(result.movies.then((m) => m[1].year)).to.be.eventually.a("number")
        ])
      })

      it("should contain all data for Star Wars", () => {
        const result = parser.fetch()
        return Promise.all([
          expect(result.movies.then((m) => m[0].name)).to.be.eventually.equal(fixturesResultFetch.expected_sw.name),
          expect(result.movies.then((m) => m[0].extension)).to.be.eventually.equal(fixturesResultFetch.expected_sw.extension),
          expect(result.movies.then((m) => m[0].filename)).to.be.eventually.equal(fixturesResultFetch.expected_sw.filename),
          expect(result.movies.then((m) => m[0].src)).to.be.eventually.equal(fixturesResultFetch.expected_sw.src),
          expect(result.movies.then((m) => m[0].year)).to.be.eventually.equal(fixturesResultFetch.expected_sw.year),
          expect(result.movies.then((m) => m[0].tags)).to.be.eventually.deep.equal(fixturesResultFetch.expected_sw.tags),
          expect(result.movies.then((m) => m[0].subtitles)).to.be.eventually.deep.equal(fixturesResultFetch.expected_sw.subtitles)
        ])
      })

      it("should contain all data for Warcraft", () => {
        const result = parser.fetch()
        return Promise.all([
          expect(result.movies.then((m) => m[1].name)).to.be.eventually.equal(fixturesResultFetch.expected_wc.name),
          expect(result.movies.then((m) => m[1].extension)).to.be.eventually.equal(fixturesResultFetch.expected_wc.extension),
          expect(result.movies.then((m) => m[1].filename)).to.be.eventually.equal(fixturesResultFetch.expected_wc.filename),
          expect(result.movies.then((m) => m[1].src)).to.be.eventually.equal(fixturesResultFetch.expected_wc.src),
          expect(result.movies.then((m) => m[1].year)).to.be.eventually.equal(fixturesResultFetch.expected_wc.year),
          expect(result.movies.then((m) => m[1].tags)).to.be.eventually.deep.equal(fixturesResultFetch.expected_wc.tags),
          expect(result.movies.then((m) => m[1].subtitles)).to.be.eventually.deep.equal(fixturesResultFetch.expected_wc.subtitles)
        ])
      })

      context("database", () => {
        const filterTv = {
          where: {
            src: {
              $or: [
                fixturesResultFetch.expected_sw.src,
                fixturesResultFetch.expected_wc.src
              ]
            }
          }
        }

        it("should have 2 entries", () => {
          const { movies } = parser.fetch()
          return movies.then((res) => {
            return expect(file_history.count(filterTv)).to.be.eventually.equal(fixturesResultFetch.expectedMovies.length)
          })
        })

        it("firstCall should save the expected src", () => {
          const result = parser.fetch()
          const expectedSrc = fixturesResultFetch.expected_sw.src

          return result.movies.then((res) => {
            const result = file_history.findOne({
              where: {
                src: expectedSrc
              }
            })
            return expect(result).to.eventually.have.deep.property("dataValues.src", expectedSrc)
          })
        })

        it("secondCall should save the expected src", () => {
          const expectedSrc = fixturesResultFetch.expected_wc.src
          const result = parser.fetch()

          return result.movies.then((res) => {
            const result = file_history.findOne({
              where: {
                src: expectedSrc
              }
            })

            return expect(result).to.eventually.have.deep.property("dataValues.src", expectedSrc)
          })
        })

        it("should wait until each result is successfully saved", () => {
          let expectedToBeResolved = false

          sandbox.stub(file_history, "findOrCreate", () => { 
            return new Promise((res, rej) => { 
              setTimeout(() => {
                expectedToBeResolved = true
                res()
              }, 1000) 
            })
          })

          const result = parser.fetch()
          return result.movies.then((res) => {
            return expect(expectedToBeResolved).to.be.true
          })
        })

        it("should save the current time in 'added'", () => {
          const srcSw = fixturesResultFetch.expected_sw.src
          const srcWc = fixturesResultFetch.expected_wc.src

          const expectedTimestamp = Date.parse("01 Jan 2000")
          const expectedTime = new Date(expectedTimestamp)

          sandbox.stub(Date, "now").returns(expectedTimestamp)

          const result = parser.fetch()

          return result.movies.then(() => {
            return Promise.all([
              expect(file_history.findOne({where: {src: srcSw}}).then((r) => r.added)).to.eventually.be.eql(expectedTime),
              expect(file_history.findOne({where: {src: srcWc}}).then((r) => r.added)).to.eventually.be.eql(expectedTime),
            ])
          })
        })

        it("should left 'removed' as null", () => {
          const srcSw = fixturesResultFetch.expected_sw.src
          const srcWc = fixturesResultFetch.expected_wc.src

          const expectedTimestamp = Date.parse("01 Jan 2000")
          const expectedTime = new Date(expectedTimestamp)

          sandbox.stub(Date, "now").returns(expectedTimestamp)

          const result = parser.fetch()

          return result.movies.then(() => {
            return Promise.all([
              expect(file_history.findOne({where: {src: srcSw}}).then((r) => r.removed)).to.eventually.be.eql(null),
              expect(file_history.findOne({where: {src: srcWc}}).then((r) => r.removed)).to.eventually.be.eql(null),
            ])
          })
        })

        it("should not insert into db if the src already exists", () => {
          const srcSw = fixturesResultFetch.expected_sw.src
          const srcWc = fixturesResultFetch.expected_wc.src

          return Promise.all([
            file_history.create({src: srcSw, added: Date.now()}),
            file_history.create({src: srcWc, added: Date.now()}),
          ]).then(() => {
            const result = parser.fetch()
            return result.movies.then(() => {
              return Promise.all([
                expect(file_history.count(filterTv)).to.eventually.be.equal(2)
              ])
            })
          })        
        })
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
