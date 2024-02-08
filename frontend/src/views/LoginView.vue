<template>
  <form action="" method="">
    <div class="id-div">
      <div class="id-div-div">
        <span class="id">아이디</span> <input type="text" name="" id="" />
      </div>
    </div>
    <div class="pw-div">
      <div class="pw-div-div">
        <span class="pw">비밀번호</span> <input type="password" name="" id="" />
      </div>
    </div>
    <div class="btn-div">
      <input class="btn" type="button" value="로그인" />
    </div>
  </form>
</template>
<script>
export default {};
</script>

<style scoped>
.id-div {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.id-div-div {
  width: 250px;
  display: flex;
  justify-content: space-between;
}
.id {
  font-weight: bold;
}

.pw-div {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.pw-div-div {
  width: 250px;
  display: flex;
  justify-content: space-between;
}
.pw {
  font-weight: bold;
}

.btn-div {
  margin: 10px;
}
.btn {
  width: 250px;
  padding: 5px;
  font-weight: bold;
}
</style>
