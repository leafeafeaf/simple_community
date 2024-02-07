const Sequelize = require('sequelize');

module.exports = class Recommendation extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
                primaryKey:true,
            },
            writer:{
                type:Sequelize.STRING(45),
                allowNull:false,
                primaryKey:true,

            },
        },{
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Recommendation',
            tableName:'recommendation',
            paranoid: false,
            charset:'utf8',
            collate:'utf8mb3_general_ci',
        });
    }
    static associate(db){}

};