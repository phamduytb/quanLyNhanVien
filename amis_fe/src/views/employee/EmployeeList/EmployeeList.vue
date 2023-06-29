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
        <div class="textfield__main">
          <input
            type="text"
            class="textfield__input input-icon"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="icon icon-wrap icon-search"></div>
        </div>

        <button class="btn-refresh" title="Lấy lại dữ liệu">
          <div class="icon icon-24 icon-loading"></div>
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
                {{ this.textEmployeeCode }}
              </th>
              <th class="text-align--left" style="min-width: 200px">
                {{ this.textEmployeeName }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ this.textGender }}
              </th>
              <th class="text-align--center" style="min-width: 150px">
                {{ this.textDateOfBirth }}
              </th>
              <th class="text-align--left tooltip" style="min-width: 200px">
                {{ this.textIdentity }}
                <div class="tooltip-text tooltip-table">
                  Số chứng minh nhân dân
                </div>
              </th>
              <th class="text-align--left" style="min-width: 200px">
                {{ this.textPositionName }}
              </th>
              <th class="text-align--left" style="min-width: 250px">
                {{ this.textDepartmentName }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ this.textBankNumber }}
              </th>
              <th class="text-align--left" style="min-width: 150px">
                {{ this.textBankName }}
              </th>
              <th
                class="text-align--left tooltip"
                style="min-width: 250px"
                title="Chi nhánh tài khoản ngân hàng"
              >
                {{ this.textBankBranch }}
                <!-- <div class="tooltip-text tooltip-table">{{this.textEmployeeCode}}</div> -->
              </th>
              <th class="text-align--left" style="min-width: 120px">
                {{ this.textFunction }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="dbClickOnRow(employee)"
            >
              <td><MCheckbox></MCheckbox></td>
              <td>{{ employee.EmployeeCode }}</td>
              <td>{{ employee.FullName }}</td>
              <td>{{ employee.GenderName }}</td>
              <td class="text-align--center">
                {{ MISACommon.formatDate(employee.DateOfBirth) }}
              </td>
              <td>{{ employee.IdentityNumber }}</td>
              <td>{{ employee.PositionName }}</td>
              <td>{{ employee.DepartmentName }}</td>
              <td>{{ employee.BankNumber }}</td>
              <td>{{ employee.BankName }}</td>
              <td>{{ employee.BankBranch }}</td>
              <td class="td-last">
                <button class="td-button fix-function">Sửa</button>
                <button class="td-button btn-list-function">
                  <i class="icofont-caret-down"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <div class="table-footer__left">
          Tổng số :
          <b>80</b>
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
    :employeeSelected="this.employeeSelected"
  >
  </EmployeeDetail>

  <MToast></MToast>
</template>

<script>
import CallApi from "@/js/api/callApi";
// import MISACommon from "@/js/base/common";
import MISAResource from "@/js/base/resource";
import MButton from "@/components/base/button/MButton.vue";
import MCheckbox from "@/components/base/input/checkbox/MCheckbox.vue";
import EmployeeDetail from "@/views/employee/EmployeeDetail/EmployeeDetail.vue";
import MToast from "@/components/base/toast/MToast.vue";
export default {
  name: "EmployeeList",
  components: {
    MButton,
    EmployeeDetail,
    MToast,
    MCheckbox,
  },
  data() {
    return {
      isShowEmployeeForm: false,
      employees: [],
      employeeSelected: {},
      // MISACommon: MISACommon,
      //#region Text data Table
      textEmployeeCode: MISAResource.TextVi.EmployeeList.EmployeeCode,
      textEmployeeName: MISAResource.TextVi.EmployeeList.EmployeeName,
      textGender: MISAResource.TextVi.EmployeeList.Gender,
      textDateOfBirth: MISAResource.TextVi.EmployeeList.DateOfBirth,
      textIdentity: MISAResource.TextVi.EmployeeList.Identity,
      textDepartmentName: MISAResource.TextVi.EmployeeList.DepartmentName,
      textPositionName: MISAResource.TextVi.EmployeeList.PositionName,
      textBankNumber: MISAResource.TextVi.EmployeeList.BankNumber,
      textBankName: MISAResource.TextVi.EmployeeList.BankName,
      textBankBranch: MISAResource.TextVi.EmployeeList.BankBranch,
      textFunction: MISAResource.TextVi.EmployeeList.Function,
    };
  },
  created() {
    CallApi.methods
      .getEmployees()
      .then((res) => {
        this.employees = res;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    /**
     * Click nút thêm mới hiển thị form chi tiết nhân viên
     * Author: PDDUY(27/06/2023)
     */
    btnAddEmployee() {
      try {
        this.isShowEmployeeForm = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện ẩn form nhân viên
     * Author: PDDUY(22/06/2023)
     */
    closeEmployeeForm() {
      try {
        this.isShowEmployeeForm = false;
      } catch (error) {
        console.log(error);
      }
    },

    dbClickOnRow(employee) {
      try {
        this.employeeSelected = employee;
        this.isShowEmployeeForm = true;
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
