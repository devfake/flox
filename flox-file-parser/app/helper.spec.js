import sinon from "sinon"                     

const supertest = require("supertest")        
const app = require("../server.js")           
const config = require("../config.js")

const { port, host } = config.app

let current_app                               
global.sandbox                                

beforeEach(() => {                            
  current_app = app.listen(port, host) 
  global.request = supertest(current_app)
  global.sandbox = sinon.sandbox.create()     
})                                            

afterEach(() => {                             
  current_app.close()                         
  global.sandbox.restore()                    
})                                            
