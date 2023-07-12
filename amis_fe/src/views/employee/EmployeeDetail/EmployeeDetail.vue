<template>
  <div id="form-employee" class="form-container">
    <div class="form-wrapper">
      <div class="form-header">
        <div class="form-header__left">
          <div id="form-employee-title" class="form-title">
            {{ formTitle }}
          </div>
          <MCheckbox
            :checkboxForm="true"
            checkboxLabel="Là khách hàng"
          ></MCheckbox>
          <MCheckbox
            :checkboxForm="true"
            checkboxLabel="Là nhà cung cấp"
          ></MCheckbox>
        </div>
        <div class="form-header__right">
          <div class="icon icon-24 icon-form icon-help tooltip">
            <div class="tooltip-text">
              {{ $_MISAResource.TextVi.ToolTip.Help }}
            </div>
          </div>
          <div
            @click="btnCloseFormOnClick"
            class="icon icon-24 icon-form icon-exit tooltip btn-x btn-cancel"
          >
            <div class="tooltip-text">
              {{ $_MISAResource.TextVi.ToolTip.Close }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-content">
        <div class="form-content__top">
          <div class="content-top__left">
            <MTextfield
              ref="refEmployeeCode"
              class="el-code"
              v-model="employee.EmployeeCode"
              :label="$_MISAResource.TextVi.EmployeeDetail.EmployeeCode"
              :isRequiredLabel="true"
              :tabindex="1"
              :tooltipError="errorEmployee.errorEmployeeCode"
              :tooltipContent="$_MISAResource.TextVi.EmployeeDetail.EmptyCode"
              @blurOnRequired="
                blurOnRequired(employee.EmployeeCode, 'errorEmployeeCode')
              "
            >
            </MTextfield>

            <MTextfield
              ref="refFullName"
              class="el-name"
              :label="$_MISAResource.TextVi.EmployeeDetail.EmployeeName"
              :isRequiredLabel="true"
              :tabindex="2"
              v-model="employee.FullName"
              :errorMsg="$_MISAResource.TextVi.EmployeeDetail.EmptyName"
              :tooltipError="errorEmployee.errorEmployeeFullName"
              :tooltipContent="$_MISAResource.TextVi.EmployeeDetail.EmptyName"
              @blurOnRequired="
                blurOnRequired(employee.FullName, 'errorEmployeeFullName')
              "
            >
            </MTextfield>

            <MCombobox
              ref="refDepartmentName"
              class="el-department"
              :label="$_MISAResource.TextVi.EmployeeDetail.DepartmentName"
              :isRequiredLabel="true"
              :tabindex="3"
              api="https://cukcuk.manhnv.net/api/v1/Departments"
              propName="DepartmentName"
              v-model="employee.DepartmentName"
              :tooltipError="errorEmployee.errorEmployeeDepartment"
              :tooltipContent="
                $_MISAResource.TextVi.EmployeeDetail.EmptyDepartmentName
              "
              @blurOnRequired="
                blurOnRequired(
                  employee.DepartmentName,
                  'errorEmployeeDepartment'
                )
              "
              @getValueCombobox="getDepartmentId"
            >
            </MCombobox>

            <MCombobox
              ref="refPositionName"
              class="el-job"
              :label="$_MISAResource.TextVi.EmployeeDetail.PositionName"
              :tabindex="4"
              api="https://cukcuk.manhnv.net/api/v1/Positions"
              propName="PositionName"
              v-model="employee.PositionName"
              @getValueCombobox="getPositionId"
            >
            </MCombobox>
          </div>

          <div class="content-top__right">
            <div class="brith-gender">
              <div class="textfield-container el-brith width-40">
                <div class="textfield__header">
                  <label for="" class="textfield-label">
                    {{
                      $_MISAResource.TextVi.EmployeeDetail.DateOfBirth
                    }}</label
                  >
                </div>

                <input
                  type="date"
                  id="input-dateOfBirth"
                  class="textfield__input input-brith"
                  tabindex="5"
                  v-model="employee.DateOfBirth"
                />
              </div>
              <div class="textfield-container el-gender width-60">
                <div class="textfield__header">
                  <label for="" class="textfield-label"> Giới tính </label>
                </div>

                <div class="choice-gender">
                  <MRadio
                    ref="refGender"
                    :label1="$_MISAResource.TextVi.TextGender.Male"
                    :label2="$_MISAResource.TextVi.TextGender.Female"
                    :label3="$_MISAResource.TextVi.TextGender.Other"
                    :value1="$_MISAEnum.Gender.Male"
                    :value2="$_MISAEnum.Gender.Female"
                    :value3="$_MISAEnum.Gender.Other"
                    tabindex1="6"
                    tabindex2="7"
                    tabindex3="8"
                    v-model="employee.Gender"
                  >
                  </MRadio>
                  <!-- <v-radio-group inline v-model="employee.Gender">
                    <v-radio
                      :label="$_MISAResource.TextVi.TextGender.Male"
                      :value="$_MISAEnum.Gender.Male"
                      color="#50b83c"
                    ></v-radio>
                    <v-radio
                      :label="$_MISAResource.TextVi.TextGender.Female"
                      :value="$_MISAEnum.Gender.Female"
                      color="#50b83c"
                    ></v-radio>
                    <v-radio
                      :label="$_MISAResource.TextVi.TextGender.Other"
                      :value="$_MISAEnum.Gender.Other"
                      color="#50b83c"
                    ></v-radio>
                  </v-radio-group> -->
                </div>
              </div>
            </div>

            <div class="identity-releasedate">
              <div class="width-60">
                <MTextfield
                  ref="refIdentityNumber"
                  class="el-identity"
                  :label="$_MISAResource.TextVi.EmployeeDetail.IdentityNumber"
                  :tooltip="$_MISAResource.TextVi.ToolTip.IdentityNumber"
                  :tabindex="9"
                  v-model="employee.IdentityNumber"
                >
                </MTextfield>
              </div>

              <div class="textfield-container el-releasedate width-40">
                <div class="textfield__header">
                  <label for="" class="textfield-label"> Ngày cấp </label>
                </div>

                <input
                  type="date"
                  id="input-identityDate"
                  class="textfield__input"
                  tabindex="10"
                  v-model="employee.IdentityDate"
                />
              </div>
            </div>

            <MTextfield
              ref="refIdentityPlace"
              class="el-releaseAddress width-100"
              :label="$_MISAResource.TextVi.EmployeeDetail.IdentityPlace"
              :tabindex="11"
              v-model="employee.IdentityPlace"
            >
            </MTextfield>
          </div>
        </div>

        <div class="form-content__bottom">
          <MTextfield
            ref="refAddress"
            class="address width-100"
            :label="$_MISAResource.TextVi.EmployeeDetail.Address"
            :tabindex="12"
            v-model="employee.Address"
          >
          </MTextfield>

          <div class="contact-bank">
            <MTextfield
              ref="refPhoneNumber"
              class="mobiphone"
              :label="$_MISAResource.TextVi.EmployeeDetail.Phone"
              :tooltip="$_MISAResource.TextVi.ToolTip.Phone"
              :tabindex="13"
              v-model="employee.PhoneNumber"
            >
            </MTextfield>

            <MTextfield
              ref="refLandLine"
              class="landline"
              :label="$_MISAResource.TextVi.EmployeeDetail.Landline"
              :tooltip="$_MISAResource.TextVi.ToolTip.Landline"
              :tabindex="14"
              v-model="employee.LandLine"
            >
            </MTextfield>

            <MTextfield
              ref="refEmail"
              class="email"
              :label="$_MISAResource.TextVi.EmployeeDetail.Email"
              :placeholder="'example@gmail.com'"
              :tooltipError="errorEmployee.errorEmail"
              :tooltipContent="$_MISAResource.TextVi.EmployeeDetail.errorEmail"
              :tabindex="15"
              v-model="employee.Email"
              @blurValidateData="
                blurValidateData(employee.Email, 'errorEmployeeEmail')
              "
            >
            </MTextfield>

            <MTextfield
              ref="refBankAccount"
              class="bank-acount"
              :label="$_MISAResource.TextVi.EmployeeDetail.BankAccountNumber"
              :tooltip="$_MISAResource.TextVi.ToolTip.BankAccountNumber"
              :tabindex="16"
              v-model="employee.BankAccount"
            >
            </MTextfield>

            <MTextfield
              ref="refBankName"
              class="bank-name"
              :label="$_MISAResource.TextVi.EmployeeDetail.BankName"
              :tabindex="17"
              v-model="employee.BankName"
            >
            </MTextfield>
            <MTextfield
              ref="refBankBrand"
              class="bank-branch"
              :label="$_MISAResource.TextVi.EmployeeDetail.BankBranch"
              :tabindex="18"
              v-model="employee.BankBrand"
            >
            </MTextfield>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <div class="form-footer__left">
          <MButton
            class="btn--secondary cancel-form btn-cancel"
            :text="$_MISAResource.TextVi.Button.Cancel"
            :tooltip="$_MISAResource.TextVi.ToolTip.Close"
            :tabindex="21"
            @keydown.tab="tabOrder($event)"
          ></MButton>
        </div>

        <div class="form-footer__right">
          <MButton
            class="btn--secondary"
            :text="$_MISAResource.TextVi.Button.Save"
            :tooltip="$_MISAResource.TextVi.ToolTip.Save"
            @click="btnSaveEmployeeOnClick"
            :tabindex="19"
          >
          </MButton>

          <MButton
            :text="$_MISAResource.TextVi.Button.SaveAndAdd"
            :tooltip="$_MISAResource.TextVi.ToolTip.SaveAndAdd"
            :tabindex="20"
            @click="btnSaveAndEmployeeOnClick"
          >
          </MButton>
        </div>
      </div>
    </div>
  </div>
  <MDialogError
    v-if="this.errors.length > 0"
    :title="$_MISAResource.TextVi.Dialog.Title.Error"
    :errors="this.errors"
    @onCloseDialog="closeDialog"
  >
  </MDialogError>
  <!-- <MDialogWarning></MDialogWarning> -->
</template>

<script>
import MButton from "@/components/base/button/MButton.vue";
import MTextfield from "@/components/base/input/textfield/MTextfield.vue";
import MCheckbox from "@/components/base/input/checkbox/MCheckbox.vue";
import MCombobox from "@/components/base/combobox/MCombobox.vue";
import MRadio from "@/components/base/input/radio/MRadio.vue";
import MDialogError from "@/components/base/dialog/MDialogError.vue";
import { HTTPEmployees } from "@/js/api/callApi.js";
// import MDialogWarning from '@/components/base/dialog/MDialogWarning.vue';
export default {
  name: "EmployeeDetail",
  components: {
    MButton,
    MTextfield,
    MCheckbox,
    MCombobox,
    MRadio,
    MDialogError,
  },
  props: {
    //Nhân viên lấy được để sửa
    employeeSelected: {},
  },
  // emits: [
  //     "btnCloseEmployeeForm",
  // ],
  data() {
    return {
      //Nhãn của form nhân viên
      formTitle: "",
      //Thông tin nhân viên lấy được từ form
      employee: {},
      //Danh sách lỗi khi validte
      errors: [],
      //Danh sách các điều kiện hiển thị lỗi cho các trường của đối tượng employee
      errorEmployee: {
        errorEmployeeCode: false,
        errorEmployeeFullName: false,
        errorEmployeeDepartment: false,
        errorDateOfBirth: false,
        errorIdentityDate: false,
        errorEmail: false,
      },
    };
  },
  async created() {
    // Kiểm tra điều kiện là form thêm hay form sửa
    //form thêm
    if (this.formMode == this.$_MISAEnum.FormMode.Add) {
      this.formTitle = this.$_MISAResource.TextVi.EmployeeDetail.AddTitle;
      // lấy mã nhân viên mới khi mở form thêm
      await this.getNewEmployeeCode();
    }
    // form sửa
    else {
      this.formTitle = this.$_MISAResource.TextVi.EmployeeDetail.EditTitle;
      // Lấy 1 nhân viên để sửa
      let jsonEmployee = JSON.stringify(this.employeeSelected);
      this.employee = JSON.parse(jsonEmployee);
      // this.employee = this.employeeSelected;
    }
    //Hiển thị ngày sinh lên ô input type= date khi thực hiện sửa.
    if (this.employee.DateOfBirth) {
      //Định dạng ngày tháng về dạng năm - tháng - ngày
      this.employee.DateOfBirth = this.$_MISACommon.bidingDate(
        this.employee.DateOfBirth
      );
    }
    if (this.employee.IdentityDate) {
      //Định dạng ngày tháng về dạng năm - tháng - ngày
      this.employee.IdentityDate = this.$_MISACommon.bidingDate(
        this.employee.IdentityDate
      );
    }
  },
  mounted() {
    //focus vào ô input đầu tiên khi mở form
    this.$refs.refEmployeeCode.$refs.refInput.focus();
    // this.$refs.refEmployeeCode.inputFocus();
  },
  computed: {
    formMode: function () {
      // Nếu employeeSelected chưa có thông tin thì là form thêm
      if (!this.employeeSelected.EmployeeCode) {
        return this.$_MISAEnum.FormMode.Add;
        // Ngược lại thì là form sửa
      } else {
        return this.$_MISAEnum.FormMode.Edit;
      }
    },
  },
  methods: {
    /**
     * Hàm gọi API lấy mã nhân viên mới nhất
     * Author: PDDUY(24/06/2023)
     */
    async getNewEmployeeCode() {
      try {
        await HTTPEmployees.get(`/NewEmployeeCode`)
          .then((res) => {
            this.employee.EmployeeCode = res.data;
          })
          .catch((error) => {
            this.handleErrorResponse(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm set giá trị DepartmentId cho đối tượng employee
     * @param {*} item - Đối tượng lấy được từ combobox
     * Author: PDDUY(01/07/2023)
     */
    getDepartmentId(item) {
      try {
        this.employee.DepartmentId = item.DepartmentId;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm set giá trị PositionId của đối tượng employee
     * @param {*} item - Đối tượng lấy được từ combobox
     * Author: PDDUY(01/07/2023)
     */
    getPositionId(item) {
      try {
        this.employee.PositionId = item.PositionId;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện click nút x trên form nhân viên
     * Author: PDDUY(24/06/2023)
     */
    btnCloseFormOnClick() {
      try {
        this.$emit("onCloseEmployeeForm");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện Click nút cất trên form nhân viên
     * Author: PDDUY (24/06/2023)
     */
    async btnSaveEmployeeOnClick() {
      try {
        await this.saveEmployee();
        if (this.errors.length == 0) {
          //Ẩn form nhân viên khi lưu thành công
          this.$emit("onCloseEmployeeForm");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện Click nút cất và thêm trên form nhân viên
     * Author: PDDUY (24/06/2023)
     */
    async btnSaveAndEmployeeOnClick() {
      try {
        await this.saveEmployee();
        if (this.errors.length == 0) {
          //reset lại form khi lưu nhân viên thành công
          //Đổi title form thành form thêm
          this.formTitle = this.$_MISAResource.TextVi.EmployeeDetail.AddTitle;
          //Đổi sang form thêm
          this.formMode = this.$_MISAEnum.FormMode.Add;
          //Bỏ dữ liệu đã nhập ở các trường của form
          this.employee = {};
          //Lấy mã nhân viên mới
          this.getNewEmployeeCode();
          //focus vào ô input đầu tiên
          this.$refs.refEmployeeCode.$refs.refInput.focus();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Gọi API lưu thông tin nhân viên lấy được từ form
     * Author: PDDUY(04/07/2023)
     */
    async saveEmployee() {
      try {
        if (this.formMode == this.$_MISAEnum.FormMode.Add) {
          // validate dữ liệu nhập vào
          this.validateData();
          //Dữ liệu hợp lệ thì gọi API thêm dữ liệu
          if (this.errors.length == 0) {
            await HTTPEmployees.post("", this.employee)
              .then(() => {
                //load lại dữ liệu, hiển thị thông báo thành công
                this.$emit("onLoadData");
              })
              .catch((res) => {
                this.handleErrorResponse(res);
              });
          }
        } else {
          this.validateData();
          if (this.errors.length == 0) {
            await HTTPEmployees.put(
              `${this.employee.EmployeeId}`,
              this.employee
            )
              .then(() => {
                //load lại dữ liệu, hiển thị thông báo thành công
                this.$emit("onLoadData");
              })
              .catch((res) => {
                this.handleErrorResponse(res);
              });
          }
        }
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
     * Validate dữ liệu trên form trước khi gọi API
     * Author: PDDUY(04/07/2023)
     */
    validateData() {
      this.errors = [];
      //Các thông tin bắt buộc nhập
      //Mã nhân viên trống
      if (this.valueIsEmpty(this.employee.EmployeeCode)) {
        this.errors.push(this.$_MISAResource.TextVi.Dialog.Message.EmptyCode);
        this.errorEmployee.errorEmployeeCode = true;
      }
      //Tên nhân viên trống
      if (this.valueIsEmpty(this.employee.FullName)) {
        this.errors.push(this.$_MISAResource.TextVi.Dialog.Message.EmptyName);
        this.errorEmployee.errorEmployeeFullName = true;
      }
      //Phòng ban trống
      if (this.valueIsEmpty(this.employee.DepartmentName)) {
        this.errors.push(
          this.$_MISAResource.TextVi.Dialog.Message.EmptyDepartmentName
        );
        this.errorEmployee.errorEmployeeDepartment = true;
      }
      //Các thông tin đúng định dạng
      //email nhập đúng định dạng
      if (!this.valueIsEmpty(this.employee.Email)) {
        // Nếu Email nhập không hợp lệ trả về có lỗi
        if (!this.validateEmail(this.employee.Email)) {
          this.errorEmployee.errorEmail = true;
          this.errors.push(
            this.$_MISAResource.TextVi.Dialog.Message.ErrorEmail
          );
          // Ngược lại sẽ không có lỗi
        } else {
          this.errorEmployee.errorEmail = false;
        }
      }
      //Ngày tháng
      //Ngày sinh phải nhỏ hơn ngày hiện tại
      if (!this.validateDate(this.employee.DateOfBirth)) {
        this.errorEmployee.errorDateOfBirth = true;
      } else {
        this.errorEmployee.errorDateOfBirth = false;
      }
      //Ngày phát hành phải nhỏ hơn ngày hiện tại
      if (!this.validateDate(this.employee.IdentityDate)) {
        this.errorEmployee.errorIdentityDate = true;
      } else {
        this.errorEmployee.errorIdentityDate = false;
      }
    },
    /**
     * Hàm kiểm tra email đúng định dạng
     * @param {*} value - Email nhập vào
     * @returns: Trả về true nếu hợp lệ ngược lại trả về false
     * Author: PDDUY (11/07/2023)
     */
    validateEmail(value) {
      try {
        const email =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.match(email)) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm kiểm tra ngày tháng nhập vào so với ngày tháng hiện tại
     * @param {*} date - Ngày tháng nhập vào
     * @returns: Trả về true nếu hợp lệ ngược lại trả về false
     * Author: PDDUY (11/07/2023)
     */
    validateDate(date) {
      try {
        if (!this.valueIsEmpty(date)) {
          let dateInput = new Date(date);
          // let dataEx = new Date("2020-01-01 00:00:00");
          const today = new Date();
          if (dateInput.getTime() < today.getTime()) {
            // this.errorMessage.push(resource.IsErrorFormat.Date);
            return true;
          }
          // if (dateInput.getTime() === dataEx.getTime()) {
          //   this.errorMessage.push("Không được nhập ngày 01/01/2020");
          //   return true;
          // }
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm kiểm tra 1 trường có trống hay không
     * @param {*} value - Giá trị của 1 trường
     * Author: PDDUY(11/07/2023)
     */
    valueIsEmpty(value) {
      try {
        if (!value) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xử lý sự kiện blur qua các trường bắt buộc nhập
     * @param {*} value - giá trị lấy được từ 1 trường
     * @param {*} required - tên thuộc tính của 1 nhân viên bắt buộc nhập
     * Author: PDDUY(01/07/2023)
     */
    blurOnRequired(value, errorName) {
      try {
        if (this.valueIsEmpty(value)) {
          this.errorEmployee[errorName] = true;
        } else {
          this.errorEmployee[errorName] = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm xử lý khi người dùng tab đến button hủy tab lần nữa quay lại ô input đầu tiên
     * Author: PDDUY(01/07/2023)
     *
     */
    tabOrder(event) {
      try {
        event.preventDefault();
        this.$refs.refEmployeeCode.$refs.refInput.focus();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Đóng dialog cảnh báo
     * Author: PDDUY(24/06/2023)
     */
    closeDialog() {
      try {
        this.errors = [];
      } catch (error) {
        console.log(error);
      }
    },
    checkedRadio(value) {
      this.employee.Gender = value;
    },
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./employee-detail.css);
</style>
