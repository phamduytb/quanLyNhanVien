<template>
  <div class="textfield-container">
    <div class="textfield__header">
      <label for="" class="textfield-label tooltip">
        {{ label }}
        <span class="textfield--required" v-if="isRequiredLabel">*</span>
        <div class="tooltip-text" v-if="tooltip">
          {{ tooltip }}
        </div>
      </label>
    </div>
    <!-- 'textfield__input--required': !this.value && this.tooltipError
    Hai điều kiện để khi nhập kí tự vào trường bắt buộc nhập ta bỏ lỗi luôn -->
    <div class="textfield__main">
      <input
        ref="refInput"
        type="text"
        class="textfield__input"
        :placeholder="placeholder"
        :tabindex="tabindex"
        v-model="value"
        @blur="blurOnInput"
        :class="{
          'textfield__input--required': this.tooltipError,
        }"
      />

      <div
        class="error-info error-bg"
        v-if="this.tooltipError"
        style="top: 33px; left: -32px"
      >
        <div class="error-arrow error-bg" style="left: 50%; top: -15%"></div>
        <div class="error-text">{{ tooltipContent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MTextfield",
  props: {
    //binding dữ liệu giữa component hiện tại với nơi sử dụng nó.
    modelValue: String,
    // nhãn của textfield
    label: String,
    // Nhãn (dấu *) thể hiển textfield bắt buộc nhập
    isRequiredLabel: Boolean,
    //placeholder của ô input
    placeholder: String,
    //Thêm tooltip với những tên viết tắt
    tooltip: String,
    // Điều kiện hiển thị tooltip khi 1 trường lỗi.
    tooltipError: Boolean,
    //Nội dung tooltip của 1 trường lỗi
    tooltipContent: String,

    tabindex: Number,
    //Thông báo 1 trường bắt buộc nhập
    // errorMsg: String,
  },
  data() {
    return {
      //Giá trị của textfield
      value: null,
    };
  },
  created() {
    this.value = this.modelValue;
  },
  watch: {
    //Thay đổi dữ liệu bên ngoài khi giá trị ô input thay đổi.
    value: function (newValue) {
      this.$emit("update:modelValue", newValue);
    },
    //modelValue dữ liệu nhận từ bên ngoài vào - ý nghĩa của hàm này ????
    modelValue: function (newValue) {
      this.value = newValue;
    },
  },
  methods: {
    /**
     * Hàm bắt sự kiện blur qua các ô input
     * Author: PDDUY (01/07/2023)
     */
    blurOnInput() {
      this.$emit("blurOnRequired");
    },
  },
};
</script>

<style scoped></style>
