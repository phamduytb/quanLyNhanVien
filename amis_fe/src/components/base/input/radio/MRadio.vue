<template>
  <v-radio-group inline v-model="value">
    <v-radio :label="label1" :value="value1" :tabindex="tabindex1"></v-radio>
    <v-radio :label="label2" :value="value2" :tabindex="tabindex2"></v-radio>
    <v-radio :label="label3" :value="value3" :tabindex="tabindex3"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "MRadio",
  props: {
    // Các nhãn của radio button
    label1: String,
    label2: String,
    label3: String,
    //Các giá trị của radio button
    value1: Number,
    value2: Number,
    value3: Number,
    modelValue: Number,
    //tabindex của các radio button
    tabindex1: Number,
    tabindex2: Number,
    tabindex3: Number,
  },
  data() {
    return {
      value: null,
    };
  },
  created() {
    this.value = this.modelValue;
  },
  watch: {
    value: function (newValue) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue: function (newValue) {
      this.value = newValue;
    },
  },
  methods: {},
};
</script>

<style scoped>
@import url(../../../../css/base/icon.css);
@import url(./radio.css);
</style>
