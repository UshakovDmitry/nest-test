<template>
  <search class="search-container">
    <!-- ... -->
    <input
      type="text"
      data-test="search-input-PPO"
      v-model="searchValue"
      @input="updateSearch"
      :placeholder="props.placeholder"
      class="search-input"
    />
    <!-- ... -->
  </search>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  searchValue: String,
  placeholder: String
});

const emits = defineEmits(['updateSearchValue']);

// Функция для обновления значения поиска
const updateSearch = (event: Event) => {
  // Отправляем новое значение обратно в родительский компонент
  emits('updateSearchValue', (event.target as HTMLInputElement).value);
};
</script>



