<script setup lang="ts">
import { watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

const { config, isToday } = defineProps({
  config: Object,
  isToday: Boolean,
});

// Отслеживаем изменения в isToday и очищаем поле поиска
watch(isToday, () => {
  config.input.value = ''; // Очистка поля поиска
});
</script>

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
      v-model="config.input.value"
      :placeholder="config.input.placeholder"
      class="search-input"
    />
  </search>
</template>

<!-- Стили остаются прежними -->
