/* globals sandbox */
import Parser from "./parser"
import { expect } from "chai"
import fs from "fs"
import path from "path"
import db from "../../database/models"
import fixturesResultFetch from "../fixtures/fixturesResultFetch"
import { execFile } from "child_process"

const { file_history } = db.sequelize.models

describe("Parser (movies)", () => {
  beforeEach(() => {
    process.env.TV_ROOT = undefined
    process.env.MOVIES_ROOT = undefined
  })

  describe(".fetch()", () => {
    let parser

    beforeEach(() => {
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")
      parser = new Parser
    })

    context("using movie fixtures", () => {
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
        const { movies } = parser.fetch()

        return movies.then((result) => {
          result.sort((a, b) => a.src > b.src).forEach((movie, index) => {
            const expectedMovie = fixturesResultFetch.expectedMovies[index]

            expect(movie).to.be.deep.equal(expectedMovie)
          })
        })
      })
    })

    context("database", () => {
      const filterTv = {
        where: {
          category: "movies"
        }
      }

      beforeEach(() => {
        let i = 0
        file_history.addHook("beforeCreate", "stubCreatedAt", (row) => {
          row.createdAt = Date.parse(new Date("01.01.2000")) + (i += 1000)
        })
      })

      afterEach(() => {
        file_history.removeHook("afterCreate", "stubCreatedAt")
      })

      it("should have 2 entries", () => {
        const { movies } = parser.fetch()
        return movies.then(() => {
          return expect(file_history.count(filterTv)).to.be.eventually.equal(fixturesResultFetch.expectedMovies.length)
        })
      })

      it("firstCall should save the expected src", () => {
        const result = parser.fetch()
        const expectedSrc = fixturesResultFetch.expected_sw.src

        return result.movies.then(() => {
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

        return result.movies.then(() => {
          const result = file_history.findOne({
            where: {
              src: expectedSrc
            }
          })

          return expect(result).to.eventually.have.deep.property("dataValues.src", expectedSrc)
        })
      })

      it("should save the current time in 'added'", () => {
        const srcSw = fixturesResultFetch.expected_sw.src
        const srcWc = fixturesResultFetch.expected_wc.src

        const expectedTimestamp = Date.parse("01 Jan 2000") 
        const expectedTime = new Date(expectedTimestamp) * 1

        const result = parser.fetch()

        return result.movies.then(() => {
          return Promise.all([
            expect(file_history.findOne({where: {src: srcSw}}).then((r) => r.createdAt * 1)).to.eventually.be.closeTo(expectedTime, 10000),
            expect(file_history.findOne({where: {src: srcWc}}).then((r) => r.createdAt * 1)).to.eventually.be.closeTo(expectedTime, 10000),
          ])
        })
      })

      it("should left 'removed' as null", () => {
        const srcSw = fixturesResultFetch.expected_sw.src
        const srcWc = fixturesResultFetch.expected_wc.src

        const expectedTimestamp = Date.parse("01 Jan 2001")

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
          file_history.create({src: srcSw, added: Date.now(), category: "movies"}),
          file_history.create({src: srcWc, added: Date.now(), category: "movies"}),
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

    context("deleting files", () => {
      beforeEach(() => {
        const expectedTimestamp = Date.parse("01 Jan 2000")
        sandbox.stub(Date, "now").returns(expectedTimestamp)
        return parser.fetch().movies
      })

      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("should mark warcraft as removed after deleting src file", () => {
        const getWc = { where: { src: fixturesResultFetch.expected_wc.src } }
        const getRemovedField = (row) => row.removed

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)

        fs.unlinkSync(fixturesResultFetch.expected_wc.src)

        const { movies } = parser.fetch()
        return movies.then(() => {
          return Promise.all([
            expect(file_history.count(getWc)).to.be.eventually.equal(1),
            expect(file_history.findOne(getWc).then(getRemovedField)).to.eventually.be.eql(expectedTime)
          ])
        })
      })

      it("should mark warcraft as removed after renaming the src file", () => {
        const getRemovedField = (row) => row.removed

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)
        const expectedNewSrc = fixturesResultFetch.expected_wc.src.replace("mkv", "mp4")

        const getWc = { where: { src: fixturesResultFetch.expected_wc.src } }
        const getRenamedWc = { where: { src: expectedNewSrc } }

        fs.renameSync(fixturesResultFetch.expected_wc.src, expectedNewSrc)

        const { movies } = parser.fetch()

        return movies.then(() => {
          return Promise.all([
            expect(file_history.count(getWc)).to.be.eventually.equal(1),
            expect(file_history.findOne(getWc).then(getRemovedField)).to.eventually.be.eql(expectedTime),
            expect(file_history.findOne(getRenamedWc).then(getRemovedField)).to.eventually.be.null
          ])
        })
      })

      it("fetches a file which is already in db and marked as removed", () => {
        const getWc = { where: { src: fixturesResultFetch.expected_wc.src } }
        const getRemovedField = (row) => row.removed

        const expectedTimestamp = Date.parse("01 Jan 2000")
        const expectedTime = new Date(expectedTimestamp)

        fs.unlinkSync(fixturesResultFetch.expected_wc.src)
        const preprareDB = file_history.update({ removed: expectedTime }, { where: {
          src: fixturesResultFetch.expected_wc.src
        }})

        return preprareDB.then(() => {
          fs.writeFileSync(fixturesResultFetch.expected_wc.src, "")
          const { movies } = parser.fetch()

          return movies.then(() => {
            return Promise.all([
              expect(file_history.count(getWc)).to.be.eventually.equal(2),
              expect(file_history.findOne(getWc).then(getRemovedField)).to.eventually.be.eql(expectedTime)
            ])
          })
        })
      })
    })
  })
})
