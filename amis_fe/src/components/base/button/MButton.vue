<template>
  <button class="btn tooltip" :tabindex="tabindex">
    <div class="tooltip-text" v-if="tooltip">
      {{ tooltip }}
    </div>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    text: String,
    tabindex: Number,
    //tooltip cho những từ viết tắt
    tooltip: String,
  },
  methods: {},
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./button.css);
</style>
