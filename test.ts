<template>
  <div>
    <button 
      v-for="(count, contractor) in filterContractors" 
      :key="contractor" 
      @click="filterRequests(contractor)"
    >
      {{ contractor }} ({{ count }})
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  filterContractors: Object,
});

const emits = defineEmits(['filter-requests']);

const filterRequests = (contractor) => {
  emits('filter-requests', contractor);
};
</script>
