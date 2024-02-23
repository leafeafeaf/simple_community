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
