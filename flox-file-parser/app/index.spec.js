import chai, { expect } from "chai"
import db from "../database/models"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

const file_history = db.sequelize.models.file_history

describe("HTTP Server", () => {
  beforeEach(() => {
    sandbox.stub(file_history, "create").returns(() => {
      return new Promise((res, rej) => res())
    }) 
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

          expect(stringified).to.match(/season/)
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

    it("should only include tv", (done) => {
      request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/season/)
          expect(stringified).to.not.match(/Warcraft/)
          expect(stringified).to.not.match(/Star Wars/)
          expect(res.body).to.not.have.property("tv")
          expect(res.body).to.not.have.property("movies")
          expect(res.body).to.be.a("array")
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })
  })

  describe("GET: fetch/movies", () => {
    const path = "/fetch/movies"

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

    it("should only include movies", (done) => {
      request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.not.match(/season/)
          expect(stringified).to.match(/Warcraft/)
          expect(stringified).to.match(/Star Wars/)
          expect(res.body).to.not.have.property("tv")
          expect(res.body).to.not.have.property("movies")
          expect(res.body).to.be.a("array")
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })
  })

  describe("using db", () => {
    let promise

    beforeEach((done) => {
      file_history.create.restore()
      sandbox.spy(file_history, "create")
      file_history.destroy({where: {}}).then(()=>{}).then(done)
      promise = request.get("/fetch/movies")
    })

    it("should have 2 entries", (done) => {
      promise.then((res) => {
        expect(file_history.count()).to.be.eventually.equal(2).notify(done)
      })
    })

    it("firstCall should save the expected src", (done) => {
      const expectedSrc = __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4"

      promise.then((res) => {
        const result = file_history.findOne({
          where: {
            src: expectedSrc
          }
        })
        expect(result).to.eventually.have.deep.property("dataValues.src", expectedSrc).then(() => {}).then(done).catch(done)
      })
    })

    it("secondCall should save the expected src", (done) => {
      const expectedSrc = __dirname + "/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv"

      promise.then((res) => {
        const result = file_history.findOne({
          where: {
            src: expectedSrc
          }
        })
        expect(result).to.eventually.have.deep.property("dataValues.src", expectedSrc).then(() => {}).then(done).catch(done)
      })
    })

    it("should wait until each result is successfully saved", (done) => {
      file_history.create.restore()

      let expectedToBeResolved = false

      sandbox.stub(file_history, "create", () => { 
        return new Promise((res, rej) => { 
          setTimeout(() => {
            expectedToBeResolved = true
            res()
          }, 1000) 
        })
      })

      request.get("/fetch/movies").then((res) => {
        expect(expectedToBeResolved).to.be.true
      }).then(done).catch(done)
    })
  })
})
