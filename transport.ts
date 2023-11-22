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
      v-model="searchValue"
      @input="updateSearch"
      :placeholder="props.placeholder"
      class="search-input"
    />
  </search>

</template>

<script setup lang="ts">
import IconComponent from '../../../global/icon/icon.component.vue';

const props = defineProps({
  searchValue: String,
  placeholder: String
});



const emits = defineEmits(['updateSearchValue']);

// Функция для обновления значения поиска
const updateSearch = (event: Event) => {
  // Отправляем новое значение обратно в родительский компонент
  emits('updateSearchValue', (event.target as HTMLInputElement).value);
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


      <search-field-component
        :search-value="'=)'"
        :placeholder="placeholder"
        @updateSearchValue="emits('search', $event)"
      ></search-field-component>

[plugin:vite:vue] v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.
C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/components/global/fields/search-field/search-field.vue:19:16
17 |        type="text"
18 |        data-test="search-input-PPO"
19 |        v-model="searchValue"
   |                  ^
20 |        @input="updateSearch"
21 |        :placeholder="props.placeholder"
    at createCompilerError (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:18:17)
    at Object.transformModel (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:5046:21)
    at transformModel (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-dom\dist\compiler-dom.cjs.js:2529:35)
    at buildProps (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:4487:48)
    at Array.postTransformElement (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:4109:32)
    at traverseNode (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:2057:15)
    at traverseChildren (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:2009:5)
    at traverseNode (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:2051:7)
    at traverseChildren (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:2009:5)
    at traverseNode (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend\node_modules\@vue\compiler-core\dist\compiler-core.cjs.js:2051:7
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.
