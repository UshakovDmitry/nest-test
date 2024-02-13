<template>
  <div class="input-container">
    <input
      class="base-input"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :minLength="minLength"
      :maxlength="maxLength"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      @input="onChange"
      @blur="emits('blur', $event)"
      @focus="emits('focus', $event)"
    />
    <span class="clear-button" @click="clearInput" v-if="value">&#x2715;</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  // Свойства...
})

const emits = defineEmits(['onChange','blur','focus'])

const value = ref('')

const onChange = (): void => {
  emits('onChange', value.value)
}

const clearInput = () => {
  value.value = '';
}
</script>
<style scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%; /* Подгоните под ваш дизайн */
}

.base-input {
  width: 100%;
  padding-right: 30px; /* Оставить место для кнопки очистки */
  /* Остальные стили... */
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px; /* Адаптируйте размер под ваш дизайн */
  color: #ccc; /* Адаптируйте цвет под ваш дизайн */
}
</style>
