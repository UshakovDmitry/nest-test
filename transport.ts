<template>
  <!-- Контейнер для поля поиска и иконки -->
 
  <search class="search-container">
    <div class="icon-wrapper">
      <IconComponent
        :сonfig="{
          name: 'search',
          color: '#23362D4D',
          width: 24,
          height: 24,
        }"
      ></IconComponent>
    </div>
    <!-- Поле ввода -->
    <input
      type="text"
      data-test="search-input-PPO"
      :value="searchInput"
      @input="updateSearch(($event.target as HTMLInputElement).value)"
      :placeholder="props.placeholder"
      class="search-input"
    />
  </search>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';


const props = defineProps({
  searchInput: String,
  placeholder: String
});


// Определяем эмиттеры для событий
const emits = defineEmits(['updateSearchValue']);

// Состояние для хранения значения поля поиска

const updateSearch = (event: any) => {
  const target = event.target as any;
  const value = target.value;
  

  emits('updateSearchValue', value);
};
</script>

<style scoped>
.search-container {
  /* Расположение иконки и поля ввода в одной строке */
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  border-radius: 80px;
  width: 100%;
  overflow: hidden;
}

.icon-wrapper {
  /* Позиционирование иконки внутри поля ввода */
  position: absolute;
  left: 8px; /* Расстояние от левого края поля ввода */
  z-index: 1; /* Поверх поля ввода */
}

.search-input {
  border-radius: 58px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  padding-left: 40px; /* Добавляем отступ слева, чтобы текст не перекрывал иконку */
  font-size: 14px;
  border: none;
  outline: transparent;
  color: hsl(152, 21%, 17%);
  width: 100%;
  position: relative;
  z-index: 0; /* Под иконкой */
}
</style>


при вводе текста 
chunk-J6475X5X.js?v=4f549da1:1628 Uncaught TypeError: Cannot read properties of undefined (reading 'value')
    at Proxy.updateSearch (search-field.vue:46:24)
    at _createElementVNode.onInput._cache.<computed>._cache.<computed> (search-field.vue:20:15)
    at callWithErrorHandling (chunk-J6475X5X.js?v=4f549da1:1565:18)
    at callWithAsyncErrorHandling (chunk-J6475X5X.js?v=4f549da1:1573:17)
    at HTMLInputElement.invoker (chunk-J6475X5X.js?v=4f549da1:9397:5)
