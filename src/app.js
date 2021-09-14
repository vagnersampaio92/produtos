require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  });
  
  const express = require("express");

  const swaggerUI = require("swagger-ui-express")
  const swaggerFile = require("./../swagger/swagger.json")
  
  class AppController {
    constructor() {
      this.express = express()
      this.express.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile))

      this.middlewares()
      this.routes()
    }
  
    middlewares() {
      this.express.use(express.json())
    }
  
    routes() {
      this.express.use(require("./routes"))
    }
  }
  
  module.exports = new AppController().express