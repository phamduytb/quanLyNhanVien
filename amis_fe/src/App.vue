<template>
  <div class="container">
    <TheSideBar></TheSideBar>
    <div class="main-wrapper">
      <TheHeader></TheHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheSideBar from "./components/layout/sidebar/TheSidebar.vue";
import TheHeader from "./components/layout/header/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheSideBar,
    TheHeader,
  },
};
</script>

<style>
@import url(@/assets/css/main.css);
</style>
