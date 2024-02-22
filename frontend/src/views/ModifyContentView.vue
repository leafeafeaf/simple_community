<template>
  <div class="modify-div">
    <form class="modify" @submit="putContent">
      <div>
        <input
          class="title"
          type="text"
          placeholder="제목을 입력해 주세요."
          v-model="this.content_body.title"
        />
      </div>
      <div>
        <input class="file" type="file" />
      </div>
      <div>
        <textarea
          class="content"
          name=""
          id=""
          rows="30"
          v-model="this.content_body.content"
        ></textarea>
      </div>
      <div class="btn-div">
        <button type="submit" class="btn">등록</button>
        <button class="btn"><router-link to="/">취소</router-link></button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  setup() {},
  created() {
    console.log(this.$route.params.contentDetail);
  },
  data() {
    return {
      content_body: JSON.parse(this.$route.params.contentDetail),
    };
  },
  methods: {
    //게시글 내용 가져오기 이건 상세 게시글에서 넘겨받아라
    //게시글 수정 api호출
    putContent() {
      this.axios
        .put("/content/" + this.content_body.content_id, this.content_body)
        .then((res) => {
          console.log("성공", res);
        })
        .catch((res) => {
          console.error("실패", res);
        });

      this.$router.push({
        path: "/content/",
        name: "content",
        params: {
          content_id: this.content_body.content_id,
        },
      });
    },
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
