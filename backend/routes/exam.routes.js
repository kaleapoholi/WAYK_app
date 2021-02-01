module.exports = app => {
    const exams = require("../controllers/exam.controller.js");
    
    var router = require("express").Router();

    //find all users
    router.get("/user/", exams.findAllUser);

    // find by userid
    router.get("/user/:userId", exams.findByUser);

    //find by userid and state
    router.get("/userAndState/:userId/:state", exams.findByUserAndState);

    // update an exam 
    router.put("/:id", exams.update);

    // find an exam by id
    router.get("/:id", exams.findOne);

    // find all exam
    router.get("/", exams.findAll);

    // find by state 
    router.get("/state/:state", exams.findByState);

    

    
    app.use('/api/exams', router);


};