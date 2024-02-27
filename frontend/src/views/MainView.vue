<template>
  <div>
    <div class="sort-div">
      <div @click="getContentList(0, 'late')">최신순</div>
      <div @click="getContentList(0, 'comment')">댓글순</div>
      <div @click="getContentList(0, 'view')">조회수순</div>
      <div @click="getContentList(0, 'recom')">추천순</div>
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
    <div class="page-div">{{ curr_page }}/{{ page_count }}</div>
    <div class="down-button-div">
      <button class="write-button" @click="pushWrite">글쓰기</button>
      <button class="famous-button" @click="getContentList(0, 'famous')">
        인기글
      </button>
    </div>

    <div class="page-nav">
      <button
        class="nav-btn"
        @click="getContentList(0, sort_type, search_type, search_text)"
      >
        처음
      </button>
      <button
        class="nav-btn"
        @click="
          getContentList(curr_page - 2, sort_type, search_type, search_text)
        "
        :disabled="prevDisable"
      >
        이전
      </button>
      <div
        v-for="page in pagingNavigation"
        :key="page"
        :class="{ curr: isCurrPage(page) }"
      >
        <span
          class="page-num"
          @click="getContentList(page - 1, sort_type, search_type, search_text)"
          >{{ page }}</span
        >
      </div>
      <button
        class="nav-btn"
        @click="getContentList(curr_page, sort_type, search_type, search_text)"
        v-bind:disabled="nextDisable"
      >
        다음
      </button>
      <button
        class="nav-btn"
        @click="
          getContentList(page_count - 1, sort_type, search_type, search_text)
        "
      >
        끝
      </button>
    </div>
    <div class="search-div">
      <select class="search-select" name="" id="" v-model="this.search_type">
        <option value="0">제목</option>
        <option value="1">작성자</option>
      </select>
      <input
        type="text"
        name=""
        class="search-text"
        v-model="this.search_text"
      />
      <button class="search-btn" @click="searchContent">검색</button>
    </div>
  </div>
</template>
<script>
export default {
  setup() {}, //페이지 생성시 실행되는 코드
  created() {
    this.getContentList(
      this.curr_page - 1,
      this.sort_type,
      this.search_type,
      this.search_text
    );
  },

  data() {
    //변수 선언
    return {
      contentList: [], // 게시글 리스트
      search_text: "", // 검색어 저장
      search_type: 0, //검색 종류 (0 : 제목, 1 : 작성자)
      sort_type: "late", //정렬 기준 (page할때 사용할 예정)\
      content_count: 0,
      page_count: 0,
      curr_page: 1,
    };
  },
  methods: {
    isCurrPage(page) {
      if (page == this.curr_page) return true;
      else return false;
    },

    //함수 설정하는 곳
    //백엔드에서 게시글 리스트 들고 오기 //미완(페이지, 정렬, 검색, 검색어 매개변수 추가)
    getContentList(page = 0, sort = "late", search, search_content) {
      console.log(page + " " + sort + " " + search + " " + search_content);

      this.curr_page = page + 1;
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
          this.contentList = res.data.rows;
          this.content_count = res.data.count;
          this.page_count = Math.ceil(this.content_count / 30);
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
    //글쓰기 버튼 클릭시 로그인상태면 글쓰기 페이지로 -> 아니면 로그인 페이지로
    pushWrite() {
      if (!this.store.state.gid) {
        alert("로그인이 필요한 기능입니다.");
        this.$router.push({
          name: "login",
        });
      } else {
        this.$router.push({
          name: "write",
        });
      }
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
  computed: {
    pagingNavigation: function () {
      let pagearr = [];
      let start_page = this.curr_page - 1 < 2 ? 1 : this.curr_page - 2;
      let end_page =
        this.page_count - this.curr_page < 2
          ? this.page_count
          : this.curr_page + 2;
      for (let i = start_page; i <= end_page; i++) {
        pagearr.push(i);
      }
      return pagearr;
    },
    prevDisable() {
      if (this.curr_page == 1) {
        return true;
      } else {
        return false;
      }
    },
    nextDisable() {
      if (this.curr_page == this.page_count) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
.sort-div {
  display: flex;
  padding: 10px;
  background: #e6f8ff;
  border: 0px solid black;
  border-radius: 6px;
  box-shadow: 0.1px 0.1px 0px 0.8px;
  margin-bottom: 5px;
}
.sort-div div {
  color: black;
  margin-left: 10px;
}
.sort-div div:hover {
  font-weight: bold;
}
.content-list-div {
  margin: 5px;
}

.content-list-for {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 18px;
  padding: 0 10px;
}
.content-list-detail {
  display: flex;
  align-items: center;
}
.content-list-detail > div {
  margin: 4px;
}
.detail-title {
  display: flex;
  align-items: center;
}
.detail-inform {
  display: flex;
  align-items: flex-end;
}
.content-writer {
  font-size: 14px;
}

.content-title {
  color: blue;
  margin-right: 12px;
  margin-left: 4px;
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
  font-size: 20px;
  padding-right: 18px;
}
.content-comment-num {
  color: blue;
}
.content-view-num {
}

.page-div {
  font-size: 18px;
  color: #aaaaaa;
  padding-right: 12px;
}
.down-button-div {
  display: flex;
  justify-content: space-between;
}
.write-button {
  background-color: transparent;
  font-size: 16px;
  padding: 10px 20px;
}
.famous-button {
  background-color: transparent;
  font-size: 16px;
  padding: 10px 20px;
}
.page-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.page-nav * {
  margin-left: 10px;
  font-size: 16px;
}
.page-nav div {
  font-weight: bold;
}
.page-nav button {
  background-color: transparent;
  padding: 5px 12px;
}
.page-num {
  text-decoration: underline;
}
.curr {
  color: blue;
}

.search-div {
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding-bottom: 50px;
}

.search-select {
  width: 10%;
  padding: 3px 10px;
  font-size: 16px;
}

.search-text {
  width: 75%;
  height: 35px;
  padding: 3px 18px;
  font-size: 14px;
}

.search-btn {
  width: 10%;
  padding: 0 10px;
  background-color: rgb(250, 250, 250);
}
</style>
