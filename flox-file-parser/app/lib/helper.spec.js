import Parser from "./parser"
import { helper } from "./helper.js"
import { expect } from "chai"
import path from "path"
import db from "../../database/models"
import fixturesResultFetch from "../fixtures/fixturesResultFetch"

const { file_history } = db.sequelize.models

describe("helper", () => {
  describe(".list", () => {
    beforeEach(() => {
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")

      const parser = new Parser
      const { tv, movies } = parser.fetch()
      return Promise.all([tv, movies])
    })

    it("should be a function", () => {
      expect(helper.list).to.be.a("function")
    })

    it("should return an array", () => {
      expect(helper.list()).to.eventually.be.a("array")
    })

    it("returns the expected length", () => {
      const result = helper.list()
      const expectedLength = fixturesResultFetch.expectedTv.length + fixturesResultFetch.expectedMovies.length

      expect(result).to.eventually.be.lengthOf(expectedLength)
    })

    it("each returned object has the expected properties", () => {
      const result = helper.list()

      return result.then((rows) => {
        rows.forEach((row) => {
          expect(row).to.have.property("src")
          expect(row).to.have.property("category")
          expect(row).to.have.property("removed")
        })
      })
    })
  })

  describe(".normalizeNumber()", () => {
    beforeEach(() => {
      sandbox.spy(helper, "normalizeNumber")
    })

    it("exists", () => {
      helper.normalizeNumber()
    })

    it("returns number", () => {
      const result = helper.normalizeNumber()
      expect(typeof result).to.be.equal("number")
    })

    it("takes a string as argument", () => {
      const result = helper.normalizeNumber("0")
      expect(helper.normalizeNumber.firstCall.args.length).to.be.not.equal(0)
      expect(helper.normalizeNumber.firstCall.args[0]).to.be.a("string")
    })

    it("returns the expected output", () => {
      const result =  []
      result.push(
        {
          result: helper.normalizeNumber("s01"),
          expected: 1
        },
        {
          result: helper.normalizeNumber("S02"),
          expected: 2
        },
        {
          result: helper.normalizeNumber("s003"),
          expected: 3
        },
        {
          result: helper.normalizeNumber("S0020"),
          expected: 20
        },
        {
          result: helper.normalizeNumber("s0"),
          expected: 0
        },
        {
          result: helper.normalizeNumber("01"),
          expected: 1
        },
        {
          result: helper.normalizeNumber("01s"),
          expected: 1
        },
        {
          result: helper.normalizeNumber("s01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber("S01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber("sS01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber("sdfdsgsS01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber("/S01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber(".S01s"),
          expected: 1
        }, 
        {
          result: helper.normalizeNumber(""),
          expected: -1
        }, 
        {
          result: helper.normalizeNumber("s"),
          expected: -1
        }, 
        {
          result: helper.normalizeNumber("01.mkv"),
          expected: 1
        }, 
      )
      result.forEach((item) => {
        expect(item.result).to.be.equal(item.expected)
      })
    })
  })
})
