const { exam } = require("../models/index.js");

module.exports = app => {
    const exams = require("../controllers/exam.controller.js");
    
    var router = require("express").Router();

    //find all users
    router.get("/user/", exams.findAllUser);

    // find by userid
    router.get("/user/:id", exams.findByUser);

    //find by userid and state
    router.get("/userAndState/:id/:state/:valid", exams.findByUserAndState);

    //find by userid and valid
    router.get("/userAndValid/:id/:valid", exams.findByUserAndValid);

    // update an exam 
    router.put("/:id", exams.update);

    // find an exam by id
    router.get("/:id", exams.findOne);

    // find all exam
    router.get("/", exams.findAll);

    // find by state 
    router.get("/state/:state", exams.findByState);

    //find by valid
    router.get("/valid/:valid", exams.findByValid);

    // find an exam by examid include user
    router.get("/examIdUser/:id", exams.findByexamID);
    
    app.use('/api/exams', router);


};