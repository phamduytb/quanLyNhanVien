<template>
  <div class="container">
    <TheSideBar></TheSideBar>
    <div class="main-wrapper">
      <TheHeader></TheHeader>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script>
import TheSideBar from "./components/layout/sidebar/TheSidebar.vue"
import TheHeader from "./components/layout/header/TheHeader.vue"
import TheContent from "./components/layout/content/TheContent.vue"
export default {
  name: 'App',
  components: {
    TheSideBar, TheHeader, TheContent
  }
}
</script>

<style>
  @import url(@/css/main.css);
</style>
