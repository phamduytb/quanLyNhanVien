<template>
  <div class="content">
    <div class="content-header">
      <div class="content-header__left">Nhân viên</div>
      <MButton
        class="content-header__right"
        text="Thêm mới nhân viên"
        @click="btnAddEmployee"
      >
      </MButton>
    </div>

    <div class="content-table">
      <div class="table-header">
        <div class="textfield-wrapper">
          <input
            type="text"
            class="textfield__input input-icon"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="icon icon-wrap icon-search"></div>
        </div>

        <button class="btn-refresh">
          <div
            class="icon icon-24 icon-loading tooltip"
            @click="btnLoadingOnClick"
          >
            <div class="tooltip-text">Lấy lại dữ liệu</div>
          </div>
        </button>
      </div>
      <div class="table-main">
        <table id="tbEmployeeList">
          <thead>
            <tr>
              <th class="th-first">
                <MCheckbox></MCheckbox>
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ $_MISAResource.TextVi.EmployeeList.EmployeeCode }}
              </th>
              <th class="text-align--left" style="min-width: 200px">
                {{ $_MISAResource.TextVi.EmployeeList.EmployeeName }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ $_MISAResource.TextVi.EmployeeList.Gender }}
              </th>
              <th class="text-align--center" style="min-width: 150px">
                {{ $_MISAResource.TextVi.EmployeeList.DateOfBirth }}
              </th>
              <th class="text-align--left tooltip" style="min-width: 200px">
                {{ $_MISAResource.TextVi.EmployeeList.Identity }}
                <div class="tooltip-text tooltip-table">
                  Số chứng minh nhân dân
                </div>
              </th>
              <th class="text-align--left" style="min-width: 200px">
                {{ $_MISAResource.TextVi.EmployeeList.PositionName }}
              </th>
              <th class="text-align--left" style="min-width: 250px">
                {{ $_MISAResource.TextVi.EmployeeList.DepartmentName }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ $_MISAResource.TextVi.EmployeeList.BankNumber }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ $_MISAResource.TextVi.EmployeeList.BankName }}
              </th>
              <th
                class="text-align--left tooltip"
                style="min-width: 250px"
                title="Chi nhánh tài khoản ngân hàng"
              >
                {{ $_MISAResource.TextVi.EmployeeList.BankBranch }}
                <!-- <div class="tooltip-text tooltip-table">{{this.textEmployeeCode}}</div> -->
              </th>
              <th class="text-align--left" style="min-width: 120px">
                {{ $_MISAResource.TextVi.EmployeeList.Function }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="onRowSelected(employee)"
              :class="{
                employee__active:
                  this.employeeSelected.EmployeeId == employee.EmployeeId,
              }"
            >
              <td><MCheckbox></MCheckbox></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.FullName }}</td>
              <td>{{ employee.GenderName }}</td>
              <td class="text-align--center">
                {{ $_MISACommon.formatDate(employee.DateOfBirth) }}
              </td>
              <td>{{ employee.IdentityNumber }}</td>
              <td>{{ employee.PositionName }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td>{{ employee.BankNumber }}</td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.BankBranch }}</td>
              <td class="td-last">
                <button
                  class="td-button fix-function"
                  @click="onRowSelected(employee)"
                >
                  Sửa
                </button>
                <button
                  class="td-button btn-function__dropdown"
                  @click="showOnDropMenu($event, employee)"
                >
                  <i class="icofont-caret-down btn-function__icon"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <div class="table-footer__left">
          Tổng số:
          <b>{{ employees.length }}</b>
          bản ghi
        </div>
        <div class="table-footer__right">
          <!-- <div class="records-page">
                        <select name="" id="" class="choice-records-page">
                            <option value="">10 bản ghi trên 1 trang</option>
                            <option value="">20 bản ghi trên 1 trang</option>
                            <option value="">50 bản ghi trên 1 trang</option>
                            <option value="">100 bản ghi trên 1 trang</option>
                        </select>
                    </div> -->
          <div class="combobox">
            <input type="text" class="combobox__input" readonly="true" />
            <!-- <div class="combobox__icon">
                            <div class="icon arrow-down"></div>
                        </div> -->
            <div class="combobox__icon"><i class="icofont-caret-down"></i></div>
            <div class="combobox__data combobox-paging">
              <div class="data-employee">10 bản ghi trên 1 trang</div>
              <div class="data-employee">20 bản ghi trên 1 trang</div>
              <div class="data-employee">30 bản ghi trên 1 trang</div>
              <div class="data-employee">50 bản ghi trên 1 trang</div>
              <div class="data-employee">100 bản ghi trên 1 trang</div>
            </div>
          </div>
          <button class="btn-title title-pre">Trước</button>
          <div class="choice-page">
            <button class="btn-choice-page">1</button>
            <button class="btn-choice-page">2</button>
            <button class="btn-choice-page">...</button>
            <button class="btn-choice-page">3</button>
          </div>

          <button class="btn-title title-next">Sau</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Form chi tiết nhân viên -->
  <EmployeeDetail
    v-if="isShowEmployeeForm"
    @onCloseEmployeeForm="closeEmployeeForm"
    @onLoadData="loadData"
    @onResetForm="resetForm"
    :employeeSelected="this.employeeSelected"
  >
  </EmployeeDetail>
  <teleport to="body" @blur="hideOnDropMenu">
    <div
      id="btn-dropdown-menu"
      class="dropdown-menu"
      v-if="isShowOnDropMenu"
      :style="[isDropdown ? dropdownPosition : dropdownPositionReverse]"
    >
      <ul class="dropdown-list">
        <li class="dropdown-item" @click="btnReplicationOnDetail()">
          Nhân bản
        </li>
        <li id="btn-delete" class="dropdown-item" @click="showOnDialogwarning">
          Xóa
        </li>
        <div class="tooltip">
          <li class="dropdown-item">Ngừng sử dụng</li>
          <div class="tooltip-text tooltip-reload">Đang phát triển</div>
        </div>
      </ul>
    </div>
  </teleport>
  <MToast
    v-if="isShowToast"
    :toastTitle="this.toastTitle"
    :toastMsg="this.toastMsg"
    @onShowToast="showToast"
    @onHideToast="hideToast"
  >
  </MToast>
  <MLoading v-show="isShowLoading"></MLoading>
  <MDialogWarning
    v-if="isShowDialogWarning"
    :messageDialog="messageDialog"
    @closeDialog="closeDialogWraning"
    @confirmDialog="confirmDialogWraning"
  ></MDialogWarning>
