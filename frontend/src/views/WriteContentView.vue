<template>
  <div class="write-div">
    <div class="write">
      <div>
        <input
          class="title"
          type="text"
          placeholder="제목을 입력해 주세요."
          v-model="title"
        />
      </div>
      <div>
        <input class="file" type="file" id="file" />
      </div>
      <div>
        <textarea
          class="content"
          name=""
          id=""
          rows="30"
          v-model="content"
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
      title: "",
      content: "",
      writer: this.store.state.gid,
      content_body: {
        file: new FormData(),
      },
    };
  },
  methods: {
    //게시글 작성 api 호출
    postContent() {
      var frm = new FormData();
      var f = document.getElementById("file");
      console.log(f.files[0]);
      frm.append("title", this.title);
      frm.append("content", this.content);
      frm.append("writer", this.writer);
      frm.append("file", f.files[0]);
      var content_id = 0;
      this.axios
        .post("/content", frm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("성공", res);
          content_id = res.data.content_id;
          this.$router.push({
            path: "/content/",
            name: "content",
            params: {
              content_id: content_id,
            },
          });
        })
        .catch((res) => {
          console.error("실패", res);
        })
        .then(() => {});
    },
  },
};
</script>
<style scoped>
button {
  background-color: aliceblue;
}
.write-div {
  display: flex;
  justify-content: center;
}
.write {
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
