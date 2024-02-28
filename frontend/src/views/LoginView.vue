<template>
  <form action="" method="" class="login">
    <div class="id-div">
      <div class="id-div-div">
        <span class="id">아이디</span>
        <input type="text" name="" id="" v-model="user_id" class="id-input" />
      </div>
    </div>
    <div class="pw-div">
      <div class="pw-div-div">
        <span class="pw">비밀번호</span>
        <input type="password" name="" id="" v-model="pw" class="pw-input" />
      </div>
    </div>
    <div class="btn-div">
      <input class="btn" type="button" value="로그인" @click="getLogin" />
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      user_id: "",
      pw: "",
    };
  },
  methods: {
    // 로그인 api 호출
    getLogin() {
      this.axios
        .get("/login", {
          params: {
            user_id: this.user_id,
            pw: this.pw,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          if (res.data.result) {
            this.store.commit("setGid", { user_id: this.user_id });
            console.log(this.store.state.gid);
            this.$router.go(-1);
          } else {
            alert(res.data.errMsg);
          }
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 10%;
  padding-bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.id-div {
  display: flex;
  justify-content: center;
  margin-bottom: 11px;
  width: 100%;
}
.id-div-div {
  display: flex;
  justify-content: space-between;
  width: 35%;
  align-items: center;
}
.id {
  font-weight: bold;
}
.id-input {
  width: 70%;
  padding: 6px;
}
.pw-div {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.pw-div-div {
  display: flex;
  justify-content: space-between;
  width: 35%;
  align-items: center;
}

.pw {
  font-weight: bold;
}
.pw-input {
  width: 70%;
  padding: 6px;
}
.btn-div {
  margin-top: 10px;
  width: 100%;
}
.btn {
  padding: 5px;
  font-weight: bold;
  width: 35%;
}
</style>
