module.exports = app => {
    const tutorials = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Tutorial
    // router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
 
  };