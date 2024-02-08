<template>
  <div class="wrapper">
    <TopBar class="topbar" />
    <router-view />
    <nav>
      <router-link to="/">main</router-link> |
      <router-link to="/write">작성</router-link> |
      <router-link to="/modify">수정</router-link> |
      <router-link to="/content">게시글 보기</router-link> |
      <router-link to="/login">로그인</router-link> |
      <router-link to="/sign">회원가입</router-link>
    </nav>
  </div>
</template>
<script>
import TopBar from "./components/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.topbar {
  margin-bottom: 50px;
}
.wrapper {
  width: 814px;
}
</style>
