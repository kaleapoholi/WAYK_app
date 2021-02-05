module.exports = (sequelize, Sequelize) => {
    const GA = sequelize.define("general_assessments", {
        quality: {
            type: Sequelize.STRING
        },
        generalstate:{
            type: Sequelize.STRING
        },
        bonestate:{
            type: Sequelize.STRING
        },
        cartstate: {
            type: Sequelize.STRING
        },
        menstate:{
            type: Sequelize.STRING
        },
        ligstate:{
            type: Sequelize.STRING
        },
        state:{
            type: Sequelize.BOOLEAN
        },
        laterality:{
            type: Sequelize.STRING
        },
        effusion:{
            type: Sequelize.STRING
        }

    });

    return GA;
};
