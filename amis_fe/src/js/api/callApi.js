import axios from "axios";

export default {
    methods: {
        /**
         * Địa chỉ URL dùng chung 
         * Author: PDDUY (27/06/2023)
         */
        baseURL() {
            return "https://cukcuk.manhnv.net/api/v1";
        },

        /**
         * Gọi API lấy toàn bộ danh sách nhân viên
         * @returns Trả về danh sách nhân viên hợp lệ
         * Author: PDDUY (27/06/2023)
         */
        async getEmployees() {
            try {
                const res = await axios.get(`${this.baseURL()}/Employees`);
                return res.data;
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Gọi API xóa 1 nhân viên theo id
         * @param {ID nhân viên cần xóa} employeeId 
         * @returns 
         * Author: PDDUY (27/06/2023)
         */
        async deleteEmployee(employeeId) {
            try {
                const res = await axios.delete(`${this.baseURL()}/Employees/${employeeId}`); 
                return res;
            } catch (error) {
                console.log(error);
            }
               
        },

        /**
         * Gọi API để sửa 1 nhân viên 
         * @param {} 
         * @returns 
         * Author: PDDUY (27/06/2023)
         */
        async editEmployee(employeeId, employee) {
            try {
                const res = await axios.put(`${this.baseURL()}/Employees/${employeeId}`, employee); 
                return res;  
            } catch (error) {
                console.log(error);
            }
              
        },

        /**
         * Gọi API lấy mã nhân viên mới
         * @returns 
         * Author: PDDUY (27/06/2023)
         */
        async getEmployeeNewCode() {
            try {
                const res = await axios.get(`${this.baseURL()}/Employees/NewEmployeeCode`);
                return res.data;
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Gọi API lấy danh sách phòng ban
         * @returns 
         * Author: PDDUY (27/06/2023)
         */
        async getDepartments() {
            try {
                const res = await axios.get(`${this.baseURL()}/Departments`);
                return res.data;
            } catch (error) {
                console.log(error);
            }
            
        }
    },
}
