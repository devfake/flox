import Parser from "./parser"
import { expect } from "chai"
import fs from "fs"
import path from "path"
import db from "../../database/models"
import fixturesResultFetch from "../fixtures/fixturesResultFetch"
import { execFile } from "child_process"

const file_history = db.sequelize.models.file_history

describe("Parser (tv)", () => {
  beforeEach(() => {
    process.env.TV_ROOT = undefined
    process.env.MOVIES_ROOT = undefined
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

    const filterMovies = {
      where: {
        category: "tv"
      }
    }

    beforeEach(() => {
      sandbox.spy(fs, "readdirSync")
      sandbox.spy(fs, "existsSync")
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")
      parser = new Parser
    })

    context("using tv fixtures", () => {
      it("calls fs.readdirSync with the expected path", () => {
        const result = parser.fetch()
        const normalizedTvPath = fs.realpathSync(path.normalize(tvPath))
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
              added: Date.now(),
              category: "tv"
            }
          })
        }
        const fh = file_history.bulkCreate(createEpisodes())

        return fh.then(() => {
          const { tv } = parser.fetch()

          return tv.then((res) => {
            return expect(file_history.count(filterMovies)).to.eventually.be.equal(8)
          })
        })        
      })
    })

    context("deleting files", () => {
      beforeEach(() => {
        const expectedTimestamp = Date.parse("01 Jan 2000")
        sandbox.stub(Date, "now").returns(expectedTimestamp)
        return parser.fetch().tv
      })

      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("should remove breaking bad", () => {
        const getBB = { where: { src: { $like: "%Breaking Bad%" }} }
        const getGOT = { where: { src: { $like: "%Game of Thrones%" }} }
        const getRemovedField = (rows) => rows.map((row) => row.removed)

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)

        fs.unlinkSync(fixturesResultFetch.expected_bb_s1_e1.src)
        fs.unlinkSync(fixturesResultFetch.expected_bb_s1_e2.src)
        fs.unlinkSync(fixturesResultFetch.expected_bb_s2_e1.src)
        fs.unlinkSync(fixturesResultFetch.expected_bb_s2_e2.src)

        const expectedResultBB = [expectedTime, expectedTime, expectedTime, expectedTime]
        const expectedResultGot = [null, null, null, null]

        const { tv } = parser.fetch()
        return tv.then((res) => {
          return Promise.all([
            expect(file_history.count(getBB)).to.eventually.be.equal(4),
            expect(file_history.findAll(getBB).then(getRemovedField)).to.eventually.be.eql(expectedResultBB),
            expect(file_history.findAll(getGOT).then(getRemovedField)).to.eventually.be.eql(expectedResultGot)
          ])
        })
      })

      it("should remove game of thrones when renaming the src file", () => {
        const getRemovedField = (row) => row.removed

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)
        const expectedNewSrc = fixturesResultFetch.expected_got_s1_e1.src.replace("mkv", "mp4")

        const getGOT = { where: { src: fixturesResultFetch.expected_got_s1_e1.src } }
        const getRenamedGOT = { where: { src: expectedNewSrc } }

        fs.renameSync(fixturesResultFetch.expected_got_s1_e1.src, expectedNewSrc)

        const { tv } = parser.fetch()

        return tv.then((res) => {
          return Promise.all([
            expect(file_history.count(getGOT)).to.be.eventually.equal(1),
            expect(file_history.findOne(getGOT).then(getRemovedField)).to.eventually.be.eql(expectedTime),
            expect(file_history.findOne(getRenamedGOT).then(getRemovedField)).to.eventually.be.null
          ])
        })
      })

      it("fetches a file which is already in db and marked as removed", () => {
        const getBB = { where: { src: fixturesResultFetch.expected_bb_s1_e1.src } }
        const getRemovedField = (row) => row.removed

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)

        fs.unlinkSync(fixturesResultFetch.expected_bb_s1_e1.src)
        const preprareDB = file_history.update({ removed: expectedTime }, { where: {
          src: fixturesResultFetch.expected_bb_s1_e1.src
        }})

        return preprareDB.then(() => {
          fs.writeFileSync(fixturesResultFetch.expected_bb_s1_e1.src, "")
          const { movies } = parser.fetch()

          return movies.then((res) => {
            return Promise.all([
              expect(file_history.count(getBB)).to.be.eventually.equal(2),
              expect(file_history.findOne(getBB).then(getRemovedField)).to.eventually.be.eql(expectedTime)
            ])
          })
        })
      })
    })
  })
})