<template>
  <div class="modify-div">
    <div class="modify">
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
        <button class="btn" @click="putContent">등록</button>
        <button class="btn"><router-link to="/">취소</router-link></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  created() {
    console.log(this.$route.params.contentDetail);
  },
  mounted() {
    this.content_body.content = this.content_body.content.replaceAll(
      "<br>",
      "\r\n"
    );
  },

  data() {
    var content_body = JSON.parse(this.$route.params.contentDetail);
    return {
      content_body,
    };
  },
  methods: {
    //게시글 내용 가져오기 이건 상세 게시글에서 넘겨받아라
    //게시글 수정 api호출
    async putContent() {
      this.content_body.content = this.content_body.content.replace(
        /(?:\r\n|\r|\n)/g,
        "<br>"
      );
      await this.axios.put(
        "/content/" + this.content_body.content_id,
        this.content_body
      );

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
button {
  background-color: aliceblue;
}
.modify-div {
  display: flex;
  justify-content: center;
}
.modify {
  width: 80%;
}
.title {
  width: 100%;
  padding: 15px 0px 15px 15px;
  margin-bottom: 10px;
}
.file {
  width: 100%;
  margin-bottom: 10px;
  padding: 15px 0px 15px 15px;
  background-color: white;
  border: 1px solid rgb(197, 167, 167);
}
.content {
  width: 100%;
  padding: 15px 0px 15px 15px;
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
  margin-left: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
