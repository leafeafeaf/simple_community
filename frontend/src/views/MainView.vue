<template>
  <div>
    <div class="sort-div">
      <div>최신순</div>
      <div>댓글순</div>
      <div>조회수순</div>
      <div>추천순</div>
    </div>
    <div class="content-list-div">
      게시글 리스트
      <div
        class="content-list-for"
        v-for="content in contentList"
        :key="content"
        @click="this.$router.push('content')"
      >
        <div class="content-list-detail">
          <div class="content-recom-num">{{ content.recom_num }}</div>
          <div>|</div>
          <div>
            <div class="detail-title">
              <div class="content-title">{{ content.title }}</div>
              <div class="content-comment-num">[{{ content.comment_num }}]</div>
            </div>
            <div class="detail-inform">
              <div class="content-date">2초전 /</div>
              <div class="content-writer">{{ content.writer }}</div>
            </div>
          </div>
        </div>
        <div class="content-view-num">{{ content.view_num }}</div>
      </div>
    </div>
    <div class="down-button-div">
      <button class="write-button">
        <router-link to="/write">글쓰기</router-link>
      </button>
      <button class="famous-button">인기글</button>
    </div>

    <div class="page-nav">
      <span>&lt;&lt;</span>
      <span>&lt;</span>
      <span class="page-num">1</span>
      <span class="page-num">2</span>
      <span>...</span>
      <span class="page-num">100</span>
      <span>></span>
      <span>>></span>
    </div>

    <div class="search-div">
      <button>Q</button>
      <input type="text" name="" id="" />
      <select name="" id="">
        <option value="">제목</option>
        <option value="">작성자</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  setup() {}, //페이지 생성시 실행되는 코드

  data() {
    //변수 선언
    return {
      contentList: [
        {
          content_id: 1,
          title: "롤하자",
          writer: "야민철",
          date: new Date(),
          view_num: 5,
          comment_num: 6,
          recom_num: 7,
        },
        {
          content_id: 2,
          title: "롤하자2",
          writer: "야민철",
          date: new Date(),
          view_num: 5,
          comment_num: 6,
          recom_num: 7,
        },
        {
          content_id: 3,
          title: "롤하자3",
          writer: "야민철",
          date: new Date(),
          view_num: 5,
          comment_num: 6,
          recom_num: 7,
        },
      ],
    };
  },
  methods() {
    //함수 설정하는 곳
    return {
      //게시글 리스트 불러오기 api
      getContentList() {
        return 10;
      },
    };
  },
};
</script>
<style>
.sort-div {
  display: flex;
  padding: 5px;
  background: #f3f3e4;
  border: 0px solid black;
  border-radius: 6px;
  box-shadow: 0.1px 0.1px 0px 0.8px;
  margin-bottom: 5px;
}
.sort-div div {
  text-decoration: underline;
  color: blue;
  margin-left: 5px;
}
.content-list-div {
  background-color: aqua;
  height: 500px;
}

.content-list-for {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blanchedalmond;
  margin: 5px;
  padding: 0 16px;
}
.content-list-detail {
  display: flex;
  align-items: center;
}
.content-list-detail > div {
  margin: 8px;
}
.detail-title {
  display: flex;
  align-items: center;
}
.detail-inform {
  display: flex;
  align-items: center;
}
.content-writer {
  font-size: 12px;
}

.content-title {
  color: blue;
  margin-right: 8px;
}

.content-title:hover {
  text-decoration: underline;
}
.content-date {
  color: rgb(158, 157, 157);
  font-size: 12px;
  margin-right: 8px;
}
.content-recom-num {
}
.content-comment-num {
  color: blue;
}
.content-view-num {
}

.down-button-div {
  display: flex;
  justify-content: space-between;
}
.write-button {
}
.famous-button {
}
.page-nav {
}
.page-nav span {
  margin-left: 6px;
  font-weight: bold;
}
.page-num {
  text-decoration: underline;
}

.search-div {
}
</style>
