<template>
  <div class="textfield-container">
    <div class="textfield__header">
      <label for="" class="textfield-label">
        {{ label }}
        <span class="textfield--required" v-if="inputRequired">*</span>
      </label>
    </div>
    <input type="text" class="textfield__input" v-model="value" />
    <!-- <span>{{inputValue}}</span> -->
    <!-- <span class="textfield__message">Mã không được để trống</span> -->
  </div>
</template>

<script>
export default {
  name: "MTextfield",
  props: {
    label: String,

    inputRequired: Boolean,

    modelValue: String,
  },

  watch: {
    modelValue: function (newValue) {
      this.value = newValue;
    },
    value: function (newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  // created() {
  //     console.log(this.inputValue);
  //     this.inputData = this.inputValue;
  // },
  data() {
    return {
      value: null,
    };
  },
};
</script>

<style scoped>
@import url(../../../../css/base/icon.css);
@import url(./textfield.css);
</style>
