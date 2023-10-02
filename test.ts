<template>
  <div class="chronologies">
    <div
      class="chronologies__item"
      v-for="(status, index) in allStatuses"
      :key="index"
      :style="{
        width: '25%', /* Подразумевается равное распределение между статусами, можете адаптировать под свои нужды */
        backgroundColor: chronologies.includes(status) ? 'green' : 'gray',
      }"
    >{{ status }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  chronologies: {
    type: Array,
    required: true,
  },
});

const allStatuses = ['оформлена', 'доставляется', 'доставлен', 'завершен'];
</script>

<style scoped>
/* ... ваш стиль ... */
</style>
