const Sequelize = require('sequelize');

module.exports = class Content extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content_id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull:false,
                autoIncrement:true,
            },
            writer:{
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            title:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            content:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            //datetime은 9시간 전으로 저장함
            date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW
            },
            file:{
                type:Sequelize.STRING(45),
                allowNull:true,
            },
            recom_num:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
                defaultValue:0,
            },
            comment_num:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
                defaultValue:0,
            },
            view_num:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
                defaultValue:0,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Content',
            tableName:'content',
            paranoid: false,
            charset:'utf8',
            collate:'utf8mb3_general_ci',
        });
    }
    static associate(db){}

};