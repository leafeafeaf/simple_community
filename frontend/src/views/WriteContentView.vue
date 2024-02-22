<template>
  <div class="write-div">
    <button @click="test">테스트 용</button>
    <div class="write">
      <div>
        <input
          class="title"
          type="text"
          placeholder="제목을 입력해 주세요."
          v-model="content_body.title"
        />
      </div>
      <div>
        <input class="file" type="file" @change="onFileChange" />
      </div>
      <div>
        <textarea
          class="content"
          name=""
          id=""
          rows="30"
          v-model="content_body.content"
        ></textarea>
      </div>
      <div class="btn-div">
        <button class="btn" @click="postContent">등록</button>
        <button class="btn"><router-link to="/">취소</router-link></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content_body: {
        writer: this.gid,
        title: "",
        content: "",
        file: new FormData(),
      },
    };
  },
  methods: {
    test() {
      this.postContent();
    },
    //게시글 작성 api 호출
    postContent() {
      var content_id = 0;
      this.axios
        .post("/content", this.content_body)
        .then((res) => {
          console.log("성공", res);
          content_id = res.data.content_id;
        })
        .catch((res) => {
          console.error("실패", res);
        })
        .then(() => {
          this.$router.push({
            path: "/content/",
            name: "content",
            params: {
              content_id: content_id,
            },
          });
        });
    },
    onFileChange(file) {
      console.log(file.target.files[0].name);
      if (!file) return;
    },
  },
};
</script>
<style scoped>
.write-div {
  display: flex;
  justify-content: center;
}
.write {
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