</template>

<script>
import MButton from "@/components/base/button/MButton.vue";
import MCheckbox from "@/components/base/input/checkbox/MCheckbox.vue";
import EmployeeDetail from "@/views/employee/EmployeeDetail/EmployeeDetail.vue";
import MToast from "@/components/base/toast/MToast.vue";
import MLoading from "@/components/base/loading/MLoading.vue";
import MDialogWarning from "@/components/base/dialog/MDialogWarning.vue";
import { HTTPEmployees } from "@/js/api/callApi.js";
export default {
  name: "EmployeeList",
  components: {
    MButton,
    EmployeeDetail,
    MToast,
    MCheckbox,
    MLoading,
    MDialogWarning,
  },
  data() {
    return {
      //Điều kiện ẩn hiện form nhân viên
      isShowEmployeeForm: false,
      //Điều kiện ẩn hiện toast message
      isShowToast: false,
      //Title của toast
      toastTitle: "",
      //Thông điệp toast message
      toastMsg: "",
      //Điều kiện hiển thị loading
      isShowLoading: false,
      // Danh sách nhân viên lấy được từ API
      employees: [],
      //Danh sách lỗi nhận được từ serve
      errors: [],
      //Nhân viên được chọn để sửa
      employeeSelected: {},
      // Tọa độ theo chiều ngang khi click chuột vào 1 phần tử (so với viewport)
      dropdownPositionX: 0,
      // Tọa độ theo chiều dọc khi click chuột vào 1 phần tử (so với viewport)
      dropdownPositionY: 0,
      // Điều kiện dropdown hiển thị bên dưới ( true) hoặc lên trên nút chức năng
      isDropdown: true,
      //Điều kiện hiển thị dropdown menu chức năng
      isShowOnDropMenu: false,
      //Diều kiện hiển thị dialog cảnh báo
      isShowDialogWarning: false,
      //Thông điệp của dialog
      messageDialog: "",
    };
  },
  async created() {
    //Gọi API lấy danh sách nhân viên lần đầu chạy app
    await this.getEmployees();
    this.isShowLoading = false;
  },
  computed: {
    /**
     * Hàm tính toán vị trí của dropdown khi hiển thị phía dưới nút chức năng
     */
    dropdownPosition() {
      return {
        top: `calc(${this.dropdownPositionY}px + 10px)`,
        left: `calc(${this.dropdownPositionX}px - 55px)`,
      };
    },
    /**
     * Hàm tính toán vị trí của dropdown khi hiển thị phía trên nút chức năng
     */
    dropdownPositionReverse() {
      return {
        top: `calc(${this.dropdownPositionY}px - 100px)`,
        left: `calc(${this.dropdownPositionX}px - 55px)`,
      };
    },
  },
  methods: {
    /**
     * Gọi API lấy danh sách nhân viên
     * Author: PDDUY(27/06/2023)
     */
    async getEmployees() {
      try {
        //Hiển loading khi chưa load dữ liệu xong.
        this.isShowLoading = true;
        await HTTPEmployees.get("")
          .then((res) => {
            this.employees = res.data;
          })
          .catch((error) => {
            this.handleErrorResponse(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý response lỗi trả về từ API
     * @param {} res
     * Author: PDDUY(04/07/2023)
     */
    handleErrorResponse(res) {
      // console.log(res);
      let statusCode = res.response.status;
      let data = res.response.data;
      // let data = res.response.data.data;
      switch (statusCode) {
        case 400:
          // Vòng lặp để xem lỗi xảy  ra ở ô input nào
          // for (const key in data) {
          //   if (Object.hasOwnProperty.call(data, key)) {
          //     const element = data[key];
          //     this.errors.push(element);
          //   }
          // }
          this.errors = [];
          this.errors.push(data.userMsg);
          break;
        case 500:
          this.errors = [];
          this.errors.push(data.userMsg);
          break;
        default:
          break;
      }
    },
    /**
     * Load lại dữ liệu của bảng nhân viên khi ấn nút loading
     * Author: PDDUY (27/06/2023)
     */
    async btnLoadingOnClick() {
      try {
        await this.getEmployees();
        //ẩn loading khi đã load dữ liệu xong.
        this.isShowLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Click nút thêm mới hiển thị form chi tiết nhân viên
     * Author: PDDUY(27/06/2023)
     */
    btnAddEmployee() {
      try {
        this.employeeSelected = {};
        this.isShowEmployeeForm = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện ẩn form nhân viên
     * Author: PDDUY(27/06/2023)
     */
    closeEmployeeForm() {
      try {
        this.isShowEmployeeForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm load lại dữ liệu sau khi lưu  thành công
     * Author:PDDUY (04/07/2023)
     */
    async loadData() {
      try {
        this.toastTitle = this.$_MISAResource.TextVi.ToastMessage.Success.Title;
        //Trường hợp sửa nhân viên
        if (this.employeeSelected.EmployeeCode) {
          this.toastMsg =
            this.$_MISAResource.TextVi.ToastMessage.Success.Update;
          //Trường hợp thêm nhân viên
        } else {
          this.toastMsg =
            this.$_MISAResource.TextVi.ToastMessage.Success.Insert;
        }
        // hiển thị toast sau khi lưu dữ liệu
        this.showToast();
        //load lại danh sách nhân viên
        await this.getEmployees();
        //Ẩn loading sau khi load xong dữ liệu
        this.isShowLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm hiển thị toast message, tự động ẩn đi sau 5s
     * Author:PDDUY (04/07/2023)
     */
    showToast() {
      try {
        this.isShowToast = true;
        setTimeout(() => {
          this.isShowToast = false;
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm ẩn toast message khi click icon x
     * Author:PDDUY (04/07/2023)
     */
    hideToast() {
      try {
        this.isShowToast = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * chọn 1 dòng nhân viên để sửa.
     * @param {*} employee - Nhân viên được chọn
     * Author: PDDUY (11/07/2023)
     */
    onRowSelected(employee) {
      try {
        this.employeeSelected = employee;
        this.isShowEmployeeForm = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị dropdown menu chức năng của 1 dòng nhân viên
     * @param {*} e
     * @param {*} employee
     * Author: PDDUY (12/07/2023)
     */
    showOnDropMenu(e, employee) {
      try {
        this.employeeSelected = employee;
        // console.log(e.clientY);
        //clientY. clinetX: tọa độ khi click chuột vào 1 phần tử( tính bằng px)  so với viewport
        //Nếu tọa độ theo chiều dọc > 560px thì dropdpwn hiển thị lên trên nút chức năng
        // Ngược lại hiển thị bên dưới
        if (e.clientY > 560) {
          this.isDropdown = false;
        } else {
          this.isDropdown = true;
        }
        this.dropdownPositionX = e.clientX;
        this.dropdownPositionY = e.clientY;
        //Ẩn hoặc hiện drop menu
        // this.isShowOnDropMenu = !this.isShowOnDropMenu;
        this.isShowOnDropMenu = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn dropdown menu chức năng của 1 dòng nhân viên
     * @param {} employee - Nhân viên được chọn,
     * Author: PDDUY (12/07/2023)
     */
    hideOnDropMenu() {
      try {
        this.isShowOnDropMenu = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị dialog cảnh báo khi xóa nhân viên
     * Author: PDDUY (13/07/2023)
     */
    showOnDialogwarning() {
      try {
        this.messageDialog = `Bạn có muốn xóa nhân viên <${this.employeeSelected.EmployeeCode}> không?`;
        this.isShowOnDropMenu = false;
        this.isShowDialogWarning = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Đóng dialog cảnh báo
     * Author: PDDUY (13/07/2023)
     */
    closeDialogWraning() {
      try {
        this.isShowDialogWarning = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEmployee() {
      try {
        await HTTPEmployees.delete(`${this.employeeSelected.EmployeeId}`)
          .then(() => {})
          .catch((error) => {
            this.handleErrorResponse(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xác nhận dialog cảnh báo xóa
     * Author: PDDUY (13/07/2023)
     */
    async confirmDialogWraning() {
      try {
        await this.deleteEmployee();
        this.isShowDialogWarning = false;
        //Khi xóa thành công
        if (this.errors == 0) {
          //Hiển thị toast thông báo xóa thành công
          this.toastTitle =
            this.$_MISAResource.TextVi.ToastMessage.Success.Title;
          this.toastMsg =
            this.$_MISAResource.TextVi.ToastMessage.Success.Delete;
          this.showToast();
          //load lại dữ liệu
          await this.getEmployees();
          //Ẩn loading
          this.isShowLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./employee-list.css);
</style>
