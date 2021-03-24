module.exports = (sequelize, Sequelize) => {
    const Exam = sequelize.define("exams", {
      dirname: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      valid: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Exam;
  };