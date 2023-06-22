<!-- Dialog thông báo lỗi: Các trường không được để trống, mã trùng -->
<template>
    <div class="dialog-container">
        <div class="dialog-wrapper">
            <div class="dialog-header">
                <div class="dialog-header__title">Dữ liệu không hợp lệ</div>
                <button class="icon-24 dialog-header__icon tooltip btn-close">
                    <i class="icofont-close-line"></i>
                    <div class="tooltip-text">Đóng (ESC)</div>
                </button>
            </div>
            <div class="dialog-body">
                <div class="icon  dialog-body__icon icon--error"></div>
                <div class="dialog-body__detail"></div>
            </div>
            <div class="dialog-footer dialog-wraning__footer">
                <div class="tooltip">
                    <MButton :text="this.textCloseButton"></MButton>
                    <div class="tooltip-text">{{this.textTooltipClose}}</div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import MISAResource from '@/lib/resource';
import MButton from '@/components/base/button/MButton.vue';
export default {
    name: "MDialogError",
    props: {

    },
    components: {
        MButton
    },
    data() {
        return {
            //#region  MISAResource 
            textCloseButton: MISAResource.TextVi.Dialog.Close,
            //tooltip
            textTooltipClose:MISAResource.TextVi.ToolTip.Close,
            //#endregion  MISAResource 
        }
    },
}
</script>

<style scoped>

</style>