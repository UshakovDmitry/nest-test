<template>
  <article class="cell__wrapper">
    <!-- Заголовок, представляющий имя, для улучшения семантики -->
    <h2 class="name">{{ config.value.name }}</h2>
    <div class="coordinates"> 
      <!-- Иконка телефона для визуального представления контактной информации -->
      <IconComponent
        :config="{
          name: 'call',
          color: '#4caf50',
          width: 20,
          height: 20,
        }">
      </IconComponent>
      <!-- Номер телефона для связи -->
      <span>{{ config.value.phone }}</span>
    </div>
  </article>
</template>
  
<script setup lang="ts">
import IconComponent from '../../icon/icon.component.vue';

// Определение props для компонента
defineProps<{
  config: {
    type: number;
    value: any; // 'value' содержит информацию, такую как имя и номер телефона
  };
}>();
</script>
  
<style scoped>
.cell__wrapper {
  /* Стили для обертки */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 0 0 30px;
  font-size: 14px;
  line-height: 1.2;
  color: #23362d;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name {
  /* Ограничение ширины для переноса текста на новую строку */
  max-width: 200px; /* Пример ширины, настраивайте по потребности */
  white-space: normal; /* Позволяет переносить текст на новую строку */
  overflow-wrap: break-word; /* Перенос слов при достижении границы элемента */
}

.coordinates {
  /* Стили для блока с координатами */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}
</style>

