<template>
  <div class="modify-div">
    <button @click="test">테스트 용</button>
    <form class="modify">
      <div>
        <input class="title" type="text" placeholder="제목을 입력해 주세요." />
      </div>
      <div>
        <input class="file" type="file" />
      </div>
      <div>
        <textarea class="content" name="" id="" rows="30"></textarea>
      </div>
      <div class="btn-div">
        <button type="submit" class="btn">등록</button>
        <button class="btn"><router-link to="/">취소</router-link></button>
      </div>
    </form>
  </div>
  <div>{{ $route.params.contentDetail }}</div>
</template>
<script>
export default {
  setup() {},

  data() {
    return {
      content_body: {},
    };
  },
  methods: {
    test() {
      console.log(this.content_body);
      console.log(this.contentDetail);
    },
    //게시글 내용 가져오기 이건 상세 게시글에서 넘겨받아라
    //게시글 수정 api호출
    putContent() {},
  },
};
</script>
<style scoped>
.modify-div {
  display: flex;
  justify-content: center;
}
.modify {
  width: 80%;
}
.title {
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
}
.file {
  width: 100%;
  margin-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid rgb(197, 167, 167);
}
.content {
  width: 100%;
  resize: none;
  margin-bottom: 10px;
}

.btn-div {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.btn {
  width: 15%;
  padding: 5px;
  margin: 10px;
  font-weight: bold;
}
</style>
