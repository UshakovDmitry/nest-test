<template>

    <div class="cell__wrapper">
     <div> {{ config.value.name }}</div>
     <a :href=`sip:${config.value.phone}`>
      <div class="coordinates"> 
        <IconComponent
          :сonfig="{
            name: 'call',
            color: '#4caf50',
            width: 25,
            height: 25,
          }"></IconComponent>
        {{ config.value.phone }}
      </div>
      </a>
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
    gap: 5px;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 0 0 30px;
    font-size: 14px;
    line-height: 1.2;
    color: #23362d;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .coordinates {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    cursor: pointer;
  }
  </style>

  Нужно форматировать config.value.phone таким образом чтобы номер телефона начинался с 8, был без пробелов скобочек и тире
вынеси эту реализацию в computed и вставь в href
