<template>
    <div class="wrapper">
      <button 
        v-for="(count, contractor) in filterContractors" 
        :key="contractor" 
        class="btn"
        @click="emits('filterRequestsByContractor',contractor)"
      >
        {{ contractor }} ({{ count }})
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    filterContractors: Object,
  });
  
  
const emits = defineEmits(['filterRequestsByContractor']);
  </script>
    <style scoped>
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      /* margin-bottom: 20px; */
    }
    .btn {
        background-color: #ffffff;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 40px;
        padding: 8px 16px;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #f5f5f5;
    }
    </style>
  
