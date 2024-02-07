const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id:{
                type:Sequelize.STRING(45),
                allowNull: false,
                primaryKey:true,
            },
            pw:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            email:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'User',
            tableName:'user',
            paranoid: false,
            charset:'utf8',
            collate:'utf8mb3_general_ci',
        });
    }
    static associate(db){}

};