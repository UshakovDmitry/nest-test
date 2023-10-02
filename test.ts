<template>
  <div class="chronologies">
    <div
      class="chronologies__item"
      v-for="(chronology, index) in chronologies"
      :key="index"
      :style="{
        width: chronology.width,
        backgroundColor: chronology.color,
      }"
    >{{  chronology}}</div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  chronologies: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped>
.chronologies {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 10px;
  margin-top: 20px;
  /* border: 1px solid #259451; */
}
.chronologies__item {
  height: 10px;
  border-radius: 10px;
}
</style>
