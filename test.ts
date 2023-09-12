


<template>
    <div class="cell__wrapper">
      {{ config.value }}
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    config: {
      type: number;
      value: string;
    };
  }>();
  </script>
  
  <style scoped>
  .cell__wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
  </style>
  
