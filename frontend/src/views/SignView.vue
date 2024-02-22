<template lang="">
  <div>
    <table class="table">
      <tbody>
        <tr>
          <th class="table-row">
            <div class="info">아이디</div>
          </th>
          <td>
            <div>
              <input type="text" name="" id="" v-model="user_id" />
              <input type="button" value="중복체크" @click="getIdCheck" />
            </div>
            <div>3~20자리 사이의 영문과 숫자로 이루어져야 함</div>
          </td>
        </tr>
        <tr>
          <th class="table-row">
            <div class="info">비밀번호</div>
          </th>
          <td>
            <input type="password" name="" id="" v-model="pw" />
            <div>비밀번호는 4~60자로 되어야 함</div>
          </td>
        </tr>
        <tr>
          <th class="table-row">
            <div class="info">비밀번호 확인</div>
          </th>
          <td>
            <input type="password" name="" id="" v-model="pw_ok" />
            <div>{{ pwCheck }}</div>
          </td>
        </tr>
        <tr>
          <th class="table-row">
            <div class="info">이메일 주소</div>
          </th>
          <td>
            <div>
              <input type="email" name="" id="" v-model="email" />
              <input type="button" value="중복체크" @click="getEmailCheck" />
            </div>
            <div>naver.com 메일 주소만 가입 가능함</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-div">
      <button type="submit" class="btn" @click="postSign">등록</button>
      <button class="btn"><router-link to="/login">취소</router-link></button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_id: false,
      is_email: false,
      is_pw: false,
      user_id: "",
      email: "",
      pw: "",
      pw_ok: "",
    };
  },
  methods: {
    //함수 설정하는 곳
    //백엔드에서 id 중복 체크하기
    getIdCheck() {
      // 아이디 형식 체크
      var regType = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,20}$/;
      if (!regType.test(this.user_id)) {
        alert("아이디 형식이 맞지 않습니다");
        return;
      }

      this.axios
        .get("/id-check", {
          params: {
            user_id: this.user_id,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          this.is_id = res.data.result;
          if (this.is_id == true) {
            alert("사용가능");
          } else {
            alert("사용불가능");
          }
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
        });
    },
    //백엔드에서 email 중복 체크하기
    getEmailCheck() {
      // 이메일 형식 체크
      var regType = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
      if (!regType.test(this.email)) {
        alert("이메일 형식이 맞지 않습니다");
        return;
      }

      this.axios
        .get("/email-check", {
          params: {
            email: this.email,
          },
        })
        //정상적으로 응답이 왔을시 실행
        .then((res) => {
          this.is_email = res.data.result;
          if (this.is_email == true) {
            alert("사용가능");
          } else {
            alert("사용불가능");
          }
        })
        //비정상,오류 시 실행
        .catch((err) => {
          console.error(err);
        });
    },
    // 등록 시 회원 추가
    postSign() {
      // 중복 체크 먼저 해야함
      if (!this.is_id) {
        alert("아이디를 확인해주세요");
        return;
      }
      if (!this.is_email) {
        alert("이메일을 확인해주세요");
        return;
      }
      if (this.pw.length < 4 || this.pw.length > 60) {
        alert("비밀번호 형식이 올바르지 않아요");
        return;
      }
      if (this.pw != this.pw_ok) {
        alert("비밀번호 확인이 같지않아요");
        return;
      }

      // 정상시 유저 등록
      this.axios
        .post("/sign", {
          user_id: this.user_id,
          email: this.email,
          pw: this.pw,
        })
        .then((res) => {
          console.log("성공", res);
        })
        .catch((res) => {
          console.error("실패", res);
        })
        .then(() => {
          this.$router.push({
            name: "login",
          });
        });
    },
  },
  computed: {
    pwCheck() {
      if (
        this.pw.length >= 4 &&
        this.pw.length <= 60 &&
        this.pw_ok.length >= 4 &&
        this.pw_ok.length <= 60
      ) {
        if (this.pw != this.pw_ok) {
          return "두 비밀번호가 같지 않아요";
        } else {
          return "같아요";
        }
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

input {
  width: 200px;
}

.table {
  border-spacing: 10px;
}
.table th {
  padding: 10px 10px 10px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: left;
}
.table td {
  padding: 10px 10px 10px;
  text-align: left;
}
.table-row {
  background-color: #e7dede;
}

.btn-div {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.btn {
  width: 100px;
  padding: 5px;
  margin: 10px;
  font-weight: bold;
}
</style>
