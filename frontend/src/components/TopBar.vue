<template lang="">
  <div class="topbar-div">
    <div class="left-div">
      <router-link to="/" class="logo">Ya민철</router-link>
    </div>
    <div class="right-div">
      <div class="login-div"><router-link to="/login">로그인</router-link></div>
      <div class="sign-div"><router-link to="/sign">회원가입</router-link></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
a {
  text-decoration-line: none;
  color: black;
}
.topbar-div {
  display: flex;
  justify-content: space-between;
  background-color: rgb(181, 215, 245);
  padding: 10px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}
.right-div {
  display: flex;
  width: 200px;
  justify-content: space-around;
  align-items: center;
}
.login-div {
  font-size: 16px;
  font-weight: bold;
}

.sign-div {
  font-size: 16px;
  font-weight: bold;
}
</style>
