<template>
    <label class="container-checkbox">
        {{checkboxLabel}}
        <input type="checkbox">
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
    name: "MCheckbox",
    props: {
        checkboxLabel: String
    }
}
</script>

<style scoped>

</style>