<!-- Dialog thông báo lỗi: Các trường không được để trống, mã trùng -->
<template>
  <div class="dialog-container">
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <div class="dialog-header__title">{{ title }}</div>
        <button
          @click="btnCloseDialogOnClick"
          class="icon-24 dialog-header__icon tooltip btn-close"
        >
          <i class="icofont-close-line"></i>
          <div class="tooltip-text">Đóng (ESC)</div>
        </button>
      </div>
      <div class="dialog-body">
        <div class="icon dialog-body__icon icon--error"></div>
        <div class="dialog-body__detail">
          <ul
            class="dialog-message"
            v-for="(item, index) in errors"
            :key="index"
          >
            <li>{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="dialog-footer dialog-wraning__footer">
        <div class="tooltip">
          <MButton :text="this.textButtonClose" @click="btnCloseDialogOnClick">
          </MButton>
          <div class="tooltip-text">{{ this.textTooltipClose }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MISAResource from "@/js/base/resource";
import MButton from "@/components/base/button/MButton.vue";
export default {
  name: "MDialogError",
  props: ["title", "errors"],
  components: {
    MButton,
  },
  methods: {
    /**
     * Sự kiện click nút đóng và nút x trên dialog
     * Author: PDDUY (24/06/2023)
     */
    btnCloseDialogOnClick() {
      try {
        this.$emit("onCloseDialog");
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      //#region  MISAResource
      textButtonClose: MISAResource.TextVi.Button.Close,
      textTooltipClose: MISAResource.TextVi.ToolTip.Close,
      //#endregion  MISAResource
    };
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./dialog.css);
</style>
