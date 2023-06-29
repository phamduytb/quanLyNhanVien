<template>
    <div>
        Báo cáo
        <button>Test</button>
        <div>{{ name }}</div>
        <div>{{ fullName }}</div>
        <div>Computed fullname: {{upperCase}}</div>
        <input type="text" v-model="fullName">
    </div>
</template>

<script>
export default {
    name: "ReportPage",
    computed: {
        upperCase: function() {
            return this.fullName.toUpperCase();
        }
    },
    beforeCreate() {
        console.log("1.beforeCreate");
    },
    created() {
        console.log("2.created");
        
    },
    beforeMount() {
        console.log("3.beforeMount");
        
    },
    mounted() {
        console.log("4.mounted");
        
    },
    beforeUpdate() {
        console.log("5.beforeUpdate");
        
    },
    updated() {
        console.log("6.updated");
        
    },
    beforeUnmount() {
        console.log("7.beforeUnmount");
        
    },
    unmounted() {
        console.log("8.unmounted");
        
    },
    props: {
        name: {
            type: String,
            default: "Anh Duy"
        }
    },
    data() {
        return {
            fullName: "Phạm Đình Duy"
        }
    },
}
</script>

<style scoped>

</style>