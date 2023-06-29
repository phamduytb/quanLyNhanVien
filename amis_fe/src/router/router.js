import {createRouter, createWebHistory} from 'vue-router'
import EmployeeList from '@/views/employee/EmployeeList/EmployeeList.vue'
import HomePage from '@/views/home/index.vue'
import ReportPage from '@/views/report/ReportPage.vue'
//định nghĩa router
const routers = [
    {
        path:"/employee", 
        component:EmployeeList, 
        name:"EmployeeRouter"
    },
    {
        path:"/home",
        component:HomePage,
        name:"HomeRouter"
    },
    {
        path:"/report",
        component:ReportPage,
        name:"ReportRouter"
    }
]

//Khởi tạo vue router
const vueRouter = createRouter({
    history:createWebHistory(),
    routes:routers
})

//export
export default vueRouter;