<template lang="">
  <form action="" method="">
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
            <input type="password" name="" id="" />
            <div>비밀번호는 8~60자로 되어야 함</div>
          </td>
        </tr>
        <tr>
          <th class="table-row">
            <div class="info">비밀번호 확인</div>
          </th>
          <td>
            <input type="password" name="" id="" />
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
      <button type="submit" class="btn">등록</button>
      <button class="btn"><router-link to="/">취소</router-link></button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      is_id: false,
      is_email: false,
      user_id: "",
      email: "",
    };
  },
  methods: {
    //함수 설정하는 곳
    //백엔드에서 id 중복 체크하기
    getIdCheck() {
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
      this.axios
        .get("/email-check", {
          params: {
            email: this.email,
          },
        })
        //정상적으로 응답이 왔을시 실행, naver.com만 가능
        .then((res) => {
          this.is_email = res.data.result;
          if (this.is_email == true && this.email.includes("@naver.com")) {
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
