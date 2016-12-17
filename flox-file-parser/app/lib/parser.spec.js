import Parser from "./parser"
import chai, { expect } from "chai"
import fs from "fs"
import path from "path"

describe("Parser", () => {
  it("exists", () => {
    const parser = new Parser
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

    beforeEach(() => {
      sandbox.spy(fs, "readdirSync")
      parser = new Parser
    })

    it("has a fetch method", () => {
      expect(typeof parser.fetch).to.eql("function")
    })

    context("with different root", () => {
      beforeEach(() => {
        fs.readdirSync.restore()
        sandbox.stub(fs, "readdirSync").returns([])
      })

      it("tests 'test'", () => {
        expect(parser.fetch.bind(null, "test")).to.not.throw()
      })

      it("tests '.'", () => {
        expect(parser.fetch.bind(null, ".")).to.not.throw()
      })

      it("tests '/'", () => {
        expect(parser.fetch.bind(null, "/")).to.not.throw()
      })

      it("tests './app/tv/../..'", () => {
        expect(parser.fetch.bind(null, "./app/tv/../..")).to.not.throw()
      })

      it("should not throw", () => {
        expect(parser.fetch).to.throw()
        expect(parser.fetch.bind(null, "")).to.throw()
        expect(parser.fetch.bind(null, 1)).to.throw()
        expect(parser.fetch.bind(null, 0)).to.throw()
        expect(parser.fetch.bind(null, null)).to.throw()
        expect(parser.fetch.bind(null, undefined)).to.throw()
        expect(parser.fetch.bind(null, {})).to.throw()
        expect(parser.fetch.bind(null, [])).to.throw()
      })
    })

    it("returns a valid json object", () => {
      const result = parser.fetch(rootPath)
      expect(typeof result).to.be.eql("object")
    })

    it("returns a object with only tv and movies key", () => {
      const result = parser.fetch(rootPath)
      expect(Object.keys(result)).to.be.eql(["tv", "movies"])
    })

    it("should normalize the path", () => {
      fs.readdirSync.restore()
      sandbox.stub(fs, "readdirSync").returns([])

      parser.fetch(rootPath)
      expect(fs.readdirSync.firstCall.args[0]).to.be.equal("app/fixtures/tv/")

      parser.fetch(rootPath + "/../")
      expect(fs.readdirSync.secondCall.args[0]).to.be.equal("app/tv/")

      expect(fs.readdirSync.secondCall.args[0]).to.be.equal("app/tv/")
    })

    context("using fixtures", () => {
      beforeEach(() => {
        result = parser.fetch(rootPath)
      })

      it("calls fs.readdirSync with the expected call count and path", () => {
        const normalizedTvPath = path.normalize(tvPath)
        expect(fs.readdirSync.callCount).to.equal(7)
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

          beforeEach(() => {
            got_s1_e1 = got_s1.episodes[0]
            got_s1_e2 = got_s1.episodes[1]
            got_s2_e1 = got_s2.episodes[0]
            got_s2_e2 = got_s2.episodes[1]
            bb_s1_e1 = bb_s1.episodes[0]
            bb_s1_e2 = bb_s1.episodes[1]
            bb_s2_e1 = bb_s2.episodes[0]
            bb_s2_e2 = bb_s2.episodes[1]
          })

          it("each season should have 2 episodes", () => {
            expect(got_s1.episodes.length).to.be.equal(2)
            expect(got_s2.episodes.length).to.be.equal(2)
            expect(bb_s1.episodes.length).to.be.equal(2)
            expect(bb_s2.episodes.length).to.be.equal(2)
          })
          
          it("each episode is an object", () => {
            expect(typeof got_s1_e1).to.be.equal("object")
            expect(typeof got_s1_e2).to.be.equal("object")
            expect(typeof got_s2_e1).to.be.equal("object")
            expect(typeof got_s2_e2).to.be.equal("object")
            expect(typeof bb_s1_e1).to.be.equal("object")
            expect(typeof bb_s1_e2).to.be.equal("object")
            expect(typeof bb_s2_e1).to.be.equal("object")
            expect(typeof bb_s2_e2).to.be.equal("object")
          })

          it("each episode has a property episde_number", () => {
            expect(got_s1_e1).to.have.property("episode_number", 1)
            expect(got_s1_e2).to.have.property("episode_number", 2)
            expect(got_s2_e1).to.have.property("episode_number", 1)
            expect(got_s2_e2).to.have.property("episode_number", 2)
            expect(bb_s1_e1).to.have.property("episode_number", 1)
            expect(bb_s1_e2).to.have.property("episode_number", 2)
            expect(bb_s2_e1).to.have.property("episode_number", 1)
            expect(bb_s2_e2).to.have.property("episode_number", 2)
          })

          it("each episode has a property extension", () => {
            expect(got_s1_e1).to.have.property("extension", "mkv")
            expect(got_s1_e2).to.have.property("extension", "mkv")
            expect(got_s2_e1).to.have.property("extension", "mkv")
            expect(got_s2_e2).to.have.property("extension", "mkv")
            expect(bb_s1_e1).to.have.property("extension", "mkv")
            expect(bb_s1_e2).to.have.property("extension", "mkv")
            expect(bb_s2_e1).to.have.property("extension", "mkv")
            expect(bb_s2_e2).to.have.property("extension", "mkv")
          })

          it("each episode has a property src", () => {
            const absoluteRoot = path.normalize(__dirname + "/../")
            const absolutePath_got = absoluteRoot + "fixtures/tv/" + game_of_thrones
            const absolutePath_got_s1 = absolutePath_got + "/" + "s01"
            const absolutePath_got_s2 = absolutePath_got + "/" + "s02"
            const absolutePath_bb = absoluteRoot + "fixtures/tv/" + breaking_bad
            const absolutePath_bb_s1 = absolutePath_bb + "/" + "s01"
            const absolutePath_bb_s2 = absolutePath_bb + "/" + "s02"

            const absolutePath_got_s1_e1 = absolutePath_got_s1 + "/01.mkv"
            const absolutePath_got_s1_e2 = absolutePath_got_s1 + "/02.mkv"
            const absolutePath_got_s2_e1 = absolutePath_got_s2 + "/01.mkv"
            const absolutePath_got_s2_e2 = absolutePath_got_s2 + "/02.mkv"
            const absolutePath_bb_s1_e1 = absolutePath_bb_s1 + "/01.mkv"
            const absolutePath_bb_s1_e2 = absolutePath_bb_s1 + "/02.mkv"
            const absolutePath_bb_s2_e1 = absolutePath_bb_s2 + "/01.mkv"
            const absolutePath_bb_s2_e2 = absolutePath_bb_s2 + "/02.mkv"

            expect(got_s1_e1).to.have.property("src", absolutePath_got_s1_e1)
            expect(got_s1_e2).to.have.property("src", absolutePath_got_s1_e2)
            expect(got_s2_e1).to.have.property("src", absolutePath_got_s2_e1)
            expect(got_s2_e2).to.have.property("src", absolutePath_got_s2_e2)
            expect(bb_s1_e1).to.have.property("src", absolutePath_bb_s1_e1)
            expect(bb_s1_e2).to.have.property("src", absolutePath_bb_s1_e2)
            expect(bb_s2_e1).to.have.property("src", absolutePath_bb_s2_e1)
            expect(bb_s2_e2).to.have.property("src", absolutePath_bb_s2_e2)
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
