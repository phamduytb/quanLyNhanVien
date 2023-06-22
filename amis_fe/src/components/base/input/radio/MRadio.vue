<template>
    <label class="container-radio">{{radioLabel}}
        <input type="radio" name="gender">
        <span class="checkmark-radio"></span>
    </label>
</template>

<script>
export default {
    name: "MRadio",
    props: {
        radioLabel: String
    }
}
</script>

<style scoped>

</style>