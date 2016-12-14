import Parser from "./parser"
import chai, { expect } from "chai"

describe("Parser", () => {
  it("exists", () => {
    const parser = new Parser
  })

  describe(".fetch()", () => {
    let parser;

    beforeEach(() => {
      parser = new Parser
    })

    it("has a fetch method", () => {
      expect(typeof parser.fetch).to.eql("function")
    })

    it("requires an string argument", () => {
      expect(parser.fetch.bind(null, "test")).to.not.throw()
      expect(parser.fetch.bind(null, ".")).to.not.throw()
      expect(parser.fetch.bind(null, "/")).to.not.throw()

      expect(parser.fetch).to.throw()
      expect(parser.fetch.bind(null, "")).to.throw()
      expect(parser.fetch.bind(null, 1)).to.throw()
      expect(parser.fetch.bind(null, 0)).to.throw()
      expect(parser.fetch.bind(null, null)).to.throw()
      expect(parser.fetch.bind(null, undefined)).to.throw()
      expect(parser.fetch.bind(null, {})).to.throw()
      expect(parser.fetch.bind(null, [])).to.throw()
    })

    it("returns a valid json object", () => {
      const result = parser.fetch("./")
      expect(typeof result).to.be.eql("object")
    })
  })
})
