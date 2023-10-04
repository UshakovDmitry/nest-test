<input
  type="text"
  data-test="search-input-PPO"
  v-model="searchValue"
  @input="updateSearch"
  :placeholder="props.placeholder"
  class="search-input"
/>



const updateSearch = (event: Event) => {
  // Получаем текущее значение из поля ввода
  const value = (event.target as HTMLInputElement).value;

  // Эмитим событие с новым значением для родительского компонента
  emits('update:modelValue', value);
};



<template>
  <!-- ... другой код ... -->
  <search-component v-model="searchTerm"></search-component>
  <div>Текущий поисковый запрос: {{ searchTerm }}</div>
  <!-- ... другой код ... -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
// ... другие импорты ...

const searchTerm = ref('');
</script>
