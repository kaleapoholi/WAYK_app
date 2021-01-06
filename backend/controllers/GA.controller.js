const { Op } = require("sequelize");
const { GA, exam } = require("../models");
const db = require("../models");
const Exam = db.exam;
const General_Assessment = db.GA;


// Create and Save a new GA
exports.create = (req , res ) => {
  const examID= req.params.examID;
  
  const general_assessment = {
      quality : req.body.quality,
      generalstate : req.body.generalstate,
      bonestate : req.body.bonestate,
      cartstate: req.body.cartstate,
      menstate : req.body.menstate,
      ligstate : req.body.ligstate,
      state: req.body.state ? req.body.state : false,
      examID : examID,
  };
  
    // Save GA in the database
  
    General_Assessment.create(general_assessment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the GA."
        });
      });


};

// Retrieve all GA from the database.
exports.findAll = (req, res) => {
  General_Assessment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving General Assessments."
      });
    });
  
};

// Find a single GA with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  General_Assessment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving General Assessment with id=" + id
      });
    });
  
};

// Find one Exam by examID
exports.findByExam = (req, res) => {
  Exam.findAll({where : {id : req.params.examID}}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam" 
      });
    });
};


// Find GA by ExamID
exports.findGAbyExamID = (req, res) => {
  General_Assessment.findAll({where : {examID : req.params.examID}}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam" 
      });
    });
}

// Update a GA by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  General_Assessment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "GA was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update GA with id=${id}. Maybe GA was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating GA with id=" + id
      });
    });
  
};


// Find all published GA
exports.findAllPublished = (req, res) => {
  General_Assessment.findAll({ where: { state: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving GA."
      });
    });
  
};

// Retrieve all exam by general state
exports.findAllExamByGeneralState = (req, res) => {
  const generalstate=req.params.generalstate;
  General_Assessment.findAll({ where : {generalstate: generalstate}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};

// Retrieve all exam by quality
exports.findAllExamByQuality = (req, res) => {
  const quality=req.params.quality;
  General_Assessment.findAll({ where : {quality: quality}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};

// Retrieve all exam by bonestate
exports.findAllExamBybonestate = (req, res) => {
  const bonestate=req.params.bonestate;
  General_Assessment.findAll({ where : {bonestate: bonestate}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};

// Retrieve all exam by cartstate
exports.findAllExamBycartstate = (req, res) => {
  const cartstate=req.params.cartstate;
  General_Assessment.findAll({ where : {cartstate: cartstate}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};

// Retrieve all exam by men state
exports.findAllExamBymenstate = (req, res) => {
  const menstate=req.params.menstate;
  General_Assessment.findAll({ where : {menstate: menstate}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};

// Retrieve all exam by lig state
exports.findAllExamByligstate = (req, res) => {
  const ligstate=req.params.ligstate;
  General_Assessment.findAll({ where : {ligstate: ligstate}}
  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving exam."
    });
  });
};
