<template>
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
</script>
<style scoped>
  /* TODO Некоторые браузеры могут игнорировать autocomplete="off" из соображений удобства пользователя или безопасности. */
  .base-input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    /* height: 100%; */
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.4px;

    /* Стили для type="password" и type="email" */
    &[type='password'],
    &[type='email'] {
      /* Удаление вебкит-специфичных стилей для password и email типов */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button,
      &::-webkit-clear-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Фикс для Firefox */
      &::-moz-placeholder {
        opacity: 1; 
      }

      /* Стили для IE */
      &::-ms-clear,
      &::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
    }

    /* Для type="search" */
    &::-webkit-search-cancel-button {
      -webkit-appearance: none; /* Убрать стандартный вид кнопки */
      appearance: none; /* Для всех браузеров поддерживающих стандарт */
      margin: 0; /* Удалить любые внешние отступы */
    }

    /* Удаление дополнительных элементов декорации в полях поиска в браузерах WebKit */
    &::-webkit-search-decoration,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none; /* Скрыть элементы */
    }

    /* Удаление кнопки очистки поля в Internet Explorer и Microsoft Edge */
    &::-ms-clear,
    &::-ms-reveal {
      display: none; /* Скрыть кнопку */
      width: 0; /* Обнулить ширину */
      height: 0; /* Обнулить высоту */
    }

    /* Удаление стандартной обводки при фокусе (для всех браузеров) */
    &:focus {
      outline: none; /* Убрать стандартную обводку при фокусе */
    }
  }


  .base-input::placeholder {
    color: var(--colors-text-placeholder, #c3c8c2);
    font-family: 'Rubik';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
    letter-spacing: 0.4px;
  }

  .base-input:disabled {
    cursor: not-allowed;
  }
</style>
