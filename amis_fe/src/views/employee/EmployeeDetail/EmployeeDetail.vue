<template>
    <div id="form-employee" class="form-container">
        <div class="form-wrapper">
            <div class="form-header">
                <div class="form-header__left">
                    <div id="form-employee-title" class="form-title">Thông tin nhân viên</div>
                    <MCheckbox checkboxLabel="Là khách hàng"></MCheckbox>
                    <MCheckbox checkboxLabel="Là nhà cung cấp"></MCheckbox>
                </div>
                <div class="form-header__right">
                    <div class="icon icon-24 icon-form icon-help tooltip">
                        <div class="tooltip-text">{{this.textTooltipHelp}}</div>
                    </div>
                    <div 
                    @click="hideEmployeeForm"
                    class="icon icon-24 icon-form icon-exit tooltip btn-x btn-cancel">
                        <div class="tooltip-text">{{this.textTooltipClose}}</div>
                    </div>
                </div>
            </div>

            <div class="form-content">
                <div class="form-content__top">
                    <div class="content-top__left">
                        <MTextfield
                            class="el-code"
                            :label = "this.textLabelCode"
                            :inputRequired="true"
                            :inputValue="employeeSelected.EmployeeCode"
                        >
                        </MTextfield>

                        <MTextfield
                            class="el-name"
                            :label = "this.textLabelName"
                            :inputRequired="true"
                            :inputValue="employeeSelected.FullName"
                        >
                        </MTextfield>
                        
                        
                        <div class="textfield-container el-department">
                            <div class="textfield__header">
                                <label for="" class="textfield-label">
                                    Đơn vị
                                    <span class="textfield--required">*</span>
                                </label>
                            </div>
                            
                            <!-- <div class="combobox combobox-department">
                                <input type="text" class="combobox__input" tabindex="3">
                                <div class="combobox__icon"><i class="icofont-caret-down"></i></div>
                                <div class="combobox__data">
                                    <div class="data-item">Phòng nhân sự</div>
                                    <div class="data-item">Phòng tuyển sinh</div>
                                    <div class="data-item">Phòng đào tạo</div>
                                    <div class="data-item">Phòng sản xuất</div>
                
                                </div>
                            </div> -->
                            <select  name=""  id="input-department" class="select-option enter-required" tabindex="3">
                                
                            </select>
                            <!-- <div class="input-error--message hide-text-ellipsis" title="Mã nhân viên không được để trống">
                                Đơn vị không được để trống
                            </div> -->

                            <span class="textfield__message">Đơn vị không được để trống</span>
                            
                        </div>

                        <div class="textfield-container el-job width-100">
                            <div class="textfield__header">
                                <label for="" class="textfield-label">
                                    Chức danh
                                </label>
                            </div>
                            
                            <!-- <input type="text" id="input-employeePosition" class="textfield__input  input-job" tabindex="4"/> -->
                            <select name="" id="input-employeePosition" class="select-option" tabindex="4">
                                
                            </select>
                            
                        </div>

                    </div>

                    <div class="content-top__right">
                        <div class="brith-gender">
                            <div class="textfield-container el-brith width-40">
                                <div class="textfield__header">
                                    <label for="" class="textfield-label">
                                        Ngày sinh
                                    </label>
                                </div>
                                
                                <input type="date" id="input-dateOfBirth" class="textfield__input  input-brith" tabindex="5">
                            </div>
                            <div class="textfield-container el-gender width-60">
                                <div class="textfield__header">
                                    <label for="" class="textfield-label">
                                        Giới tính
                                    </label>
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
                                :label = "this.textLabelIdentityNumber"               
                                >
                                </MTextfield>
                                <div class="tooltip-text">{{this.textTooltipIdentityNumber}}</div>
                            </div>
                            
                            
                            <div class="textfield-container el-releasedate width-40">
                                <div class="textfield__header">
                                    <label for="" class="textfield-label">
                                        Ngày cấp
                                    </label>
                                </div>
                                
                                <input type="date" id="input-identityDate" class="textfield__input " tabindex="10">
                            </div>
                        </div>  
                        
                        <MTextfield
                            class="el-releaseAddress width-100"
                            :label = "this.textLabelIdentityPlace"
                            
                        >
                        </MTextfield>
                    </div>
                </div>

                <div class="form-content__bottom">
                    <MTextfield
                        class="address width-100"
                        :label = "this.textLabelAddress"
                    >
                    </MTextfield>

                    <div class="contact-bank">
                        <div class="tooltip">
                            <MTextfield
                            class="mobiphone"
                            :label = "this.textLabelPhone"
                            >
                            </MTextfield>
                            <div class="tooltip-text">{{this.textTooltipPhone}}</div>
                        </div>
                        <div class="tooltip">
                            <MTextfield
                            class="landline"
                            :label = "this.textLabelLandline"
                            >
                            </MTextfield>
                            <div class="tooltip-text">{{this.textTooltipLandline}}</div>
                        </div>
                        
                        <MTextfield
                            class="email"
                            :label = "this.textLabelEmail"
                        >
                        </MTextfield> 

                        <div class="tooltip">
                            <MTextfield
                            class="bank-acount"
                            :label = "this.textLabelBankAccountNumber"
                            >
                            </MTextfield> 
                            <div class="tooltip-text">{{this.textTooltipBankAccountNumber}}</div>
                        </div>
                        
                        <MTextfield
                            class="bank-name"
                            :label = "this.textLabelBankName"
                        >
                        </MTextfield>
                        <MTextfield
                            class="bank-branch"
                            :label = "this.textLabelBankBranch"
                        >
                        </MTextfield>
                    </div>
                </div>
            </div>

            <div class="form-footer">
                <div class="form-footer__left">
                    <div class="tooltip">
                        <MButton class="btn--secondary cancel-form btn-cancel" :text="this.textButtonCancel"></MButton>
                        <div class="tooltip-text">{{this.textTooltipClose}}</div>
                    </div>
                    
                </div>

                <div class="form-footer__right">
                    <div class="tooltip">
                        <MButton class="btn--secondary" :text="this.textButtonSave"></MButton>
                        <div class="tooltip-text">{{this.textTooltipSave}}</div>
                    </div>

                    <div class="tooltip">
                        <MButton  :text="this.textButtonSaveAndAdd"></MButton>
                        <div class="tooltip-text">{{this.textTooltipSaveAndAdd}}</div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- <MDialogError></MDialogError> -->
    <!-- <MDialogWarning></MDialogWarning> -->
    
