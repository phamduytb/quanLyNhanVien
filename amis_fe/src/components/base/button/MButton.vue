<template>
  <button class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    text: String,
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./button.css);
</style>
