/* globals sandbox, request */
import chai, { expect } from "chai"
import db from "../database/models"
import chaiAsPromised from "chai-as-promised"
import fixturesResultFetch from "./fixtures/fixturesResultFetch"
import fs from "fs"
import { execFile } from "child_process"
import Parser from "./lib/parser.js"
chai.use(chaiAsPromised)

const { file_history } = db.sequelize.models

describe("HTTP Server", () => {
  beforeEach(() => {
    process.env.TV_ROOT = __dirname + "/fixtures/tv"
    process.env.MOVIES_ROOT = __dirname + "/fixtures/movies"

    let i = 0
    file_history.addHook("beforeCreate", "stubCreatedAt", (row) => {
      row.createdAt = Date.parse(new Date("01.01.2000")) + (i += 1000)
      row.updatedAt = Date.parse(new Date("01.01.2000")) + i
    })
  })

  afterEach(() => {
    file_history.removeHook("beforeCreate", "stubCreatedAt")
  })

  describe("GET: fetch", () => {
    const path = "/fetch"

    it("should succeed", () => {
      return request.get(path)
        .expect(200) 
    })

    it("returns valid json", () => {
      return request.get(path)
        .expect("Content-Type", /json/)
    })

    it("should contain movies", () => {
      return request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/Warcraft/)
          expect(stringified).to.match(/Star Wars/)
          expect(res.body).to.have.property("movies")
          expect(res.body).to.be.a("object")
        })
    })

    it("should contain tv", () => {
      return request.get(path)
        .expect(res => {
          const stringified = JSON.stringify(res.body)

          expect(stringified).to.match(/Game of Thrones/)
          expect(stringified).to.match(/Breaking Bad/)
          expect(res.body).to.have.property("tv")
          expect(res.body).to.be.a("object")
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
        .expect("Content-Type", /json/)
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
        .expect("Content-Type", /json/)
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
        .expect("Content-Type", /json/)
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
        .expect("Content-Type", /json/)
    })

    context("should return only changes since the given timestamp", () => {
      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("with empty db", () => {
        file_history.removeHook("beforeCreate", "stubCreatedAt")

        return request.get(path).expect((res) => {
          expect(res.body).to.have.deep.members(fixturesResultFetch.expectedMovies)
        })
      })

      it("with sw as newly added movie", () => {
        const parser = new Parser
        const { movies } = parser.fetch()

        return movies.then(() => {
          const dbPrepared = file_history.update({ createdAt: new Date("01.01.2003") }, { where: {
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

        return movies.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2004") }, { where: {
            src: fixturesResultFetch.expected_sw.src
          }})

          const clonedSw = JSON.parse(JSON.stringify(fixturesResultFetch.expected_sw))
          clonedSw.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.have.deep.members([clonedSw])
            })
          })
        })
      })
    })

    context("with snapshot", () => {
      const fixtures = require("./fixtures/fixturesMoviesSnapshot.js")
      const timestamp = Date.parse(new Date("01.01.2017"))
      const path = "/fetch/movies/since/" + timestamp

      beforeEach(() => {
        return file_history.bulkCreate(fixtures) 
      })

      it("returns the expected result", () => {
        const expectedResult = [
          {
            "subtitles": null,
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mkv",
            "name": "starwars episode vi return of the jedi",
            "status": "added",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": null,
            "extension": "mp4",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
            "name": "starwars episode vi return of the jedi",
            "status": "removed",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": null,
            "extension": "mp4",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
            "name": "starwars episode vi return of the jedi",
            "status": "added",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": null,
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mkv",
            "name": "starwars episode vi return of the jedi",
            "status": "removed",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": __dirname + "/fixtures/movies/subfolder/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/subfolder/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
            "name": "warcraft",
            "status": "added",
            "year": 2016,
            "tags": [
              "720p"
            ],
            "filename": "Warcraft.2016.720p.WEB-DL"
          },
          {
            "subtitles": __dirname + "/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
            "name": "warcraft",
            "status": "removed",
            "year": 2016,
            "tags": [
              "720p"
            ],
            "filename": "Warcraft.2016.720p.WEB-DL"
          },
          {
            "subtitles": null,
            "extension": "mp4",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
            "name": "starwars episode vi return of the jedi",
            "status": "removed",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": __dirname + "/fixtures/movies/subfolder/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/subfolder/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
            "name": "warcraft",
            "status": "removed",
            "year": 2016,
            "tags": [
              "720p"
            ],
            "filename": "Warcraft.2016.720p.WEB-DL"
          },
          {
            "subtitles": null,
            "extension": "mp4",
            "src": __dirname + "/fixtures/movies/Star Wars/StarWars Episode VI Return of The Jedi 1080p BDRip/StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip.mp4",
            "name": "starwars episode vi return of the jedi",
            "status": "added",
            "year": null,
            "tags": [
              "hd",
              "1080p"
            ],
            "filename": "StarWars.Episode.VI.Return.of.The.Jedi.1080p.BDRip"
          },
          {
            "subtitles": __dirname + "/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/movies/Warcraft.2016.720p.WEB-DL/Warcraft.2016.720p.WEB-DL.mkv",
            "name": "warcraft",
            "status": "added",
            "year": 2016,
            "tags": [
              "720p"
            ],
            "filename": "Warcraft.2016.720p.WEB-DL"
          }
        ]

        return request.get(path).expect((res) => {
          expect((res.body)).to.deep.equal(expectedResult)
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
        .expect("Content-Type", /json/)
    })

    context("should return only changes since the given timestamp", () => {
      afterEach((done) => {
        execFile("./generate_fixtures.sh", done)
      })

      it("with empty db", () => {
        file_history.removeHook("beforeCreate", "stubCreatedAt")

        return request.get(path).expect((res) => {
          expect(res.body).to.have.deep.members(fixturesResultFetch.expectedTv)
        })
      })

      it("with bb s2 e2 as newly added episode", () => {
        const parser = new Parser
        const { tv } = parser.fetch()

        return tv.then(() => {
          const dbPrepared = file_history.update({ createdAt: new Date("01.01.2003") }, { where: {
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

        return movies.then(() => {
          const dbPrepared = file_history.update({ removed: new Date("01.01.2004"), createdAt: new Date("01.01.2003") }, { where: {
            src: fixturesResultFetch.expected_bb_s2_e2.src
          }})

          const clonedBb = JSON.parse(JSON.stringify(fixturesResultFetch.expected_bb_s2_e2))
          clonedBb.status = "removed"

          return dbPrepared.then(() => {
            return request.get(path).expect((res) => {
              expect(res.body).to.have.deep.members([fixturesResultFetch.expected_bb_s2_e2, clonedBb])
            })
          })
        })
      })
    })

    context("with snapshots", () => {
      const fixtures = require("./fixtures/fixturesTvSnapshot.js")
      const timestamp = Date.parse(new Date("01.01.2017"))
      const path = "/fetch/tv/since/" + timestamp

      beforeEach(() => {
        return file_history.bulkCreate(fixtures) 
      })

      it("returns the expected result", () => {
        const expectedResult = [
          {
            "episode_number": 1,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/S1/1.srt",
            "extension": "mp4",
            "src": __dirname + "/fixtures/tv/Breaking Bad/S1/1.mp4",
            "status": "added",
            "season_number": 1,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "1"
          },
          {
            "episode_number": 1,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/S1/1.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/tv/Breaking Bad/S1/1.mkv",
            "status": "removed",
            "season_number": 1,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "1"
          },
          {
            "episode_number": 1,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/S1/1.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/tv/Breaking Bad/S1/1.mkv",
            "status": "added",
            "season_number": 1,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "1"
          },
          {
            "episode_number": 1,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/S1/1.srt",
            "extension": "mp4",
            "src": __dirname + "/fixtures/tv/Breaking Bad/S1/1.mp4",
            "status": "removed",
            "season_number": 1,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "1"
          },
          {
            "episode_number": 2,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/s2/2.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/tv/Breaking Bad/s2/2.mkv",
            "status": "removed",
            "season_number": 2,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "2"
          },
          {
            "episode_number": 2,
            "subtitles": __dirname + "/fixtures/tv/Breaking Bad/s2/2.srt",
            "extension": "mkv",
            "src": __dirname + "/fixtures/tv/Breaking Bad/s2/2.mkv",
            "status": "added",
            "season_number": 2,
            "tv_title": "Breaking Bad",
            "year": null,
            "tags": [],
            "filename": "2"
          }
        ]

        return request.get(path).expect((res) => {
          expect((res.body)).to.deep.equal(expectedResult)
        })
      })
    })
  })
})
