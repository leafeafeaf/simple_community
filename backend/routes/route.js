const express = require('express');
const router = express.Router();
const {Content,User,Comment,Recommendation} = require('../models');

router.get('/',async (req,res,next) => {
    try {
        const a = await Recommendation.findAll();
        res.json(a);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


//게시글 작성
router.post('/content',async (req,res,next) => {
    try {
        const result = await Content.create({
            writer:req.body.writer,
            title: req.body.title,
            content:req.body.content,
            file:req.body.file,
        });
        res.json({content_id:result.dataValues.content_id});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//게시글 수정
router.put('/content/:content_id',(req,res) => {
    res.send('게시글 수정 api 호출');
    console.log(req.params.content_id);
});
//게시글 삭제
router.delete('/content/:content_id',(req,res) => {
    res.send('게시글 삭제 api 호출');
    console.log(req.params.content_id);
});
//게시글 리스트 받기
router.get('/content/list',(req,res) => {
    res.send('게시글 리스트 받기 api 호출');
});
//게시글 정보가져오기
router.get('/content/:content_id',(req,res) => {
    res.send('게시글 정보 가져오기 api 호출');
    console.log(req.params.content_id);
});
//댓글 리스트 받기
router.get('/comment/list/:content_id',(req,res) => {
    res.send('댓글 리스트 받기 api 호출');
    console.log(req.params.content_id);
});
//댓글 작성
router.post('/comment',(req,res) => {
    res.send('댓글 작성 api 호출');
});
//댓글 삭제
router.delete('/comment/:comment_id',(req,res) => {
    res.send('댓글 삭제 api 호출');
    console.log(req.params.comment_id);
});
//좋아요
router.post('/like/:content_id',(req,res) => {
    res.send('좋아요 api 호출');
    console.log(req.params.content_id);
});
//로그인
router.get('/login',(req,res) => {
    res.send('로그인 api 호출');
});
//회원가입
router.post('/sign',(req,res) => {
    res.send('회원가입 api 호출');
});
//ID중복체크
router.get('/id-check',(req,res) => {
    res.send('id중복체크 api 호출');
});
//email중복체크
router.get('/email-check',(req,res) => {
    res.send('email중복체크 api 호출');
});

module.exports = router;