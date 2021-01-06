module.exports = app => {
    const genasmt = require("../controllers/GA.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all GA
    router.get("/all", genasmt.findAll);

    // Retrieve exam from examID 
    router.get("/exam/:examID", genasmt.findByExam);

    // Retrieve a GA from examID
    router.get("/GAexam/:examID", genasmt.findGAbyExamID);

    // Create a new GA
    router.post("/:examID", genasmt.create);

    // Retrieve all published GA
    router.get("/published", genasmt.findAllPublished);

    // Retrieve all exam by general state
    router.get("/generalstate/:generalstate", genasmt.findAllExamByGeneralState);
  
    // Retrieve all exam by quality
    router.get("/quality/:quality", genasmt.findAllExamByQuality);
  
    // Retrieve all exam by bonestate
    router.get("/bonestate/:bonestate", genasmt.findAllExamBybonestate);
  
    // Retrieve all exam by cartstate
    router.get("/cartstate/:cartstate", genasmt.findAllExamBycartstate);

    // Retrieve all exam by men state
    router.get("/menstate/:menstate", genasmt.findAllExamBymenstate);
  
    // Retrieve all exam by lig state
    router.get("/ligstate/:ligstate", genasmt.findAllExamByligstate);

    // Retrieve a single GA with id
    router.get("/id/:id", genasmt.findOne);

    // Update a GA with id
    router.put("/id/:id", genasmt.update);
  
  
    app.use('/api/GA', router);
};