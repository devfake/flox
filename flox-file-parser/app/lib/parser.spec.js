import Parser from "./parser"
import { expect } from "chai"
import path from "path"
import db from "../../database/models"

const { file_history } = db.sequelize.models

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

    it("returns a valid json object", () => {
      const result = parser.fetch()
      expect(typeof result).to.be.eql("object")
    })

    it("returns a object with only tv and movies key", () => {
      const result = parser.fetch()
      expect(Object.keys(result)).to.be.eql(["tv", "movies"])
    })
  })
})
