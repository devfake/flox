import chai, { expect } from "chai"
import db from "../database/models"
import chaiAsPromised from "chai-as-promised"
import fixturesResultFetch from "./fixtures/fixturesResultFetch"
import fs from "fs"
import { execFile } from "child_process"
import Parser from "./lib/parser.js"
chai.use(chaiAsPromised)

const file_history = db.sequelize.models.file_history

describe("HTTP Server", () => {
  beforeEach(() => {
    process.env.TV_ROOT = __dirname + "/fixtures/tv"
    process.env.MOVIES_ROOT = __dirname + "/fixtures/movies"
  })

  describe("GET: fetch", () => {
    const path = "/fetch"

    it("should succeed", (done) => {
      request.get(path)
        .expect(200, done) 
    })

    it("returns valid json", (done) => {
      request.get(path)
        .expect('Content-Type', /json/)
        .end((err, res) => { 
          if(err) return done(err)
          done()
        })
    })

    it("should contain movies", (done) => {
      request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/Warcraft/)
          expect(stringified).to.match(/Star Wars/)
          expect(res.body).to.have.property("movies")
          expect(res.body).to.be.a("object")
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })

    it("should contain tv", (done) => {
      request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/Game of Thrones/)
          expect(stringified).to.match(/Breaking Bad/)
          expect(res.body).to.have.property("tv")
          expect(res.body).to.be.a("object")
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })
  })

  describe("GET: fetch/tv", () => {
    const path = "/fetch/tv"

    it("should succeed", () => {
      return request.get(path)
        .expect(200) 
    })

    it("returns valid json", () => {
      return request.get(path)
        .expect('Content-Type', /json/)
    })

    it("should only include tv", () => {
      return request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/season/)
          expect(stringified).to.not.match(/Warcraft/)
          expect(stringified).to.not.match(/Star Wars/)
          expect(res.body).to.not.have.property("tv")
          expect(res.body).to.not.have.property("movies")
          expect(res.body).to.be.a("array")
        })
    })
  })

  describe("GET: fetch/movies", () => {
    const path = "/fetch/movies"

    it("should succeed", () => {
      return request.get(path)
        .expect(200) 
    })

    it("returns valid json", () => {
      return request.get(path)
        .expect('Content-Type', /json/)
    })

    it("should only include movies", () => {
      return request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.not.match(/Breaking Bad/)
          expect(stringified).to.not.match(/Game of Thrones/)
          expect(stringified).to.match(/Warcraft/)
          expect(stringified).to.match(/Star Wars/)
          expect(res.body).to.not.have.property("tv")
          expect(res.body).to.not.have.property("movies")
          expect(res.body).to.be.a("array")
        })
    })
  })

  describe("GET: fetch/tv/since", () => {
    const path = "/fetch/tv/since"

    it("should succeed", () => {
      return request.get(path).expect(200)
    })

    it("should return valid json", () => {
      return request.get(path)
        .expect('Content-Type', /json/)
    })
  })

  describe("GET: fetch/movies/since/timestamp", () => {
    const timestamp = Date.parse(new Date("01.01.2002"))
    const path = "/fetch/movies/since/" + timestamp

    it("should succeed", () => {
      return request.get(path).expect(200)
    })

    it("should return valid json", () => {
      return request.get(path)
        .expect('Content-Type', /json/)
    })

    context("should return only changes since the given timestamp", () => {
      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("with empty db", () => {
        return request.get(path).expect((res) => {
          expect(res.body).to.be.deep.equal(fixturesResultFetch.expectedMovies)
        })
      })

      it("with sw as newly added movie", () => {
        const parser = new Parser
        const { movies } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2000")

        return movies.then(() => {
          const dbPrepared = file_history.update({ added: new Date("01.01.2003") }, { where: {
              src: fixturesResultFetch.expected_sw.src
          }})

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.be.deep.equal([fixturesResultFetch.expected_sw])
            })
          })
        })
      })

      it("with sw as removed movie", () => {
        const parser = new Parser
        const { movies } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2000")

        return movies.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2003") }, { where: {
              src: fixturesResultFetch.expected_sw.src
          }})

          fs.unlinkSync(fixturesResultFetch.expected_sw.src)
          
          const clonedSw = JSON.parse(JSON.stringify(fixturesResultFetch.expected_sw))
          clonedSw.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.be.deep.equal([clonedSw])
            })
          })
        })
      })

      it("with sw as removed movie and then added again", () => {
        const parser = new Parser
        const { movies } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2003")

        return movies.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2004") }, { where: {
              src: fixturesResultFetch.expected_sw.src
          }})

          const clonedSw = JSON.parse(JSON.stringify(fixturesResultFetch.expected_sw))
          clonedSw.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.have.deep.members([fixturesResultFetch.expected_sw, clonedSw, fixturesResultFetch.expected_wc])
            })
          })
        })
      })
    })
  })

  describe("GET: fetch/tv/since/timestamp", () => {
    const timestamp = Date.parse(new Date("01.01.2002"))
    const path = "/fetch/tv/since/" + timestamp

    it("should succeed", () => {
      return request.get(path).expect(200)
    })

    it("should return valid json", () => {
      return request.get(path)
        .expect('Content-Type', /json/)
    })

    context("should return only changes since the given timestamp", () => {
      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("with empty db", () => {
        return request.get(path).expect((res) => {
          expect(res.body).to.have.deep.members(fixturesResultFetch.expectedTv)
        })
      })

      it("with bb s2 e2 as newly added episode", () => {
        const parser = new Parser
        const { tv } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2000")

        return tv.then(() => {
          const dbPrepared = file_history.update({ added: new Date("01.01.2003") }, { where: {
              src: fixturesResultFetch.expected_bb_s2_e2.src
          }})

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.have.deep.members([fixturesResultFetch.expected_bb_s2_e2])
            })
          })
        })
      })

      it("with bb s2 e2 as removed episode", () => {
        const parser = new Parser
        const { tv } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2000")

        return tv.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2003") }, { where: {
              src: fixturesResultFetch.expected_bb_s2_e2.src
          }})

          fs.unlinkSync(fixturesResultFetch.expected_bb_s2_e2.src)
          
          const clonedBb = JSON.parse(JSON.stringify(fixturesResultFetch.expected_bb_s2_e2))
          clonedBb.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.be.deep.equal([clonedBb])
            })
          })
        })
      })

      it("with bb s2 e2 as removed episode and then added again", () => {
        const parser = new Parser
        const { movies } = parser.fetch()
        sandbox.stub(Date, "now").returns("01.01.2003")

        return movies.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2004") }, { where: {
              src: fixturesResultFetch.expected_bb_s2_e2.src
          }})

          const clonedBb = JSON.parse(JSON.stringify(fixturesResultFetch.expected_bb_s2_e2))
          clonedBb.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.have.deep.members([...fixturesResultFetch.expectedTv, clonedBb])
            })
          })
        })
      })
    })
  })
})
