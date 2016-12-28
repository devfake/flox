import sinon from "sinon"                     

import supertest from "supertest"        
import app from "../server.js"           
import config from "../config.js"

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
