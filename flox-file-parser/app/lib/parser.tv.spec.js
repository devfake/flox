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
          res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
            expect(episode.tv_title).to.be.equal(fixturesResultFetch.expectedTv[index].tv_title)
          })
        })
      })

      it("should return the expected episodes", () => {
        const { tv } = parser.fetch()

        return tv.then((result) => {
          result.sort((a, b) => a.src > b.src).forEach((tv, index) => {
            const expectedTv = fixturesResultFetch.expectedTv[index]

            expect(tv).to.be.deep.equal(expectedTv)
          })
        })

      })

      it("each tv episode has the expected season number", () => {
        const { tv } = parser.fetch()

        return tv.then((res) => {
          res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
            const expectedEpisode = fixturesResultFetch.expectedTv[index] 
            expect(episode.season_number).to.be.eql(expectedEpisode.season_number)
          })
        })
      })

      context("seasons", () => {
        let got, bb
        let got_s1, got_s2
        let bb_s1, bb_s2
        let got_seasons, bb_seasons

        beforeEach(() => {
          result = parser.fetch()

          return result.tv.then((res) => {
            got = res.filter((t) => t.tv_title === game_of_thrones)
            bb = res.filter((t) => t.tv_title === breaking_bad)

            got_s1 = got.filter((e) => e.season_number === 1)
            got_s2 = got.filter((e) => e.season_number === 2)
            bb_s1 = bb.filter((e) => e.season_number === 1)
            bb_s2 = bb.filter((e) => e.season_number === 2)

            got_seasons = got.map(e => e.season_number).filter((e, index, self) => {
              return index == self.indexOf(e)
            })
            bb_seasons = bb.map(e => e.season_number).filter((e, index, self) => {
              return index == self.indexOf(e)
            })
          })
        })

        it("has 2 seasons in got and 2 in bb", () => {
          return result.tv.then(() => {
            expect(got_seasons.length).to.be.equal(fixturesResultFetch.expected_got_seasons)
            expect(bb_seasons.length).to.be.equal(fixturesResultFetch.expected_bb_seasons)
          })
        })

        it("each season should be an array", () => {
          expect(got_s1).to.be.a("array")
          expect(got_s2).to.be.a("array")
          expect(bb_s1).to.be.a("array")
          expect(bb_s2).to.be.a("array")
        })

        it("each episode should have a season_number property", () => {
          return result.tv.then((res) => {
            res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
              const expectedEpisode = fixturesResultFetch.expectedTv[index]
              expect(episode).to.have.property("season_number", expectedEpisode.season_number)
            })
          })
        })

        context("episodes", () => {
          let got_s1_e1, got_s1_e2, got_s2_e1, got_s2_e2
          let bb_s1_e1, bb_s1_e2, bb_s2_e1, bb_s2_e2
          const absolutePath_got = absolutePath + "fixtures/tv/" + game_of_thrones
          const absolutePath_got_s1 = absolutePath_got + "/" + "s1"
          const absolutePath_got_s2 = absolutePath_got + "/" + "S2"
          const absolutePath_bb = absolutePath + "fixtures/tv/" + breaking_bad
          const absolutePath_bb_s1 = absolutePath_bb + "/" + "S1"
          const absolutePath_bb_s2 = absolutePath_bb + "/" + "s2"

          it("each season should have 2 episodes", () => {
            expect(got_s1.length).to.be.equal(2)
            expect(got_s2.length).to.be.equal(2)
            expect(bb_s1.length).to.be.equal(2)
            expect(bb_s2.length).to.be.equal(2)
          })

          it("each episode is an object", () => {
            return result.tv.then((res) => {
              res.forEach((episode) => {
                expect(episode).to.be.a("object")
              })
            })
          })

          it("each episode has a property episode_number", () => {
            return result.tv.then((res) => {
              res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                const expectedEpisode = fixturesResultFetch.expectedTv[index]
                expect(episode).to.have.property("episode_number", expectedEpisode.episode_number)
              })
            })
          })

          it("each episode has a property extension", () => {
            return result.tv.then((res) => {
              res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                const expectedEpisode = fixturesResultFetch.expectedTv[index]
                expect(episode).to.have.property("extension", expectedEpisode.extension)
              })
            })
          })

          it("each episode has a property src", () => {
            return result.tv.then((res) => {
              res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                const expectedEpisode = fixturesResultFetch.expectedTv[index]
                expect(episode).to.have.property("src", expectedEpisode.src)
              })
            })
          })

          it("each episode has a property filename", () => {
            return result.tv.then((res) => {
              res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                const expectedEpisode = fixturesResultFetch.expectedTv[index]
                expect(episode).to.have.property("filename", expectedEpisode.filename)
              })
            })
          })

          context("subtitles", () => {
            it("each episode has a property subtitles", () => {
              return result.tv.then((res) => {
                res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                  const expectedEpisode = fixturesResultFetch.expectedTv[index]
                  expect(episode).to.have.property("subtitles", expectedEpisode.subtitles)
                })
              })
            })

            it("each subtitle has the same filename as the video", () => {
              return result.tv.then((res) => {
                res.sort((a, b) => a.src > b.src).forEach((episode, index) => {
                  const expectedEpisode = fixturesResultFetch.expectedTv[index]

                  if(expectedEpisode.subtitles == null && episode.subtitles == null) return

                  const subtitles_filename = path.parse(episode.subtitles).name
                  expect(subtitles_filename).to.be.equal(expectedEpisode.filename)
                })
              })
            })
          })
        })
      })
    })

    context("database", () => {
      beforeEach(() => {
        let i = 0
        file_history.addHook('beforeCreate', 'stubCreatedAt', (row, options) => {
          row.createdAt = Date.parse(new Date("01.01.2000")) + (i += 1000)
        })
      })

      afterEach(() => {
        file_history.removeHook('afterCreate', 'stubCreatedAt')
      })

      it("should have 8 entries", () => {
        const { tv } = parser.fetch()

        return tv.then(() => {
          return expect(file_history.count(filterMovies)).to.eventually.be.equal(fixturesResultFetch.expectedTv.length)
        })
      })

      it("each episode should be successfully saved with their expected src", () => {
        const { tv } = parser.fetch()

        return tv.then(() => {
          const expectedSrc = fixturesResultFetch.expectedTv.map((e) => e.src).sort()
          const getSrc = (rows) => rows.map((e) => e.src).sort()

          return expect(file_history.findAll(filterMovies).then(getSrc)).to.eventually.be.eql(expectedSrc)
        })
      })

      it("should save the current time in 'createdAt'", () => {
        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp) * 1
        const expectedAdded = fixturesResultFetch.expectedTv.map((e) => expectedTime)

        const { tv } = parser.fetch()

        return tv.then((res) => {
          return file_history.findAll(filterMovies).then((rows) => {
            rows.forEach((row) => {
              expect(row.createdAt * 1).to.be.closeTo(expectedTime, 10000)
            })
          })
        })
      })

      it("should left 'removed' as null", () => {
        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)
        const getRemoved = (rows) => rows.map((e) => e.removed)
        const expectedResult = fixturesResultFetch.expectedTv.map(() => null)

        sandbox.stub(Date, "now").returns(expectedTimestamp)

        const { tv } = parser.fetch()

        return tv.then(() => {
          return expect(file_history.findAll(filterMovies).then(getRemoved)).to.eventually.be.eql(expectedResult)
        })
      })

      it("should not insert into db if the src already exists", () => {
        const createEpisodes = () => {
          return fixturesResultFetch.expectedTv.map((e) => {
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
