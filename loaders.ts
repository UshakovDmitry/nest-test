<template>
  <div class="chronologies__wrapper">
    <!-- ... другой код ... -->
    <div
      class="chronologies__item"
      v-for="(status, index) in defaultStatusesPPO"
      :key="index"
    >
      <div
        class="item__border"
        :class="{ done: isStatusActive(status) }"
      ></div>
      <div class="item__status">
        <!-- ... другой код ... -->
      </div>
    </div>
    <!-- ... другой код ... -->
  </div>
</template>



       <script setup lang="ts">
import IconComponent from '../../../components/global/icon/icon.component.vue';

// ... defineProps и другой код ...

const isStatusActive = (status) => {
  if (status === 'Оформлен') {
    return chronologies.includes('Оформлен') || chronologies.includes('Ожидает клиента');
  }
  return chronologies.includes(status);
};
</script>
