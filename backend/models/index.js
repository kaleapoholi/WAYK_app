const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.exam = require("../models/exam.model.js")(sequelize, Sequelize);
db.GA = require("../models/GA.model.js")(sequelize, Sequelize);
db.lesion = require("../models/lesion.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.user.hasMany(db.exam, {as: "exams"});
db.exam.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.exam.hasOne(db.GA, {sourceKey:"id", foreignKey:"examID", unique: true});
db.GA.belongsTo(db.exam, {targetKey:"id", foreignKey: "examID", unique: true});

db.GA.hasMany(db.lesion, {sourceKey:"id", foreignKey:"gaID"});
db.lesion.belongsTo(db.GA, {targetKey:"id", foreignKey:"gaID"});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

