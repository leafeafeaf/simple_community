const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Content, User, Comment, Recommendation } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const a = await Recommendation.findAll();
    res.json(a);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//게시글 작성
router.post("/content", async (req, res, next) => {
  try {
    const result = await Content.create({
      writer: req.body.writer,
      title: req.body.title,
      content: req.body.content,
      file: req.body.file,
    });
    res.json({ content_id: result.dataValues.content_id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//게시글 수정
router.put("/content/:content_id", async (req, res, next) => {
  try {
    const result = await Content.update(
      {
        //update는 0이면 안바뀜 1이면 바뀜 //아예 없는 데이터를 수정하면 아무 실행안되고 0을 리턴)
        title: req.body.title,
        content: req.body.content,
        file: req.body.file,
      },
      {
        where: {
          content_id: req.params.content_id,
        },
      }
    );
    if (result[0] === 1) {
      res.json({ content_id: req.params.content_id });
    } else {
      res.json({ result: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//게시글 삭제
router.delete("/content/:content_id", async (req, res, next) => {
  try {
    const result = await Content.destroy({
      //결과값으로 update처럼 0과 1 리턴  0삭제된값 없음, 1 정상삭제
      where: {
        content_id: req.params.content_id,
      },
    });
    if (result[0] === 1) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//게시글 리스트 받기
router.get("/content/list", async (req, res, next) => {
  try {
    limit_num = 3;
    sort_string = "";
    recom_num_search = 0;
    if ("sort" in req.body) {
      //sort 키가 있음
      if (req.body.sort == "view") {
        sort_string = "view_num";
      } else if (req.body.sort == "recom") {
        sort_string = "recom_num";
      } else if (req.body.sort == "comment") {
        sort_string = "comment_num";
      } else if (req.body.sort == "famous") {
        sort_string = "date";
        recom_num_search = 10;
      } else {
        sort_string = "date";
      }
    } else {
      sort_string = "date";
    }
    //0인지 1인지 구분
    //req.body.search가 1이면 title 검색 0이면 writer 검색
    title_search = "";
    writer_search = "";
    if ("search" in req.body) {
      if (req.body.search == 0) {
        writer_search = req.body.search_content;
      } else {
        title_search = req.body.search_content;
      }
    }

    const result = await Content.findAll({
      limit: limit_num,
      offset: Number(req.body.page) * limit_num, //0부터 시작
      order: [
        [sort_string, "DESC"],
        ["date", "DESC"],
      ],
      where: {
        //recom_num_search값 이상인 recom_num
        recom_num: { [Op.gte]: recom_num_search },
        title: { [Op.like]: "%" + title_search + "%" },
        writer: { [Op.like]: "%" + writer_search + "%" },
      },
    });
    
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//게시글 한개 정보가져오기
router.get("/content/:content_id", (req, res) => {
  res.send("게시글 정보 가져오기 api 호출");
  console.log(req.params.content_id);
});
//댓글 리스트 받기
router.get("/comment/list/:content_id", (req, res) => {
  res.send("댓글 리스트 받기 api 호출");
  console.log(req.params.content_id);
});
//댓글 작성
router.post("/comment", (req, res) => {
  res.send("댓글 작성 api 호출");
});
//댓글 삭제
router.delete("/comment/:comment_id", (req, res) => {
  res.send("댓글 삭제 api 호출");
  console.log(req.params.comment_id);
});
//좋아요
router.post("/like/:content_id", (req, res) => {
  res.send("좋아요 api 호출");
  console.log(req.params.content_id);
});
//로그인
router.get("/login", (req, res) => {
  res.send("로그인 api 호출");
});
//회원가입
router.post("/sign", (req, res) => {
  res.send("회원가입 api 호출");
});

//ID중복체크
router.get("/id-check", async (req, res, next) => {
  try {
    const result = await User.findAll({
      where: { user_id: req.body.user_id },
    });
    if (
      typeof result === "object" && // 중복체크
      Object.keys(result).length === 0
    ) {
      res.json({ result: true }); // true면 사용가능
    } else {
      res.json({ result: false }); // false면 중복임
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//email중복체크
router.get("/email-check", async (req, res, next) => {
  try {
    const result = await User.findAll({
      where: { email: req.body.email },
    });
    if (
      typeof result === "object" && // 중복체크
      Object.keys(result).length === 0
    ) {
      res.json({ result: true }); // true면 사용가능
    } else {
      res.json({ result: false }); // false면 중복임
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
