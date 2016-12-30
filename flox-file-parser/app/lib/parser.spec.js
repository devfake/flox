import Parser from "./parser"
import { expect } from "chai"
import fs from "fs"
import path from "path"
import db from "../../database/models"
import fixturesResultFetch from "../fixtures/fixturesResultFetch"
import { execFile } from "child_process"

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
    let parser

    beforeEach(() => {
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")
      parser = new Parser
    })

    it("has a fetch method", () => {
      expect(typeof parser.fetch).to.eql("function")
    })

    it("should take no params", () => {
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
  })

  describe(".list", () => {
    beforeEach(() => {
      process.env.TV_ROOT = path.normalize(__dirname + "/../fixtures/tv")
      process.env.MOVIES_ROOT = path.normalize(__dirname + "/../fixtures/movies")

      const parser = new Parser
      const { tv, movies } = parser.fetch()
      return Promise.all([tv, movies])
    })

    it("should be a function", () => {
      expect(Parser.list).to.be.a("function")
    })

    it("should return an array", () => {
      expect(Parser.list()).to.eventually.be.a("array")
    })

    it("returns the expected length", () => {
      const result = Parser.list()
      const expectedLength = fixturesResultFetch.allEpisodes.length + fixturesResultFetch.expectedMovies.length

      expect(result).to.eventually.be.lengthOf(expectedLength)
    })

    it("each returned object has the expected properties", () => {
      const result = Parser.list()

      result.then((rows) => {
        rows.forEach((row) => {
          expect(row).to.have.property("src")
          expect(row).to.have.property("category")
          expect(row).to.have.property("added")
          expect(row).to.have.property("removed")
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
