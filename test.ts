<template>
  <div class="cell__wrapper">
    <p class="number">{{ config.value.number }}</p>
    <div class="status">
      <IconComponent
        :сonfig="{
          name: config.value.number ? 'success' : 'error', // Заменил на условие для выбора иконки
          color: config.value.number ? '#4caf50' : 'red',  // Заменил на условие для выбора цвета
          width: 20,
          height: 20,
        }"
      ></IconComponent>
      <p v-if="config.value.number">Распределена</p>
      <p v-else>Не распределена</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconComponent from '../../icon/icon.component.vue';

defineProps<{
  config: {
    type: number;
    value: any;
  };
}>();
</script>

<!-- Тут ваш CSS код, который остается без изменений -->



    
