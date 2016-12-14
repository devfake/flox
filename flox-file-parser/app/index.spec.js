import supertest from "supertest"
import app from "../server.js"

const request = supertest(app)

describe("HTTP Server", () => {
  describe("GET: fetch_files", () => {
    const path = "/fetch_files"

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
  })
})
