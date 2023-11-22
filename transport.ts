<template>
  <search class="search-container">
    <!-- ... -->
    <input
      type="text"
      data-test="search-input-PPO"
      :value="searchInput"
      @input="updateSearch($event.target.value)"
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
  searchInput: String,
  placeholder: String
});

const emits = defineEmits(['updateSearchValue']);

// Функция для обновления значения поиска
const updateSearch = (newValue: string) => {
  emits('updateSearchValue', newValue);
};
</script>
