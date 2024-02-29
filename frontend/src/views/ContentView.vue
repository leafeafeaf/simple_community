<template lang="">
  <div>
    <div>
      <hr />
      <div class="title-div">
        <div class="title">{{ contentDetail.title }}</div>
        <div>{{ dateFormat(contentDetail.date) }}</div>
      </div>
      <hr />
      <div class="writer-div">
        <div>작성자:{{ contentDetail.writer }}</div>
        <div class="viewnum-div">
          <div>조회 수 : {{ contentDetail.view_num }}</div>
          <div>추천 수 : {{ contentDetail.recom_num }}</div>
          <div>댓글 : {{ contentDetail.comment_num }}</div>
        </div>
      </div>
      <div class="file-div">
        <div>파일:</div>
        <!--<button id="sceneName" @click="saveBtn">버튼</button>-->
        <a
          :href="`http://localhost:3030/files/${contentDetail.file}`"
          download
          >{{ contentDetail.file }}</a
        >
      </div>
    </div>
    <hr />
    <div>
      <div class="content" v-html="contentDetail.content"></div>
    </div>
    <div class="recom-div">
      <div class="recom">{{ contentDetail.recom_num }}</div>
      <button class="recom-btn" @click="postRecomandation">
        {{ recom_text }}
      </button>
    </div>
    <!--(gid가 writer 같을때만 보이고 함수에서도 체크)-->
    <div class="btn-div">
      <button @click="pushModify" v-if="isGid">수정</button>
      <button @click="deleteContent" v-if="isGid">삭제</button>
    </div>
  </div>
  <hr />
  <div>
    <div>
      <div v-for="(comment, index) in commentList" :key="comment">
        <div class="comment-writer-div">
          <div class="comment-writer">{{ comment.writer }}</div>
          <div class="comment-date">{{ dateFormat(comment.date) }}</div>
        </div>
        <div class="comment-content-div">
          <div class="comment-content">{{ comment.content }}</div>
          <div
            class="comment-delete"
            v-if="this.equlCommentWriter(comment.writer)"
            @click="this.deleteComment(comment.comment_id, index)"
          >
            삭제
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div style="padding-bottom: 30px">
      <div class="comment-write">댓글 쓰기</div>
      <div class="comment-post">
        <textarea
          class="comment-textarea"
          name=""
          id=""
          cols="1"
          v-model="comment_content"
        ></textarea>
        <input
          class="comment-btn"
          type="button"
          value="등록"
          @click="postComment"
        />
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
    this.getCommentList();
  },
  data() {
    return {
      contentDetail: {},
      is_like: false,
      commentList: [],
      comment_content: "",
    };
  },
  methods: {
    // 게시글 불러오기 api 호출
    getContentDetail(content_id) {
      this.axios
        .get("/content/" + content_id, {
          params: {
            user_id: this.store.state.gid,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          console.log(res.data);
          this.contentDetail = res.data.content;
          this.is_like = res.data.is_like;
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
        });
    },
    // 게시글 삭제 api 호출
    deleteContent() {
      if (this.store.state.gid != this.contentDetail.writer) {
        alert("작성한 사용자만 삭제할 수 있습니다.");
        return;
      }
      this.axios
        .delete("/content/" + this.content_id, {
          params: {
            file: this.contentDetail.file,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.$router.replace({
            name: "main",
          }); //이동인데 뒤로가기 안됨
        });
    },
    //수정 페이지로 이동
    pushModify() {
      if (this.store.state.gid != this.contentDetail.writer) {
        alert("작성한 사용자만 수정할 수 있습니다.");
        return;
      }
      this.$router.push({
        //이동인데 뒤로가기 됨
        name: "modify",
        params: {
          contentDetail: JSON.stringify(this.contentDetail),
        },
      });
    },
    // 댓글 리스트 불러오기 api 호출
    getCommentList() {
      this.axios
        .get("/comment/list/" + this.content_id)
        .then((res) => {
          this.commentList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 작성 api 호출
    postComment() {
      if (!this.comment_content) {
        alert("댓글을 입력해주세요");
        return;
      }
      if (!this.store.state.gid) {
        alert("로그인 해주세요");
        this.$router.push({
          name: "login",
        });
        return;
      }
      this.axios
        .post("/comment", {
          content: this.comment_content,
          content_id: this.content_id,
          writer: this.store.state.gid,
        })
        .then((res) => {
          this.commentList.push(res.data);
          this.comment_content = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 댓글 삭제 api 호출
    deleteComment(comment_id, index) {
      if (this.store.state.gid == this.commentList[index].writer) {
        alert("작성한 사용자만 삭제할 수 있습니다.");
        return;
      }
      this.axios
        .delete("/comment/" + comment_id)
        .then((res) => {
          this.commentList.splice(index, 1);
          alert("삭제 되었습니다.");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //댓글 작성자와 현재 접속 id 같은지 유무
    equlCommentWriter(writer) {
      if (this.store.state.gid == writer) {
        return true;
      } else {
        return false;
      }
    },

    //추천 기능
    postRecomandation() {
      //is_like가 false고 gid가 없어 그러면 로그인 화면으로 ->
      //로그인은 함
      //is_like가 false 그러면 추천
      //is_like가 true 그러면 추천 취소
      if (!this.store.state.gid) {
        alert("추천은 로그인한 사용자만 가능합니다");
        return;
      }
      this.axios
        .post("/like/" + this.contentDetail.content_id, {
          writer: this.store.state.gid,
          is_like: this.is_like ? 1 : 0,
        })
        .then((res) => {
          console.log(res);
          this.is_like = res.data.is_like;
          if (this.is_like) this.contentDetail.recom_num++;
          else this.contentDetail.recom_num--;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //날짜 포맷해주는 함수 2024-02-23T06:45:50.000Z -> 2024-02-23/06:45:50
    dateFormat(date) {
      let d = new Date(date);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    },

    saveBtn() {
      try {
        let element = document.createElement("a");
        element.setAttribute("href", "localhost:3030/download");
        element.setAttribute("download", this.contentDetail.file);
        element.click();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    isGid() {
      if (this.store.state.gid == this.contentDetail.writer) {
        return true;
      } else {
        return false;
      }
    },
    recom_text() {
      if (this.is_like) {
        return "추천 취소";
      } else {
        return "추천";
      }
    },
  },
};
</script>
<style scoped>
.title-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
}
.title {
  font-size: 20px;
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

.file-div {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.content {
  text-align: left;
  width: 100%;
  padding: 18% 3px 9% 0;
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
  padding: 10px 30px;
  background-color: transparent;
  font-size: 16px;
}
.btn-div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-div button {
  background-color: rgb(251, 251, 251);
  padding: 8px 25px;
  margin: 5px;
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
  margin: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.comment-content {
  text-align: left;
}

.comment-textarea {
  width: 90%;
  resize: none;
  margin-right: 8px;
  padding: 5px;
}
.comment-btn {
}

.comment-delete {
  background-color: rgb(236, 236, 236);
  padding: 3px 6px;
  border-radius: 6px;
}
</style>
