import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//vuex 모듈 불러오기
import { store } from "./store";

//서버와의 통신(http)을 위한 모듈
import axios from "axios";
//기본 url 설정
axios.defaults.baseURL = "https://0 0.0.0.0:3030";

const app = createApp(App);

//axios 전역 설정 (전역 변수)  ----> 안하면 axios 쓰는 곳 마다 import해줘야함
app.config.globalProperties.axios = axios;
app.config.globalProperties.store = store;

//라우터 모듈과 axios 모듈 사용
//public/index.html 안 id가 app인 요소와 마운트(연결)
app.use(router).use(axios).use(store).mount("#app");
