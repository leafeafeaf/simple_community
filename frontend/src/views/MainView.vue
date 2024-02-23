<template>
  <div>
    <div class="sort-div">
      <div @click="getContentList(0, 'late')">최신순</div>
      <div @click="getContentList(0, 'comment')">댓글순</div>
      <div @click="getContentList(0, 'view')">조회수순</div>
      <div @click="getContentList(0, 'recom')">추천순</div>
      <button type="button" @click="test">test</button>
    </div>
    <div class="content-list-div">
      <hr />
      <div v-for="content in contentList" :key="content">
        <div
          class="content-list-for"
          @click="this.pushContentDetail(content.content_id)"
        >
          <div class="content-list-detail">
            <div class="content-recom-num">{{ content.recom_num }}</div>
            <div>|</div>
            <div>
              <div class="detail-title">
                <div class="content-title">{{ content.title }}</div>
                <div class="content-comment-num">
                  [{{ content.comment_num }}]
                </div>
              </div>
              <div class="detail-inform">
                <div class="content-date">{{ dateFormat(content.date) }} /</div>
                <div class="content-writer">{{ content.writer }}</div>
              </div>
            </div>
          </div>
          <div class="content-view-num">{{ content.view_num }}</div>
        </div>
        <hr />
      </div>
    </div>
    <div class="down-button-div">
      <button class="write-button">
        <router-link to="/write">글쓰기</router-link>
      </button>
      <button class="famous-button" @click="getContentList(0, 'famous')">
        인기글
      </button>
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
      <select name="" id="" v-model="this.search_type">
        <option value="0">제목</option>
        <option value="1">작성자</option>
      </select>
      <input type="text" name="" id="" v-model="this.search_text" />
      <button @click="searchContent">Q</button>
    </div>
  </div>
</template>
<script>
export default {
  setup() {}, //페이지 생성시 실행되는 코드
  created() {
    this.getContentList();
  },

  data() {
    //변수 선언
    return {
      contentList: [], // 게시글 리스트
      search_text: "", // 검색어 저장
      search_type: 0, //검색 종류 (0 : 제목, 1 : 작성자)
      sort_type: "view", //정렬 기준 (page할때 사용할 예정)
    };
  },
  methods: {
    test() {
      console.log(this.store.state.gid);
    },

    //함수 설정하는 곳
    //백엔드에서 게시글 리스트 들고 오기 //미완(페이지, 정렬, 검색, 검색어 매개변수 추가)
    getContentList(page = 0, sort = "late", search, search_content) {
      this.sort_type = sort;
      this.axios
        .get("/content/list", {
          params: {
            page: page || 0,
            sort: sort,
            search: search,
            search_content: search_content,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          this.contentList = res.data;
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
        });
    },
    //게시글 상세 내용으로 페이지 이동
    pushContentDetail(content_id) {
      this.$router.push({
        path: "/content/",
        name: "content",
        params: {
          content_id: content_id,
        },
      });
    },
    //검색
    searchContent() {
      console.log(this.search_type);
      this.getContentList(0, "late", this.search_type, this.search_text);
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
}

.content-list-for {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
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
