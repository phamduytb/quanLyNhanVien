<template>
  <div id="form-employee" class="form-container">
    <div class="form-wrapper">
      <div class="form-header">
        <div class="form-header__left">
          <div id="form-employee-title" class="form-title">
            Thông tin nhân viên
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
            <div class="tooltip-text">{{ this.textTooltipHelp }}</div>
          </div>
          <div
            @click="btnCloseFormOnClick"
            class="icon icon-24 icon-form icon-exit tooltip btn-x btn-cancel"
          >
            <div class="tooltip-text">{{ this.textTooltipClose }}</div>
          </div>
        </div>
      </div>

      <div class="form-content">
        <div class="form-content__top">
          <div class="content-top__left">
            <MTextfield
              class="el-code"
              :label="this.textLabelCode"
              :inputRequired="true"
              v-model="employee.EmployeeCode"
            >
            </MTextfield>

            <MTextfield
              class="el-name"
              :label="this.textLabelName"
              :inputRequired="true"
              v-model="employee.FullName"
            >
            </MTextfield>

            <div class="textfield-container el-department">
              <div class="textfield__header">
                <label for="" class="textfield-label">
                  {{ this.textLabelDepartment }}
                  <span class="textfield--required">*</span>
                </label>
              </div>
              <MCombobox
                api="https://cukcuk.manhnv.net/api/v1/Departments"
                propName="DepartmentName"
              >
              </MCombobox>
              <span class="textfield__message">Đơn vị không được để trống</span>
            </div>

            <div class="textfield-container el-job width-100">
              <div class="textfield__header">
                <label for="" class="textfield-label"> Chức danh </label>
              </div>

              <!-- <input type="text" id="input-employeePosition" class="textfield__input  input-job" tabindex="4"/> -->
              <select
                name=""
                id="input-employeePosition"
                class="select-option"
                tabindex="4"
              ></select>
            </div>
          </div>

          <div class="content-top__right">
            <div class="brith-gender">
              <div class="textfield-container el-brith width-40">
                <div class="textfield__header">
                  <label for="" class="textfield-label"> Ngày sinh </label>
                </div>

                <input
                  type="date"
                  id="input-dateOfBirth"
                  class="textfield__input input-brith"
                  tabindex="5"
                />
              </div>
              <div class="textfield-container el-gender width-60">
                <div class="textfield__header">
                  <label for="" class="textfield-label"> Giới tính </label>
                </div>

                <div class="choice-gender">
                  <MRadio radioLabel="Nam"></MRadio>
                  <MRadio radioLabel="Nữ"></MRadio>
                  <MRadio radioLabel="Khác"></MRadio>
                  <!-- <input type=radio name="colour" value="green" id="colour-green" />Nam<label for="colour-green" ></label>
                                    <input type=radio name="colour" value="red" id="colour-red" />Nữ<label for="colour-red" ></label>
                                    <input type=radio name="colour" value="blue" id="colour-blue" />Khác<label for="colour-blue" ></label> -->
                </div>
              </div>
            </div>

            <div class="identity-releasedate">
              <div class="tooltip width-60">
                <MTextfield
                  class="el-identity"
                  :label="this.textLabelIdentityNumber"
                >
                </MTextfield>
                <div class="tooltip-text">
                  {{ this.textTooltipIdentityNumber }}
                </div>
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
                />
              </div>
            </div>

            <MTextfield
              class="el-releaseAddress width-100"
              :label="this.textLabelIdentityPlace"
            >
            </MTextfield>
          </div>
        </div>

        <div class="form-content__bottom">
          <MTextfield class="address width-100" :label="this.textLabelAddress">
          </MTextfield>

          <div class="contact-bank">
            <div class="tooltip">
              <MTextfield class="mobiphone" :label="this.textLabelPhone">
              </MTextfield>
              <div class="tooltip-text">{{ this.textTooltipPhone }}</div>
            </div>
            <div class="tooltip">
              <MTextfield class="landline" :label="this.textLabelLandline">
              </MTextfield>
              <div class="tooltip-text">{{ this.textTooltipLandline }}</div>
            </div>

            <MTextfield class="email" :label="this.textLabelEmail">
            </MTextfield>

            <div class="tooltip">
              <MTextfield
                class="bank-acount"
                :label="this.textLabelBankAccountNumber"
              >
              </MTextfield>
              <div class="tooltip-text">
                {{ this.textTooltipBankAccountNumber }}
              </div>
            </div>

            <MTextfield class="bank-name" :label="this.textLabelBankName">
            </MTextfield>
            <MTextfield class="bank-branch" :label="this.textLabelBankBranch">
            </MTextfield>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <div class="form-footer__left">
          <div class="tooltip">
            <MButton
              class="btn--secondary cancel-form btn-cancel"
              :text="this.textButtonCancel"
            ></MButton>
            <div class="tooltip-text">{{ this.textTooltipClose }}</div>
          </div>
        </div>

        <div class="form-footer__right">
          <div class="tooltip">
            <MButton
              class="btn--secondary"
              :text="this.textButtonSave"
              @click="btnSaveEmployeeOnClick"
            >
            </MButton>
            <div class="tooltip-text">{{ this.textTooltipSave }}</div>
          </div>

          <div class="tooltip">
            <MButton :text="this.textButtonSaveAndAdd"></MButton>
            <div class="tooltip-text">{{ this.textTooltipSaveAndAdd }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MDialogError
    v-if="this.errors.length > 0"
    :title="this.errorDialogTitle"
    :errors="this.errors"
    @onCloseDialog="closeDialog"
  >
  </MDialogError>
  <!-- <MDialogWarning></MDialogWarning> -->
</template>

<script>
import MISAResource from "@/js/base/resource";
import MButton from "@/components/base/button/MButton.vue";
import MTextfield from "@/components/base/input/textfield/MTextfield.vue";
import MCheckbox from "@/components/base/input/checkbox/MCheckbox.vue";
import MRadio from "@/components/base/input/radio/MRadio.vue";
import MCombobox from "@/components/base/combobox/MCombobox.vue";
// import MDialogError from '@/components/base/dialog/MDialogError.vue';
// import MDialogWarning from '@/components/base/dialog/MDialogWarning.vue';
export default {
  name: "EmployeeDetail",
  components: {
    MButton,
    MTextfield,
    MCheckbox,
    MRadio,
    MCombobox,
  },
  props: ["employeeSelected"],
  // emits: [
  //     "btnCloseEmployeeForm",
  // ],

  created() {
    let jsonEmployee = JSON.stringify(this.employeeSelected);
    this.employee = JSON.parse(jsonEmployee);
  },
  computed: {
    FormMode: function () {
      if (!this.employeeSelected.EmployeeCode) {
        return this.MISAEnum.FormMode.Add;
      } else {
        return this.MISAEnum.FormMode.Edit;
      }
    },
  },
  methods: {
    /**
     * Sự kiện click nút x trên form nhân viên
     * Author: PDDUY(22/06/2023)
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
    btnSaveEmployeeOnClick() {
      try {
        if (this.FormMode == this.MISAEnum.FormMode.Add) {
          // validate dữ liệu nhập vào
          let isValid = this.validateData();
          //Validate thành công thì gọi API thêm dữ liệu
          if (isValid) {
            this.axios
              .post("https://cukcuk.manhnv.net/api/v1/Employees", this.employee)
              .then((res) => {
                console.log("success: ", res);
                //hiển thị toast thành công
              })
              .catch((res) => {
                console.log(res);
                let statusCode = res.response.status;
                let data = res.response.data.data;
                switch (statusCode) {
                  case 400:
                    // Vòng lặp để xem lỗi xảy  ra ở ô input nào
                    for (const key in data) {
                      if (Object.hasOwnProperty.call(data, key)) {
                        const element = data[key];
                        this.errors.push(element);
                      }
                    }
                    break;
                  case 500:
                    // Sau thay bằng dialog hiển thị lỗi
                    alert("Looix backend");
                    break;
                  default:
                    break;
                }
              });
          }
          //Đọc thông tin trả về và phản hồi kết quả
        } else {
          alert("Sửa");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate dữ liệu trên form trước khi gọi API
     * Author: PDDUY(24/06/2023)
     */
    validateData() {
      return true;
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
  },
  data() {
    return {
      employee: {},
      errors: [],
      //#region  MISAResource
      //label các ô input trên form
      DetailTile: MISAResource.TextVi.EmployeeDetail.DetailTitle,
      textLabelCode: MISAResource.TextVi.EmployeeDetail.EmployeeCode,
      textLabelName: MISAResource.TextVi.EmployeeDetail.EmployeeName,
      textLabelDepartment: MISAResource.TextVi.EmployeeDetail.DepartmentName,
      textLabelPositionName: MISAResource.TextVi.EmployeeDetail.PositionName,
      textLabelIdentityNumber:
        MISAResource.TextVi.EmployeeDetail.IdentityNumber,
      textLabelIdentityPlace: MISAResource.TextVi.EmployeeDetail.IdentityPlace,
      textLabelAddress: MISAResource.TextVi.EmployeeDetail.Address,
      textLabelPhone: MISAResource.TextVi.EmployeeDetail.Phone,
      textLabelLandline: MISAResource.TextVi.EmployeeDetail.Landline,
      textLabelEmail: MISAResource.TextVi.EmployeeDetail.Email,
      textLabelBankAccountNumber:
        MISAResource.TextVi.EmployeeDetail.BankAccountNumber,
      textLabelBankName: MISAResource.TextVi.EmployeeDetail.BankName,
      textLabelBankBranch: MISAResource.TextVi.EmployeeDetail.BankBranch,
      //text button
      textButtonSave: MISAResource.TextVi.Button.Save,
      textButtonSaveAndAdd: MISAResource.TextVi.Button.SaveAndAdd,
      textButtonCancel: MISAResource.TextVi.Button.Cancel,
      //Dialog
      warningtDialogTitle: MISAResource.TextVi.Dialog.Title.Warning,
      errorDialogTitle: MISAResource.TextVi.Dialog.Title.Error,

      //ToolTip
      textTooltipHelp: MISAResource.TextVi.ToolTip.Help,
      textTooltipClose: MISAResource.TextVi.ToolTip.Close,
      textTooltipSave: MISAResource.TextVi.ToolTip.Save,
      textTooltipSaveAndAdd: MISAResource.TextVi.ToolTip.SaveAndAdd,
      textTooltipIdentityNumber: MISAResource.TextVi.ToolTip.IdentityNumber,
      textTooltipPhone: MISAResource.TextVi.ToolTip.Phone,
      textTooltipLandline: MISAResource.TextVi.ToolTip.Landline,
      textTooltipBankAccountNumber:
        MISAResource.TextVi.ToolTip.BankAccountNumber,
      //#endregion
    };
  },
};
</script>

<style scoped>
@import url(../../../css/base/icon.css);
@import url(./employee-detail.css);
</style>
