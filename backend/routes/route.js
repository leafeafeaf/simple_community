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
    const result2 = await Recommendation.destroy({
      //결과값으로 update처럼 0과 1 리턴  0삭제된값 없음, 1 정상삭제
      where: {
        content_id: req.params.content_id,
      },
    });
    if (result === 1) {
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
    limit_num = 4;
    sort_string = "";
    recom_num_search = 0;
    page_num = 0;

    if ("page" in req.query) {
      page_num = req.query.page;
    }
    console.log(page_num)
    console.log();
    if ("sort" in req.query) {
      //sort 키가 있음
      if (req.query.sort == "view") {
        sort_string = "view_num";
      } else if (req.query.sort == "recom") {
        sort_string = "recom_num";
      } else if (req.query.sort == "comment") {
        sort_string = "comment_num";
      } else if (req.query.sort == "famous") {
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
    if ("search" in req.query) {
      if (req.query.search != 0) {
        writer_search = req.query.search_content;
      } else {
        title_search = req.query.search_content;
      }
    }

    const result = await Content.findAll({
      attributes: [
        "content_id",
        "title",
        "writer",
        "date",
        "view_num",
        "comment_num",
        "recom_num",
      ],
      limit: limit_num,
      offset: limit_num * page_num, //0부터 시작
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
router.get("/content/:content_id", async (req, res, next) => {
  try {
    const obj = {};
    const result = await Content.findOne({
      //findAll은 배열형식으로 리턴, findOne 객체(or Null)로 리턴
      where: { content_id: req.params.content_id },
    });
    result.dataValues.view_num++;
    obj.content = result;
    obj.is_like = false;
    const result2 = await Content.update(
      {
        //update는 0이면 안바뀜 1이면 바뀜 //아예 없는 데이터를 수정하면 아무 실행안되고 0을 리턴)
        view_num: result.dataValues.view_num,
      },
      {
        where: {
          content_id: req.params.content_id,
        },
      }
    );
    if (req.query.user_id) {
      const is_recom = await Recommendation.findOne({
        where: {
          content_id: req.params.content_id,
          writer: req.query.user_id,
        },
      }); //{} null
      //result에 key추가하기 가능함?
      if (is_recom) {
        console.log(is_recom);
        obj.is_like = true;
      }
    }
    res.json(obj);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//댓글 리스트 받기
router.get("/comment/list/:content_id", async (req, res, next) => {
  try {
    const result = await Comment.findAll({
      where: { content_id: req.params.content_id },
    });
    res.json(result); // true면 사용가능
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//댓글 작성
router.post("/comment", async (req, res, next) => {
  try {
    const result = await Comment.create({
      content_id: req.body.content_id,
      content: req.body.content,
      writer: req.body.writer,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//댓글 삭제
router.delete("/comment/:comment_id", async (req, res, next) => {
  try {
    const result = await Comment.destroy({
      //결과값으로 update처럼 0과 1 리턴  0삭제된값 없음, 1 정상삭제
      where: {
        comment_id: req.params.comment_id,
      },
    });
    if (result === 1) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/like/:content_id", async (req, res, next) => {
  try {
    if (req.body.is_like == 0) {
      // 0이면 추가, 1이면 삭제 // == 이면 타입 상관없이 값만 같아도 됨 === 이면 타입과 값이 모두 같아야함
      const result = await Recommendation.create({
        content_id: req.params.content_id,
        writer: req.body.writer,
      });
      // recom_num을 하나 올리는 트리거 추가해야함
      res.json({ is_like: true });
    } else if (req.body.is_like == 1) {
      const result = await Recommendation.destroy({
        where: {
          content_id: req.params.content_id,
          writer: req.body.writer,
        },
      });
      if (result == 1) {
        // 정상적으로 삭제 되었을 경우
        res.json({ is_like: false });
        console.log(result);
      } else {
        // 정상적으로 삭제 되지 않았을 경우
        res.json({ return: false });
        console.log(result);
      }
    } else {
      // 0과 1이 아닐 경우
      res.json({ return: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//로그인
router.get("/login", async (req, res, next) => {
  try {
    const result = await User.findOne({
      where: {
        user_id: req.query.user_id,
        pw: req.query.pw,
      },
    });
    if (result != null) {
      res.json({ result: true });
    } else {
      res.json({ errMsg: "아이디와 비밀번호가 틀림" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//회원가입
router.post("/sign", async (req, res, next) => {
  try {
    const result = await User.create({
      user_id: req.body.user_id,
      pw: req.body.pw,
      email: req.body.email,
    });
    res.json({ result: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//ID중복체크
router.get("/id-check", async (req, res, next) => {
  try {
    const result = await User.findAll({
      where: { user_id: req.query.user_id },
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
      where: { email: req.query.email },
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
