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
    <button class="clear-button" @click="clearInput" v-if="value">&#x2715;</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  minLength: {
    type: Number,
    required: false,
  },
  maxLength: {
    type: Number,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  readonly: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
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
}

.base-input {
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  font-family: 'Rubik';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.4px;
  padding-right: 2rem; /* Make space for the clear button */
}

.clear-button {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc; /* Change as needed */
}

/* Добавьте оставшиеся стили сюда */
</style>
yle>
