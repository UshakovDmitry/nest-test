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



  <script setup lang="ts">
// ... остальная часть скрипта ...

const updateSearch = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    emits('input', inputElement.value); // Используйте 'input' для эмита события
  }
};
</script>



<template>
  <!-- ... -->
  <filters-panel-component
    :config="model.fields[0]"
    @input="handleInput"
    <!-- ... остальные пропсы и события ... -->
  ></filters-panel-component>

  <!-- Вывод текста из поля поиска -->
  <div>Текст поиска: {{ model.fields[0].input.value }}</div>
  <!-- ... -->
</template>

<script setup lang="ts">
// ... ваш текущий скрипт ...

const handleInput = (newValue) => {
  model.fields[0].input.value = newValue; // Обновление значения поля поиска
};

// ... остальная часть вашего скрипта ...
</script>
