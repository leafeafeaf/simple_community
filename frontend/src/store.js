//vuex 상태 관리 라이브러리를 위한 파일
import { createStore } from "vuex";

export const store = createStore({
  state: {
    gid: null,
  },
  mutations: {
    setGid(state, payload) {
      state.gid = payload.user_id;
    },
  },
  actions: {},
  getters: {},
});
