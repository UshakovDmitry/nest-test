<template>
  <label class="toggle">
    <input class="toggle-checkbox" type="checkbox" :checked="isActive" disabled>
    <div class="toggle-switch"></div>
    <span class="toggle-label"></span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  isActive: boolean;
}>();
</script>

<style scoped>
/* ... ваш текущий стиль ... 
*/
</style>

