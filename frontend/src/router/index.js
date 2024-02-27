import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView, //이동할 페이지, 정렬 방법, 검색어, 검색방법들을 쿼리로 받는다
  },
  {
    path: "/content/:content_id",
    name: "content",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "content" */ "../views/ContentView.vue"),
    props: true,
  },
  {
    path: "/write",
    name: "write",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "write" */ "../views/WriteContentView.vue"),
  },
  {
    path: "/modify/:contentDetail",
    name: "modify",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "modify" */ "../views/ModifyContentView.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/sign",
    name: "sign",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "sign" */ "../views/SignView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
