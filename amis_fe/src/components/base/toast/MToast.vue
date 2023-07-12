<template>
  <div class="toast-container">
    <div class="toast-content w-full">
      <div class="toast__left icon icon-success"></div>
      <div class="toast__body">
        <div class="toast-body__left">
          <span class="toast-title title-success">{{ toastTitle }}</span>
          {{ toastMsg }}
        </div>
        <div class="toast-body__right toast-action">Hoàn tác</div>
      </div>
      <div
        class="toast__right icon icon-close"
        @click="closeToastOnClick"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MToast",
  props: {
    // Nhãn của toast
    toastTitle: String,
    //Nội dung toast
    toastMsg: String,
  },
  methods: {
    closeToastOnClick() {
      this.$emit("onHideToast");
    },
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./toast.css);
</style>
