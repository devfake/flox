import { expect } from "chai"
import db from "../database/models"

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
})

describe("db", () => {
  beforeEach((done) => {
    db.sequelize.models.file_history.destroy({where: {id: {gt: -1}}}).finally(done)
  })

  it("test", () => {
    db.sequelize.models.file_history.create({
      src: __dirname,
      added: Date()
    })
  })
})
