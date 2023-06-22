<template>
    <div class="content">
        <EmployeeList></EmployeeList>
    </div>
</template>

<script>
import EmployeeList from '../../../views/employee/EmployeeList/EmployeeList.vue'
export default {
    name: "TheContent",
    components: {
        EmployeeList
    }
}
</script>

<style scoped>

</style>