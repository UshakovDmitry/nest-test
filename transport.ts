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
      :value="config.input.value"
      @input="
        emits(
          'input',
          ($event.target as HTMLInputElement | HTMLTextAreaElement).value,
        );"
        :placeholder="config.input.placeholder"
      class="search-input"
    />
  </search>

</template>

<script setup lang="ts">
import IconComponent from '../../../global/icon/icon.component.vue';




defineProps<{
  config: any;
}>();




const emits = defineEmits(['onSearch','input']);


const updateSearch = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    emits('input', inputElement.value); // Используйте 'input' для эмита события
  }
};





// const props = defineProps<{
//   placeholder: string;
// }>();
// const emits = defineEmits(['onSearch']);

// const searchValue = ref('');

// const updateSearch = (event: Event) => {
//   const value = (event.target as HTMLInputElement).value;

//   searchValue.value = value;

//   emits('onSearch', value);
// };




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
      :value="config.input.value"
      @input="updateSearch" <!-- Используйте функцию updateSearch здесь -->
      :placeholder="config.input.placeholder"
      class="search-input"
    />
  </search>
</template>

<script setup lang="ts">
import IconComponent from '../../../global/icon/icon.component.vue';

// Получение props и определение событий
const { config } = defineProps({
  config: Object
});

const emits = defineEmits(['input', 'onSearch']);

// Функция для обновления значения поиска и эмита события в родительский компонент
const updateSearch = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    emits('input', inputElement.value);
  }
};
</script>

<style scoped>
/* Ваши стили */
</style>
