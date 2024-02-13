const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
                autoIncrement:true,
                primaryKey:true,
            },
            content:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            writer:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Comment',
            tableName:'comment',
            paranoid: false,
            charset:'utf8',
            collate:'utf8mb3_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.Content,{foreignKey:'content_id',targetKey:'content_id'});
    }

};