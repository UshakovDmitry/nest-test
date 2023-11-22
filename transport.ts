<script setup lang="ts">
import { watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  searchInput: String,
  placeholder: String
});

const emits = defineEmits(['updateSearchValue']);

// Локальное состояние для поля ввода
const inputValue = ref('');

// Отслеживаем изменения searchInput и обновляем inputValue
watch(() => props.searchInput, (newVal) => {
  inputValue.value = newVal;
});

const updateSearch = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    emits('updateSearchValue', inputElement.value);
  }
};
</script>

<template>
  <search class="search-container">
    <div class="icon-wrapper">
      <IconComponent
        :сonfig="{name: 'search', color: '#23362D4D', width: 24, height: 24}"
      ></IconComponent>
    </div>
    <input
      type="text"
      data-test="search-input-PPO"
      :value="inputValue"
      @input="updateSearch($event)"
      :placeholder="props.placeholder"
      class="search-input"
    />
  </search>
</template>

