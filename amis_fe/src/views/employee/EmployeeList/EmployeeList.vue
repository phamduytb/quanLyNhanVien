<template>
    <div class="content-page">
        <div class="content-header">
            <div class="content-header__left">
                Nhân viên
            </div>
            <MButton
            class="content-header__right" 
            text="Thêm mới nhân viên"
            @click="btnAddEmployee">
            
            </MButton>
        </div>

        <div class="content-table">
            <div class="table-header">
                <div class="textfield__main">
                    <input type="text" class="textfield__input input-icon" placeholder="Tìm theo mã, tên nhân viên">
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
                                <!-- <MCheckbox></MCheckbox> -->
                                <input type="checkbox">
                            </th>
                            <th class="text-align--left" style="min-width: 150px;">{{this.textEmployeeCode}}</th>
                            <th class="text-align--left" style="min-width: 200px;">{{this.textEmployeeName}}</th>
                            <th class="text-align--left" style="min-width: 150px;">{{this.textGender}}</th>
                            <th class="text-align--center" style="min-width: 150px;">{{this.textDateOfBirth}}</th>
                            <th class="text-align--left tooltip" style="min-width: 200px;">
                                {{this.textIdentity}}
                                <div class="tooltip-text tooltip-table">Số chứng minh nhân dân</div>
                            </th>
                            <th class="text-align--left" style="min-width: 200px;">{{this.textPositionName}}</th>
                            <th class="text-align--left" style="min-width: 250px;">{{this.textDepartmentName}}</th>
                            <th class="text-align--left" style="min-width: 150px;">{{this.textBankNumber}}</th>
                            <th class="text-align--left" style="min-width: 150px;">{{this.textBankName}}</th>
                            <th class="text-align--left tooltip" style="min-width: 250px;" title="Chi nhánh tài khoản ngân hàng">
                                {{this.textBankBranch}}
                                <!-- <div class="tooltip-text tooltip-table">{{this.textEmployeeCode}}</div> -->
                            </th>
                            <th class="text-align--left" style=" min-width: 120px;">{{this.textFunction}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in employees" :key="index"
                        @dblclick="dbClickOnRow(item)">
                            <td ><input type="checkbox"></td>
                            <td>{{item.EmployeeCode}}</td>
                            <td>{{item.FullName}}</td>
                            <td>{{item.GenderName}}</td>
                            <td>{{item.DateOfBirth}}</td>
                            <td>{{item.IdentityNumber}}</td>
                            <td>{{item.PositionName}}</td>
                            <td>{{item.DepartmentName}}</td>
                            <td>{{ item.BankNumber }}</td>
                            <td>{{ item.BankName }}</td>
                            <td>{{ item.BankBranch }}</td>
                            <td class="td-last">
                              <button  class="td-button fix-function">Sửa</button>
                              <button  class="td-button btn-list-function"><i class="icofont-caret-down"></i></button>
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
                        <input type="text" class="combobox__input" readonly="true">
                        <!-- <div class="combobox__icon">
                            <div class="icon arrow-down"></div>
                        </div> -->
                        <div class="combobox__icon"><i class="icofont-caret-down"></i></div>
                        <div class="combobox__data">
                            <div class="data-item">10 bản ghi trên 1 trang</div>
                            <div class="data-item">20 bản ghi trên 1 trang</div>
                            <div class="data-item">30 bản ghi trên 1 trang</div>
                            <div class="data-item">50 bản ghi trên 1 trang</div>
                            <div class="data-item">100 bản ghi trên 1 trang</div>
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
     @btnCloseEmployeeForm="closeEmployeeForm"
     :employeeSelected="this.employeeSelected">
    </EmployeeDetail>

    <MToast></MToast>
</template>

<script>
import MISAResource from '@/lib/resource';
import MButton from '../../../components/base/button/MButton.vue'
// import MCheckbox from '@/components/base/input/checkbox/MCheckbox.vue'
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail.vue'
import MToast from '@/components/base/toast/MToast.vue'
export default {
    name: "EmployeeList",
    components: {
        MButton, EmployeeDetail, MToast
    },
    data() {
        return {
            isShowEmployeeForm : false,
            employees: [],
            employeeSelected: {},
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
            textFunction: MISAResource.TextVi.EmployeeList.Function
        }
    },
    created() {
        fetch("https://cukcuk.manhnv.net/api/v1/Employees")
        .then(res=>res.json())
        .then(data=>{
            this.employees = data;
        })
    },
    methods: {
        /**
         * Click nút thêm mới hiển thị form chi tiết nhân viên
         * Author: PDDUY(22/06/2023)
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

        dbClickOnRow(item) {
            try {
                this.employeeSelected = item;
                this.isShowEmployeeForm = true;
            } catch (error) {
                console.log(error);
            }
            
        }
    },
    
}
</script>

<style scoped>
    .content-page {
        height: 100%;
    }
</style>