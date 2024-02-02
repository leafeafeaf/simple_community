<template>
  <div>
    <div class="sort-div">
      <div>최신순</div>
      <div>댓글순</div>
      <div>조회수순</div>
      <div>추천순</div>
    </div>

    <div class="content-list-div">게시글 리스트</div>
    <div class="down-button-div">
      <button class="write-button">게시글 작성</button>
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
export default {};
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
