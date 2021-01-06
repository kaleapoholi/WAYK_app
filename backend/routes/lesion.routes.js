module.exports = app => {
    const lesions = require("../controllers/lesion.controller.js");
    
    var router = require("express").Router();

    // find by GA 
    router.get("/gaID/:gaID", lesions.findByGA);

    // find by Label
    router.get("/label/:label", lesions.findByLabel);

    // Create a new GA
    router.post("/:gaID", lesions.create);

    // find an lesion by id
    router.get("/:id", lesions.findOne);

    // find all lesion
    router.get("/", lesions.findAll);
    
    app.use('/api/lesions', router);


};