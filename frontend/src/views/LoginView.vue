<template>
  <form action="" method="">
    <div class="id-div">
      <div class="id-div-div">
        <span class="id">아이디</span>
        <input type="text" name="" id="" v-model="user_id" />
      </div>
    </div>
    <div class="pw-div">
      <div class="pw-div-div">
        <span class="pw">비밀번호</span>
        <input type="password" name="" id="" v-model="pw" />
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
