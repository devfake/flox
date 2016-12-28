import sinon from "sinon"                     

import supertest from "supertest"        
import app from "../server.js"           
import config from "../config.js"
import db from "../database/models"

const file_history = db.sequelize.models.file_history

const { port, host } = config.app

let current_app                               
global.sandbox                                

beforeEach((done) => {                            
  current_app = app.listen(port, host) 
  global.request = supertest(current_app)
  global.sandbox = sinon.sandbox.create()     
  file_history.destroy({where: {}}).then(()=>{}).then(done)
})                                            

afterEach(() => {                             
  current_app.close()                         
  global.sandbox.restore()                    
})                                            
