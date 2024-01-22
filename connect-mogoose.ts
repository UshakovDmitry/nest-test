у меня есть пример компонента VUE 
<template>
  <div class="alser-ui-library-field">
    <label v-if="label" class="label">
      <p
        class="lable__text"
        :class="{
          lable__text_required: disabled,
        }"
      >
        {{ label }}
      </p>
      <p v-if="required" class="label__mark">*</p>
    </label>

    <div
      class="input-wrapper"
      :class="{
        'input-wrapper_error': errorText,
        'input-wrapper_disabled': disabled,
      }"
    >
      <icon-component
        v-if="isIcon"
        :width="24"
        :height="24"
        :color="'gray-blue'"
        :view-box="'0 0 24 24'"
      >
        <CallIcon></CallIcon>
      </icon-component>
      <BaseInput
        :type="'tel'"
        :placeholder="placeholder"
        :required="required"
        :minLength="minLength"
        :maxLength="maxLength"
        :disabled="disabled"
        :readonly="readonly"
        @onChange="emits('onChange', $event)"
      ></BaseInput>
    </div>
    <span :class="errorText ? 'error-text' : 'hidden-span'">{{
      errorText
    }}</span>
    <span :class="hintText ? 'hint-text' : 'hidden-span'">{{ hintText }}</span>
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue'
  import BaseInput from '@/components/BaseInput.vue'
  import CallIcon from '@/docs/IconCollection/CallIcon.vue'
  import IconComponent from '@/components/Icon.vue'

  defineProps({
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
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
    errorText: {
      type: String,
      required: false,
      default: '',
    },
    hintText: {
      type: String,
      required: false,
      default: '',
    },
    isIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
  })

  const emits = defineEmits(['onChange'])
</script>

