<template>
  <div class="sidebar">
    <div class="sidebar-top">
      <div class="icon icon-24 sidebar-top__icon"></div>
      <div class="sidebar-top__logo"></div>
    </div>

    <div class="sidebar-bottom">
      <router-link to="/home" class="sidebar-item" title="Tổng quan">
        <div class="icon icon-24 icon-overview"></div>
        <div class="sidebar-item__title">Tổng quan</div>
      </router-link>

      <router-link to="/employee" class="sidebar-item" title="Nhân viên">
        <div class="icon icon-24 icon-employee"></div>
        <div class="sidebar-item__title">Nhân viên</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Tiền mặt">
        <div class="icon icon-24 icon-cash"></div>
        <div class="sidebar-item__title">Tiền mặt</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Tiền gửi">
        <div class="icon icon-24 icon-deposits"></div>
        <div class="sidebar-item__title">Tiền gửi</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Mua hàng">
        <div class="icon icon-24 icon-purchase"></div>
        <div class="sidebar-item__title">Mua hàng</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Bán hàng">
        <div class="icon icon-24 icon-sell"></div>
        <div class="sidebar-item__title">Bán hàng</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Quản lý hóa đơn">
        <div class="icon icon-24 icon-receipt"></div>
        <div class="sidebar-item__title">Quản lý hóa đơn</div>
      </router-link>

      <router-link to="/ " class="sidebar-item" title="Kho">
        <div class="icon icon-24 icon-warehouse"></div>
        <div class="sidebar-item__title">Kho</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Công cụ dụng cụ">
        <div class="icon icon-24 icon-tools"></div>
        <div class="sidebar-item__title">Công cụ dụng cụ</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Tài sản cố định">
        <div class="icon icon-24 icon-asset"></div>
        <div class="sidebar-item__title">Tài sản cố định</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Tiền lương">
        <div class="icon icon-24 icon-salary"></div>
        <div class="sidebar-item__title">Tiền lương</div>
      </router-link>

      <router-link to="/ " class="sidebar-item" title="Thuế">
        <div class="icon icon-24 icon-tax"></div>
        <div class="sidebar-item__title">Thuế</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Giá thành">
        <div class="icon icon-24 icon-price"></div>
        <div class="sidebar-item__title">Giá thành</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Tổng hợp">
        <div class="icon icon-24 icon-general"></div>
        <div class="sidebar-item__title">Tổng hợp</div>
      </router-link>

      <router-link to="/" class="sidebar-item" title="Ngân sách">
        <div class="icon icon-24 icon-budget"></div>
        <div class="sidebar-item__title">Ngân sách</div>
      </router-link>

      <router-link to="/report" class="sidebar-item" title="Báo cáo">
        <div class="icon icon-24 icon-report"></div>
        <div class="sidebar-item__title">Báo cáo</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSideBar",
};
</script>

<style scoped></style>
