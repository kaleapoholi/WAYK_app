const { Op } = require("sequelize");
const { GA, lesion } = require("../models");
const db = require("../models");
const Lesion = db.lesion;


// Create and Save a new GA
exports.create = (req , res ) => {
    const gaID= req.params.gaID;
    
    const lesion = {
        structure: req.body.structure,
        type : req.body.type,
        complexity : req.body.complexity,
        migration : req.body.migration,
        orientation: req.body.orientation,
        caracterisation : req.body.caracterisation,
        depth : req.body.depth,
        localisation: req.body.localisation,
        region: req.body.region,
        position: req.body.position,
        comment: req.body.comment,
        label: req.body.label,
        description : req.body.description,
        axialvis : req.body.axialvis,
        coronalvis : req.body.coronalvis,
        sagittalvis : req.body.sagittalvis,
        gaID : gaID,
    };
    
      // Save GA in the database
    
      Lesion.create(lesion)
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


exports.findOne = (req, res) => {
  const id = req.params.id;

  Lesion.findByPk(id)
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
  Lesion.findAll()
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


exports.findByGA = (req, res) => {

  Lesion.findAll({where : {gaID: req.params.gaID}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exam" 
      });
    });
};


exports.findByLabel = (req, res) => {
  //const state = req.params.state;
  //var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;
  Lesion.findAll({where: {label : req.params.label}})
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

