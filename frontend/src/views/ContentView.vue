<template lang="">
  <div>상세 게시글 화면 입니다.</div>
  <div>
    <div>
      <hr />
      <div class="title-div">
        <div>{{ contentDetail.title }}</div>
        <div>{{ contentDetail.date }}</div>
      </div>
      <hr />
      <div class="writer-div">
        <div>{{ contentDetail.writer }}</div>
        <div class="viewnum-div">
          <div>조회 수 : {{ contentDetail.view_num }}</div>
          <div>추천 수 : {{ contentDetail.recom_num }}</div>
          <div>댓글 : {{ contentDetail.comment_num }}</div>
        </div>
      </div>
    </div>
    <div>
      <textarea class="content" name="" id="" rows="30">게시글</textarea>
    </div>
    <div class="recom-div">
      <div class="recom">{{ contentDetail.recom_num }}</div>
      <input class="recom-btn" type="button" value="좋아요" />
    </div>
  </div>
  <hr />
  <div>
    <div>
      <div v-for="comment in commentList" :key="comment">
        <div class="comment-writer-div">
          <div class="comment-writer">{{ comment.writer }}</div>
          <div class="comment-date">{{ comment.date }}</div>
        </div>
        <div class="comment-content-div">{{ comment.content }}</div>
        <hr />
      </div>
    </div>
    <div>댓글 번호</div>
    <div>
      <div class="comment-write">댓글 쓰기</div>
      <div class="comment-post">
        <textarea
          class="comment-textarea"
          name=""
          id=""
          cols="1"
          rows="3"
        ></textarea>
        <input class="comment-btn" type="button" value="등록" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  props: {
    content_id: {
      type: Number,
      default: 8,
    },
  },
  created() {
    this.getContentDetail(this.content_id);
  },
  data() {
    return {
      contentDetail: {
        content_id: 1,
        title: "롤 하자",
        writer: "야민철",
        content: "롤좀하자 야성민",
        file: "1.jpg",
        date: new Date(),
        view_num: 5,
        comment_num: 6,
        recom_num: 7,
      },
      is_like: false,
      commentList: [
        {
          comment_id: 1,
          content: "싫엉",
          date: new Date(),
          writer: "야정찬",
          content_id: 4,
        },
        {
          comment_id: 2,
          content: "싫엉22222",
          date: new Date(),
          writer: "야민호",
          content_id: 4,
        },
        {
          comment_id: 3,
          content: "싫엉33333333",
          date: new Date(),
          writer: "야성민",
          content_id: 4,
        },
      ],
    };
  },
  methods: {
    getContentDetail(content_id) {
      this.axios
        .get("/content/" + content_id, {
          params: {
            user_id: this.$user_id,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          this.contentDetail = res.data.content;
          this.is_like = res.data.is_like;
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style scoped>
.title-div {
  display: flex;
  justify-content: space-between;
  margin: 8px;
}
.writer-div {
  display: flex;
  justify-content: space-between;
  margin-left: 8px;
  margin-bottom: 8px;
}
.viewnum-div {
  display: flex;
  justify-content: space-between;
}
.viewnum-div > div {
  margin-right: 8px;
}
.content {
  width: 100%;
  resize: none;
  margin-bottom: 10px;
  border-right: 0px solid black;
  border-left: 0px solid black;
}
.recom-div {
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recom {
  color: blue;
  border: 1px solid black;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recom-btn {
  margin: 16px 0px;
  width: 100px;
}

.comment-writer-div {
  display: flex;
  justify-content: space-between;
  margin: 8px;
}
.comment-write {
  display: flex;
  justify-content: left;
  margin: 8px;
}
.comment-post {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
.comment-content-div {
  text-align: left;
  margin: 8px;
}

.comment-textarea {
  width: 90%;
  resize: none;
  margin-right: 8px;
  padding: 5px;
}
.comment-btn {
}
</style>
