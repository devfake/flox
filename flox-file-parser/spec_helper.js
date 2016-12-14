import sinon from "sinon"                     

const supertest = require("supertest")        
const app = require("../server.js")           
const request = supertest(app)                
const config = require("./config.js")

const port = config.server.port               
const addr = config.server.host               

let current_app                               
global.sandbox                                

beforeEach(() => {                            
  current_app = app.listen(port, addr)        
  global.sandbox = sinon.sandbox.create()     
})                                            

afterEach(() => {                             
  current_app.close()                         
  global.sandbox.restore()                    
})                                            
