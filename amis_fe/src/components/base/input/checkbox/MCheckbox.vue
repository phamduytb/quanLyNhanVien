<template>
  <div class="checkbox-container">
    <div
      class="checkbox"
      @click="checkBoxOnClick"
      :class="{ 'checkbox--active': isCheck }"
    ></div>
    <label v-if="checkboxForm" @click="checkBoxOnClick">
      {{ checkboxLabel }}
    </label>
  </div>
</template>

<script>
export default {
  name: "MCheckbox",
  props: {
    checkboxLabel: String,
    checkboxForm: Boolean,
  },
  methods: {
    checkBoxOnClick() {
      this.isCheck = !this.isCheck;
    },
  },
  data() {
    return {
      isCheck: false,
    };
  },
};
</script>

<style scoped>
@import url(../../../../css/base/icon.css);
@import url(./checkbox.css);
</style>