</template>

<script>
import MISAResource from '@/lib/resource';
import MButton from '@/components/base/button/MButton.vue';
import MTextfield from '@/components/base/input/textfield/MTextfield.vue';
import MCheckbox from '@/components/base/input/checkbox/MCheckbox.vue';
import MRadio from '@/components/base/input/radio/MRadio.vue';
// import MDialogError from '@/components/base/dialog/MDialogError.vue';
// import MDialogWarning from '@/components/base/dialog/MDialogWarning.vue';
export default {
    name: "EmployeeDetail",
    components: {
        MButton, MTextfield, MCheckbox, MRadio
    },
    props: ['employeeSelected'],
    // emits: [
    //     "btnCloseEmployeeForm",
    // ],
    created() {
        // this.employee = this.employeeSelected;
    },
    methods: {
        /**
         * Sự kiện click nút x trên form nhân viên
         * Author: PDDUY(22/06/2023) 
         */
        hideEmployeeForm() {
            try {
                this.$emit("btnCloseEmployeeForm");
            } catch (error) {
                console.log(error);
            }
        }
    },
    
    data() {
        return {
            employee:{},
            //#region  MISAResource 
            DetailTile:MISAResource.TextVi.EmployeeDetail.DetailTitle,
            textLabelCode:MISAResource.TextVi.EmployeeDetail.EmployeeCode,
            textLabelName:MISAResource.TextVi.EmployeeDetail.EmployeeName,
            textLabelDepartment:MISAResource.TextVi.EmployeeDetail.DepartmentName,
            textLabelPositionName:MISAResource.TextVi.EmployeeDetail.PositionName,
            textLabelIdentityNumber:MISAResource.TextVi.EmployeeDetail.IdentityNumber,
            textLabelIdentityPlace:MISAResource.TextVi.EmployeeDetail.IdentityPlace,
            textLabelAddress:MISAResource.TextVi.EmployeeDetail.Address,
            textLabelPhone:MISAResource.TextVi.EmployeeDetail.Phone,
            textLabelLandline:MISAResource.TextVi.EmployeeDetail.Landline,
            textLabelEmail:MISAResource.TextVi.EmployeeDetail.Email,
            textLabelBankAccountNumber:MISAResource.TextVi.EmployeeDetail.BankAccountNumber,
            textLabelBankName:MISAResource.TextVi.EmployeeDetail.BankName,
            textLabelBankBranch:MISAResource.TextVi.EmployeeDetail.BankBranch,
            //text button 
            textButtonSave:MISAResource.TextVi.EmployeeDetail.Save,
            textButtonCancel:MISAResource.TextVi.EmployeeDetail.Cancel,
            textButtonSaveAndAdd:MISAResource.TextVi.EmployeeDetail.SaveAndAdd,
            //Dialog
            textDialogTitle:MISAResource.TextVi.Dialog.Title.Warning,
            textDialogMessage:MISAResource.TextVi.Dialog.Title.Change,
            textDialogButtonYes:MISAResource.TextVi.Dialog.Yes,
            textDialogButtonNo:MISAResource.TextVi.Dialog.No,
            textDialogButtonCancel:MISAResource.TextVi.Dialog.Cancel,
            //ToolTip
            textTooltipHelp:MISAResource.TextVi.ToolTip.Help,
            textTooltipClose:MISAResource.TextVi.ToolTip.Close,
            textTooltipSave:MISAResource.TextVi.ToolTip.Save,
            textTooltipSaveAndAdd:MISAResource.TextVi.ToolTip.SaveAndAdd,
            textTooltipIdentityNumber:MISAResource.TextVi.ToolTip.IdentityNumber,
            textTooltipPhone:MISAResource.TextVi.ToolTip.Phone,
            textTooltipLandline:MISAResource.TextVi.ToolTip.Landline,
            textTooltipBankAccountNumber:MISAResource.TextVi.ToolTip.BankAccountNumber
            //#endregion
        }
    },
}
</script>

<style scoped>

</style>