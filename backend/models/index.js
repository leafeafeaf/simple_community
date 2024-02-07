//객체 - db 매핑(ORM)을 위한 모듈
const Sequelize = require('sequelize');

//orm 파일 불러오기
const Content = require('./content');
const User = require('./user');
const Comment = require('./comment');
const Recommendation = require('./recommendation');

//.env 파일에 production이 아니면 개발중으로 인식
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
//config/config의 developement 부분을 가져옴
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

//모델 orm 객체 생성
db.Content = Content;
db.User = User;
db.Comment =Comment;
db.Recommendation = Recommendation;

//연결
Content.init(sequelize);
User.init(sequelize);
Comment.init(sequelize);
Recommendation.init(sequelize);


module.exports = db;