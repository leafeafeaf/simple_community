<template lang="">
  <div class="topbar-div">
    <div class="left-div">
      <router-link to="/" class="logo">Ya민철</router-link>
    </div>

    <div class="gid-div" v-if="isLogin" @click="logout">{{ gid }}</div>
    <div class="right-div" v-else>
      <div class="login-div"><router-link to="/login">로그인</router-link></div>
      <div class="sign-div"><router-link to="/sign">회원가입</router-link></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.store.commit("setGid", { user_id: null });
    },
  },
  computed: {
    isLogin() {
      if (this.store.state.gid) {
        return true;
      } else return false;
    },
    gid() {
      if (this.store.state.gid) {
        return this.store.state.gid;
      } else return "";
    },
  },
};
</script>
<style scoped>
a {
  text-decoration-line: none;
  color: black;
}
.topbar-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(181, 215, 245);
  padding: 10px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}
.gid-div {
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
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
