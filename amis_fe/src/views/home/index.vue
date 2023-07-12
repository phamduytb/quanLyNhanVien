<template>
  <div>
    Trang Chủ
    {{ ex8 }}
    <v-radio-group v-model="ex8" column>
      <v-radio label="primary" color="success" value="primary"></v-radio>
      <v-radio label="secondary" color="success" value="secondary"></v-radio>
      <v-radio label="success" color="success" value="success"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      ex8: null,
    };
  },
};
</script>

<style scoped></style>
