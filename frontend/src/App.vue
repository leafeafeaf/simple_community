<template>
  <div class="wrapper">
    <TopBar class="topbar" />
    <router-view />
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
body {
  margin: 0;
}
.topbar {
  margin-bottom: 30px;
}
.wrapper {
  width: 916px;
}
</style>
