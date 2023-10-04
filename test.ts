<template>
    <div class="cell__wrapper">
     <p class="number"> {{ config.value.number }}</p>
     <div class="status"> 
        <IconComponent
          :сonfig="{
            name: 'error',
            color: '#4caf50',
            width: 20,
            height: 20,
          }"></IconComponent>
        {{ config.value.status }}</div>
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
  
  <style scoped>
  .cell__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    width: 100%;
    max-width: 250px;
    height: 100%;
    padding: 0 0 0 30px;
    font-size: 14px;
    line-height: 1.2;
    color: #23362d;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
  }

  .number {
    word-break: break-word; /* Переносит строку на любом символе */
    max-height: 2.4em; /* Максимальная высота для двух строк, основываясь на вашем line-height */
    overflow: hidden; /* Скрывает все, что выходит за пределы */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Отображает максимум 2 строки */
    -webkit-box-orient: vertical;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }
  </style>
  
