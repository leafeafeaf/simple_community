const express = require("express"); //익스프레스 서버
const path = require("path"); // 윈도우 주소 쓰기 위해서
const dotenv = require("dotenv"); //비밀키들 모아놓는곳
const morgan = require("morgan"); //로그 기록용
const { sequelize } = require("./models");
const cors = require("cors"); // cors 설정을 편안하게 하는 패키지

//비밀키 불러옴 (process.env로 불러올 수 있음)
dotenv.config();

//서버 포트 설정
const app = express();
app.set("port", process.env.PORT || 3000);

//DB ORM 연결 (sequelize)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

//미들웨어 설정
app.use(
  "/files",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      res.set("Content-Disposition", "attachment");
    },
  })
); //public폴더 정적파일화

//미들웨어 설정
app.use("/", express.static(path.join(__dirname, "fe"))); //public폴더 정적파일화

app.use(
  morgan("dev"),
  express.json(), //요청 바디 json 해석하기 위한 미들웨어
  express.urlencoded({ extended: false }) //url 주소 (params, query)이런친구들 해석
);
app.use(
  cors({
    origin: "https://yamc-leafeafeaf.koyeb.app/", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);
//라우터
const routeRouter = require("./routes/route");
app.use("/", routeRouter);

//404라우터 (주소 일치하는게 하나도 없을때)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? error : {};
  res.status(error.status || 500);
  res.send(error.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
