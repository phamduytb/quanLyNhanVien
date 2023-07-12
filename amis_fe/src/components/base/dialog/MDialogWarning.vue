<!-- Dialog cảnh báo: Xóa nhân viên, dữ liệu bị thay đổi -->
<template>
  <div class="dialog-container">
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <div class="dialog-header__title">Dữ liệu bị thay đổi</div>
        <button class="icon-24 dialog-header__icon tooltip btn-close">
          <i class="icofont-close-line"></i>
          <div class="tooltip-text">Đóng (ESC)</div>
        </button>
      </div>
      <div class="dialog-body">
        <div class="icon dialog-body__icon icon--warning"></div>
        <div class="dialog-body__detail"></div>
      </div>
      <div class="dialog-footer dialog-wraning__footer">
        <div class="tooltip">
          <MButton
            class="btn--secondary"
            :text="$_MISAResource.TextVi.Button.No"
          ></MButton>
          <div class="tooltip-text"></div>
        </div>
        <div class="tooltip">
          <MButton :text="$_MISAResource.TextVi.Button.Yes"></MButton>
          <div class="tooltip-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/base/button/MButton.vue";
export default {
  name: "MDialogError",
  props: {},
  components: {
    MButton,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./dialog.css);
</style>
