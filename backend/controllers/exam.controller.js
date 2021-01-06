const { Op } = require("sequelize");
const { role, user } = require("../models");
const db = require("../models");
const Exam = db.exam;
const Role = db.role;


exports.findAllUser = (req, res) => {
  Role.findAll({
    include: [
      {
        model: user,
        attributes: ["username"],
        through: {
          attributes: ["roleId", "userId"],
        }
      },
    ],
    where : {name: "user"}
  })
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

exports.update = (req, res) => {
    const id = req.params.id;
  
    Exam.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Exam was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Exam with id=${id}. Maybe Exam was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Exam with id=" + id
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;

  Exam.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam with id=" + id
      });
    });
};

exports.findAll = (req, res) => {
  Exam.findAll()
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


exports.findByUser = (req, res) => {

  Exam.findAll({where : {userId: req.params.userId}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam" 
      });
    });
};


exports.findByState = (req, res) => {
  //const state = req.params.state;
  //var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;
  Exam.findAll({where: {state : req.params.state}})
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




