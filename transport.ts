<template>
  <!-- ... ваш текущий шаблон ... -->

  <!-- Кнопка для очистки поля поиска -->
  <button @click="clearSearchField">Очистить поиск</button>

  <!-- Вывод текста из поля поиска -->
  <div>Текст поиска: {{ model.fields[0].input.value }}</div>

  <!-- Ваши другие компоненты ... -->
</template>

<script setup lang="ts">
// ... ваш текущий скрипт ...

const clearSearchField = () => {
  // Обновляем значение поля поиска, устанавливая его в пустую строку
  model.value.fields[0].input.value = '';
};

// ... остальная часть вашего скрипта ...
</script>
