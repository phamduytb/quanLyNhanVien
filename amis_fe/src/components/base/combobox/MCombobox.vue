<template>
  <div class="combobox">
    <input
      type="text"
      class="combobox__input"
      :value="textSearch"
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
export default {
  name: "MCombobox",
  props: {
    api: String,

    propName: String,
  },
  data() {
    return {
      items: [],
      itemsFilter: [],
      isShowData: false,
      itemSelected: {},
      textSearch: "",
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
  },
  watch: {
    // Theo dõi sự thay đổi khi nhập liệu vào ô input
  },
  methods: {
    /**
     * Hàm ẩn hiện data của combobox
     * Author: PDDUY (27/06/2023)
     */
    onShowHideData() {
      try {
        this.isShowData = !this.isShowData;
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
        this.textSearch = value;
        this.isShowData = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện di chuyển mũi tên lên xuống trong ô input của combobox
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
          if (event.keyCode == 40) {
            if (this.indexSelected < maxLength - 1) {
              this.indexSelected++;
            }
          } else if (event.keyCode == 38) {
            if (this.indexSelected > 0) {
              this.indexSelected--;
            }
          } else if (event.keyCode == 13) {
            this.itemSelected = this.itemsFilter[this.indexSelected];
            this.textSearch = this.itemSelected[this.propName];
            this.isShowData = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url(./combobox.css);
</style>
