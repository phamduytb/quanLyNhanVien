<template>
    <div class="textfield-container">
        <div class="textfield__header">
            <label for="" class="textfield-label">
                {{label}}
                <span class="textfield--required" v-if="inputRequired">*</span>
            </label>
        </div>
        <input type="text" class="textfield__input" v-model="inputData">
        <!-- <span>{{inputData}}</span> -->
        <!-- <span class="textfield__message">Mã không được để trống</span> -->
    </div>
</template>

<script>
export default {
    name: "MTextfield",
    props: [
        'label', 'inputRequired', 'inputValue'
    ],
    created() {
        this.inputData = this.inputValue;
    },
    data() {
        return {
           inputData:"" 
        }
    },
    
}
</script>

<style scoped>

</style>