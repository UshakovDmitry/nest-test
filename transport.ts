<template>
  <div class="wrapper">
    <button
      v-for="(count, contractor) in filterContractors"
      :key="contractor"
      class="btn"
      :class="{ active: activeButton === contractor }"
      @click="buttonClicked(contractor)"
    >
      {{ contractor }} ({{ count }})
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  filterContractors: Object,
});

const emits = defineEmits(['filterRequestsByContractor']);

const activeButton = ref('');

const buttonClicked = (contractor: string) => {
  if (activeButton.value === contractor) {
    activeButton.value = '';
    emits('filterRequestsByContractor', ''); // Эмитируется событие с пустой строкой, чтобы снять фильтр
  } else {
    activeButton.value = contractor;
    emits('filterRequestsByContractor', contractor);
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 400px;
}

.btn {
    font-family: Rubik;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  border-radius: 80px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: var(--surface-light-mode-background, #fbfbfb);
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding: 6px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  cursor: pointer;
}

.btn:hover {
  background-color: #eceaea;
}
.btn.active {
  border-radius: 80px;
  background: var(--primary-dark-mode-main-24, rgba(94, 222, 137, 0.24));
  box-shadow:
    0px 2px 6px 2px rgba(204, 204, 204, 0.15),
    0px 1px 2px 0px rgba(204, 204, 204, 0.3);
}
</style>

У меня есть вот такой компонент 
он не меняет колличество тех или иных элементов при смене города на главной странице
исправь
