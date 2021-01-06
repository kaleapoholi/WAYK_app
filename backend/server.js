// index.js

/**
 * Required External Modules
 */

const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");

/**
 * App Variables
 */

const app= express();
const port= process.env.PORT || "8000";
var corsOptions = {
    origin : "http://localhost:8081"
};

/**
 * App Configuration
 */
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Connection to mysql
 */
const db = require("./models");
const Role = db.role;
const User = db.user;
const Exam = db.exam;
const GA = db.GA;
const Lesion = db.Lesion;

db.sequelize.sync();


/** 
 * Routes Definitions
 */

app.get("/",(req,res)=>{
    res.json({message : "What About Your Knees ?"});
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/exam.routes')(app);
require('./routes/GA.routes')(app);
require('./routes/lesion.routes')(app);


/**
 * Server Activation
 */

app.listen(port, ()=> {
    console.log(`listening to request on http://localhost:${port}`);
});