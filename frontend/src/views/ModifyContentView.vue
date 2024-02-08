<template>
  <div class="modify-div">
    <form class="modify" action="" method="">
      <div>
        <input class="title" type="text" placeholder="제목을 입력해 주세요." />
      </div>
      <div>
        <input class="file" type="file" name="" id="" />
      </div>
      <div>
        <textarea class="content" name="" id="" rows="30"></textarea>
      </div>
      <div class="btn-div">
        <button type="submit" class="btn">
          <router-link to="/content">등록</router-link>
        </button>
        <button class="btn"><router-link to="/">취소</router-link></button>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
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