<style scoped>
  .label {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }

  .lable__text {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
  .lable__text_required {
    color: var(--colors-text-disabled, #c3c8c2);
  }
  .label__mark {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: var(--secondary-brand);
    font-size: 1.2rem;
  }

  .hidden-span {
    display: none;
  }
  .alser-ui-library-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    padding: var(--spacing-md, 8px) var(--spacing-lg, 12px);
    border-radius: 16px;
    gap: 0.5rem;
    border: 1px solid var(--Tertiary-LightMode-Border, rgba(35, 54, 45, 0.12));
    background: #fff;
  }

  .input-wrapper:not(:has(input:disabled)):hover {
    border: 1px solid var(--border-primary, #C3C8C2);
    transition: border 0.25s ease-in-out;
  }
  /* Стили для состояния focus */
  .input-wrapper:focus-within {
    border-radius: var(--radius-2xl, 16px);
    border: 1px solid var(--border-secondary, #d8dcd8);
    background: var(--colors-palette-basic-white, #fff);
    /* focus-rings/ring-brand */
    box-shadow: var(--focus-rings-ring-brand);
  }

  /* Стили для состояния active */
  .input-wrapper:not(:has(input:disabled)):active {
    border-radius: var(--radius-2xl, 16px);
    border: 1px solid var(--border-secondary, #d8dcd8);
    background: var(--colors-palette-basic-white, #fff);
    /* focus-rings/ring-brand */
    box-shadow: var(--focus-rings-ring-brand);
  }

  .alser-ui-library-field.secondary-brand > .input-wrapper {
    border: 1px solid var(--secondary-brand);
  }

  .error-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 124%;
    letter-spacing: 0.4px;
    color: var(--error);
  }

  .hint-text {
    color: var(--colors-text-warning-primary, #ffa01c);
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 15.6px */
    letter-spacing: 0.4px;
  }

  .label__mark_error {
    color: var(--error);
  }

  /* TODO  сделать через скоуп */
  .input-wrapper_error {
    border-radius: var(--radius-2xl, 16px) !important;
    border: 1px solid var(--colors-border-error, #f3b0a2) !important;
    background: var(--colors-bg-primary, #fff) !important;
    box-shadow: var(--shadow-bottom-xs) !important;
  }



  /* Стили для состояния focus */
  .input-wrapper_error:focus-within {
    border-radius: var(--radius-2xl, 16px) !important;
    border: 1px solid var(--colors-border-secondary, #d8dcd8) !important;
    background: var(--colors-palette-basic-white, #fff) !important;
    box-shadow: var(--focus-rings-ring-error) !important;
  }

  /* Стили для состояния active */
  .input-wrapper_error:active {
    border-radius: var(--radius-2xl, 16px) !important;
    border: 1px solid var(--colors-border-secondary, #d8dcd8) !important;
    background: var(--colors-palette-basic-white, #fff) !important;
    box-shadow: var(--focus-rings-ring-error) !important;
  }
  .input-wrapper_disabled {
    border: 1px solid var(--disabled-element) !important;
    background: var(--colors-bg-disabled, #f1f3f5) !important;
    border: 1px solid var(--colors-border-disabled, #e0e4e0) !important;
    outline: none;
    cursor: not-allowed;
  }
</style>


и вот тесты к нему 

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, test, afterEach, beforeEach } from 'vitest'
import AlserTelField from '@/components/fields/AlserTelField.vue'

describe('AlserTelField', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AlserTelField, {
      props: {
        label: 'Phone',
        placeholder: 'Enter phone',
        errorText: '',
        hintText: 'Phone should be strong',
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('Компонент существует', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Компонент отображает правильные пропсы', () => {
    expect(wrapper.props('label')).toBe('Phone')
    expect(wrapper.props('placeholder')).toBe('Enter phone')
    expect(wrapper.props('errorText')).toBe('')
    expect(wrapper.props('hintText')).toBe('Phone should be strong')
  })

  test('Компонент правильно обрабатывает ввод данных', async () => {
    const input = wrapper.find('input[type="tel"]')
    await input.setValue('1234567890')
    expect((input.element as HTMLInputElement).value).toBe('1234567890')
  })

  // Тестирование события onChange
  test('Компонент генерирует событие onChange при изменении данных', async () => {
    const input = wrapper.find('input[type="tel"]')
    await input.setValue('1234567890')
    expect(wrapper.emitted()).toHaveProperty('onChange')
  })

  // Тестирование состояний disabled и readonly
  test('Компонент правильно обрабатывает состояние disabled', async () => {
    await wrapper.setProps({ disabled: true })
    const input = wrapper.find('input[type="tel"]')
    expect(input.attributes('disabled')).toBeDefined()
  })

  test('Компонент правильно обрабатывает состояние readonly', async () => {
    await wrapper.setProps({ readonly: true })
    const input = wrapper.find('input[type="tel"]')
    expect(input.attributes('readonly')).toBeDefined()
  })

  test('Компонент отображает подсказку', async () => {
    await wrapper.setProps({ hintText: 'Phone should be strong' })
    expect(wrapper.text()).toContain('Phone should be strong')
  })
})

    напиши мне теперь тесты для этого компонента



<template>
  <div class="alser-ui-library-field">
    <label v-if="label" class="label">
      <p
        class="lable__text"
        :class="{
          lable__text_required: disabled,
        }"
      >
        {{ label }}
      </p>
      <p v-if="required" class="label__mark">*</p>
    </label>

    <div class="input-wrapper">
      <div :class="{ 'input-error': errorText}" class="a">
        <base-input
          :placeholder="placeholder"
          :required="required"
          :minLength="minLength"
          :maxLength="maxLength"
          :disabled="disabled"
          :readonly="readonly"
          :label="label"
          :icon="icon"
          :type="type"
          :errorText="errorText"
          :hintText="hintText"
          @onChange="$emit('onChange', $event)"
        />
      </div>
      <div class="b">
        <button 
        :disabled="!!(disabled || errorText)"
        :class="{'button-disabled': errorText}"
        @click="emits('onSubmit', $event)" class="btn">{{ buttonName }}</button>
      </div>
    </div>

    <span :class="errorText ? 'error-text' : 'hidden-span'">{{
      errorText
    }}</span>
    <span :class="hintText ? 'hint-text' : 'hidden-span'">{{ hintText }}</span>
  </div>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/BaseInput.vue'

  defineProps({
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
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
    icon: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    errorText: {
      type: String,
      required: false,
      default: '',
    },
    hintText: {
      type: String,
      required: false,
      default: '',
    },
    buttonName: {
      type: String,
      required: false,
      default: 'Button',
    },
  })

  const emits = defineEmits(['onChange', 'onSubmit'])
</script>

<style scoped>
  .alser-ui-library-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .label {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }

  .lable__text_required {
    color: var(--colors-text-disabled, #c3c8c2);
  }
  .label__mark {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: var(--secondary-brand);
    font-size: 1.2rem;
  }
  .lable__text {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
  .input-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 16px;
    background: #fff;
    /* overflow: hidden; */
    box-sizing: content-box;
  }

  .a {
    flex: 1;
    border-radius: 16px 0 0 16px;
    border: 1px solid rgba(35, 54, 45, 0.12);
    padding: 8px 12px 8px 16px;
  }
  .b {
    flex: 1;
    width: 15%;
    max-width: 119px;
    border-radius: 0 16px 16px 0;
    border: 1px solid rgba(35, 54, 45, 0.12);
    overflow: hidden;
  }
  .a:focus-within {
    border: 1px solid var(--border-brand, #97cf9c);
    box-shadow: 0px 0px 0px 4px rgba(70, 167, 88, 0.24);
    z-index: 1;
  }

  /* Переопределение стиля для .a, когда установлен errorText */
.input-error:focus-within {
    border: 1px solid var(--border-error, #F3B0A2);
    box-shadow: none;
}

/* Переопределение стиля для .a, когда disabled */
.a[disabled]:focus-within,
.a[aria-disabled="true"]:focus-within {
    border: 1px solid rgba(35, 54, 45, 0.12);
    box-shadow: none;
}
  .input-error {
    border: 1px solid var(--border-error, #F3B0A2);
  }

  .b:focus-within {
    box-shadow: 0px 0px 0px 4px rgba(70, 167, 88, 0.24);
    border: 1px solid var(--border-brand, #97cf9c);
  }
  .btn {
    width: 100%;
    height: 100%;
    border: none;
    background: var(--bg-secondary, #f8f9fa);
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: black;
    outline: none;
  }

  .hint-text {
    color: var(--colors-text-warning-primary, #ffa01c);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142%; /* 20px */
    letter-spacing: 0.35px;
  }

  .hidden-span {
    display: none;
  }
  .error-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 142%;
    letter-spacing: 0.35px;
    color: var(--text-error-primary, #e54d2e);
  }


  .button-disabled {
    background: var(--bg-secondary, #f8f9fa);
    color: var(--text-disabled, #c3c8c2);
    cursor: not-allowed;
  }
</style>
