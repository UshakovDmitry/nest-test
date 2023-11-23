  isYesterday: Boolean,
  isTomorrow: Boolean,

добавил еще белевых значений 
сделай так что если и они меняются то очищаю поиск





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

<script setup lang="ts">
import { watch } from 'vue';
import IconComponent from '../../../global/icon/icon.component.vue';

// Получение props и определение событий
const props = defineProps({
  config: Object,
  isToday: Boolean,
  isYesterday: Boolean,
  isTomorrow: Boolean,
});

watch(() => props.isToday, (newValue) => {
  if (newValue) {
    props.config.input.value = ''; 
  }
});


const emits = defineEmits(['input', 'onSearch']);


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

