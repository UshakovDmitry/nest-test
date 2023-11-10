
<template>
  <div class="cell__wrapper">
    <div class="address" v-for="type in filteredTypes" :key="type">
      <IconComponent
        :сonfig="{
          name: type,
          color: '#000000',
          width: 24,
          height: 24,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconComponent from '../../icon/icon.component.vue';

const props = defineProps<{
  config: {
    type: number;
    value: any[];
  };
}>();

// Вычисляемое свойство для фильтрации
const filteredTypes = computed(() => {
  return props.config.value.filter(type => 
    type === 'NORMAL_TRUCK' || type === 'TAIL_LIFT'
  );
});
</script>

<!-- Стили остаются без изменений -->
<style scoped>
/* ... ваш CSS ... */
</style>
