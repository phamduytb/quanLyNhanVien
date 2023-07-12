<!-- Dialog cảnh báo: Xóa nhân viên, dữ liệu bị thay đổi -->
<template>
  <div class="dialog-container">
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <div class="dialog-header__title">
          {{ $_MISAResource.TextVi.Dialog.Title.Warning }}
        </div>
        <button
          class="icon-24 dialog-header__icon tooltip btn-close"
          @click="btnCloseDialogOnClick"
        >
          <i class="icofont-close-line"></i>
          <div class="tooltip-text">
            {{ $_MISAResource.TextVi.ToolTip.Close }}
          </div>
        </button>
      </div>
      <div class="dialog-body">
        <div class="icon dialog-body__icon icon--warning"></div>
        <div class="dialog-body__detail">{{ messageDialog }}</div>
      </div>
      <div class="dialog-footer dialog-wraning__footer">
        <MButton
          class="btn--secondary"
          :text="$_MISAResource.TextVi.Button.No"
          @click="btnCloseDialogOnClick"
        ></MButton>
        <MButton :text="$_MISAResource.TextVi.Button.Yes"> </MButton>
      </div>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/base/button/MButton.vue";
export default {
  name: "MDialogWarning",
  props: {
    messageDialog: String,
  },
  components: {
    MButton,
  },
  data() {
    return {};
  },
  methods: {
    btnCloseDialogOnClick() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./dialog.css);
</style>
