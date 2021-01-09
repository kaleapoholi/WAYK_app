module.exports = (sequelize, Sequelize) => {
    const Lesion = sequelize.define("lesions", {
        structure: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        complexity:{
            type: Sequelize.STRING
        },
        migration:{
            type: Sequelize.STRING
        },
        orientation: {
            type: Sequelize.STRING
        },
        caracterisation:{
            type: Sequelize.STRING
        },
        depth:{
            type: Sequelize.STRING
        },
        localisation:{
            type: Sequelize.STRING
        },
        region:{
            type: Sequelize.STRING
        },
        position:{
            type: Sequelize.STRING
        },
        comment:{
            type: Sequelize.STRING
        },
        label:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        axialvis:{
            type: Sequelize.STRING
        },
        coronalvis:{
            type: Sequelize.STRING
        },
        sagittalvis:{
            type: Sequelize.STRING
        },


    });

    return Lesion;
};
