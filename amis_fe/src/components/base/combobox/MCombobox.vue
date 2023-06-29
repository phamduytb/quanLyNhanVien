<template>
  <div class="combobox">
    <input
      type="text"
      class="combobox__input"
      v-model="textSelected"
      ref="refCombobox"
      @click="onShowData"
      @input="onInputSearch"
      @keydown="onInputKeyDown"
    />
    <div class="combobox__icon" @click="onShowHideData">
      <i class="icofont-caret-down"></i>
    </div>
    <div class="combobox__data" v-show="isShowData">
      <div
        class="data-item"
        v-for="(item, index) in itemsFilter"
        :key="index"
        @click="onSelectItem(item)"
        :class="{ 'data-item--selected': index == indexSelected }"
      >
        {{ item[propName] }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MISAEnum from "@/js/base/enum";
export default {
  name: "MCombobox",
  props: {
    api: String,

    propName: String,

    // modelValue: String,
  },
  data() {
    return {
      items: [],
      itemsFilter: [],
      isShowData: false,
      itemSelected: {},
      textSelected: null,
      indexSelected: 0,
    };
  },
  async created() {
    // Gọi API lấy dữ liệu cho data-item
    if (this.api) {
      await axios
        .get(this.api)
        .then((response) => {
          this.items = response.data;
          this.itemsFilter = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    }
    //lắng nghe sự kiện click ra bên ngoài combobox
    document.addEventListener("click", this.onClickOutSideCombobox);
    //
    // this.textSelected = this.modelValue;
  },
  watch: {
    // Theo dõi sự thay đổi khi nhập liệu vào ô input
    textSelected: function (newValue) {
      // this.$emit("update:modelValue", newValue);
      this.textSelected = newValue;
    },
    // modelValue: function (newValue) {
    //   this.textSelected = newValue;
    // },
  },
  methods: {
    /**
     * Hàm ẩn hiện data của combobox
     * Author: PDDUY (27/06/2023)
     */
    onShowHideData() {
      try {
        this.isShowData = !this.isShowData;
        this.$refs.refCombobox.focus();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm hiện data của combobox
     * Author: PDDUY (27/06/2023)
     */
    onShowData() {
      try {
        this.isShowData = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click bên ngoài combobox thì ẩn data
     * @param {*} event
     * Author: PDDUY (29/06/2023)
     */
    onClickOutSideCombobox(event) {
      try {
        if (!this.$el.contains(event.target)) {
          this.isShowData = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm chọn 1 item trong data thì hiển thị item đó lên ô input của combobox
     * @param {} item
     * Author: PDDUY (27/06/2023)
     */
    onSelectItem(item) {
      try {
        this.itemSelected = item;
        this.textSelected = this.itemSelected[this.propName];
        this.isShowData = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm nhập vào ô input để tìm kiếm data_item
     * @param {*} event
     * Author: PDDUY (27/06/2023)
     */
    onInputSearch(event) {
      try {
        const value = event.target.value;
        const propName = this.propName;
        this.itemsFilter = this.items.filter((item) =>
          item[propName].toLowerCase().includes(value.toLowerCase())
        );
        // this.textSearch = value;

        this.isShowData = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện keydown qua các data_item của combobox
     * @param {*} event
     * Author: PDDUY (27/06/2023)
     */
    onInputKeyDown(event) {
      try {
        const maxLength = this.itemsFilter.length;
        if (maxLength == 0) {
          return;
        } else {
          // ấn mũi tên xuống
          if (event.keyCode == MISAEnum.KeyCode.ArrowDown) {
            this.isShowData = true;
            if (this.indexSelected < maxLength - 1) {
              this.indexSelected++;
            }
          }
          // Ấn phím mũi tên lên
          else if (event.keyCode == MISAEnum.KeyCode.ArrowUp) {
            if (this.indexSelected > 0) {
              this.indexSelected--;
            }
          }
          // ấn phím enter
          else if (event.keyCode == MISAEnum.KeyCode.Enter) {
            this.itemSelected = this.itemsFilter[this.indexSelected];
            this.textSelected = this.itemSelected[this.propName];
            this.isShowData = false;
          } else {
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  unmounted() {
    //Ngừng lắng nghe sự kiện click ra bên ngoài combobox khi component bị hủy
    document.removeEventListener("click", this.onClickOutSideCombobox);
  },
};
</script>

<style scoped>
@import url(./combobox.css);
</style>
