const { Op } = require("sequelize");
const { role, user, exam} = require("../models");
const db = require("../models");
const Exam = db.exam;
const Role = db.role;
const User = db.user;

//cherche tous les users dont le role est user
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


// update statut exam
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

//trouver un examen
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

//trouver tous les examens
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


// exports.findByUser = (req, res) => {

//   Exam.findAll({where : {userId: req.params.userId}})
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Exam" 
//       });
//     });
// };

// exports.findByUserAndState = (req, res) => {

//   Exam.findAll({where : {userId: req.params.userId, state : req.params.state}})
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Exam" 
//       });
//     });
// };

exports.findByUser = (req, res) => {
  User.findAll({
    include: [
      {
        model: exam,
        attributes: ["id","dirname","state","valid"],
        through: {
          attributes: ["examId", "userId"],
        }
      },
    ],
    where : {id: req.params.id}
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

exports.findByUserAndState = (req, res) => {
  User.findAll({
    include: [
      {
        model: exam,
        attributes: ["id","dirname","state","valid"],
        through: {
          attributes: ["examId", "userId"],
        },
        where : {state : req.params.state, valid : req.params.valid}
      },
    ],
    where : {id: req.params.id}
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

exports.findByexamID = (req, res) => {
  Exam.findByPk(req.params.id,
    {
    include: [
      {
        model: user,
        attributes: ["id","username"],
        through: {
          attributes: ["examId", "userId"],
        }
      },
    ],
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

exports.findByValid = (req, res) => {
  Exam.findAll({where: {valid : req.params.valid}})
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

exports.findByUserAndValid = (req, res) => {
  User.findAll({
    include: [
      {
        model: exam,
        attributes: ["id","dirname","state","valid"],
        through: {
          attributes: ["examId", "userId"],
        },
        where : {valid : req.params.valid}
      },
    ],
    where : {id: req.params.id}
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

