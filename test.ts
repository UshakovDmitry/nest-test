<template>
  <div
    class="field"
    :class="{ invalid: config.helper.isActive && config.input.isError }"
  >
    <label for="email-field" class="body-small grey-text">
      {{ config.label }}
    </label>
    <input
      :type="config.input.type"
      name="email-field"
      class="body-medium"
      :class="{ disabled: config.input.isDisabled }"
      :value="config.input.value"
      :placeholder="config.input.placeholder"
      @focusout="
        config.setValue(($event.target as HTMLInputElement).value.trim());
        !config.input.required && config.isEmpty();
      "
      @input="
        config.setValue(($event.target as HTMLInputElement).value.trim());
        emits('input', config.input.value);
      "
    />
    <div
      class="label-small red-text"
      v-if="config.helper.isActive && config.input.isError"
    >
      {{ config.helper.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IEmailField } from './email-field.model';

 defineProps<{
  config: IEmailField;
}>();

const emits = defineEmits(['input']);
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

input {
  box-sizing: border-box;
  background: inherit;
  border: 1px solid var(--light);
  border-radius: 16px;
  width: 100%;
  height: 40px;
  padding: 12px;
  outline: none;
}

input.disabled {
  border: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.1px;
  padding: 0;
}

.invalid {
  input {
    border-color: var(--red) !important;

    &::placeholder {
      color: var(--red) !important;
    }
  }

  label {
    color: var(--red) !important;
  }
}
</style>
export interface IEmailField {
  label?: string;
  input: {
    type: string;
    placeholder: string;
    value: string;
    isError: boolean;
    isDisabled: boolean;
    required: boolean;
    body_key?: string;
  };
  helper: {
    value: string;
    isActive: boolean;
  };
  isEmpty: () => void;
  checkValid?: () => void;
  setValue: (value: string) => void;
}

export class EmailField implements IEmailField {
  label?: string;
  input: {
    type: string;
    placeholder: string;
    value: string;
    isError: boolean;
    required: boolean;
    isDisabled: boolean;
    body_key?: string;
  };

  helper: {
    value: string;
    isActive: boolean;
  };

  constructor(object: {
    label: string;
    input: {
      type: string;
      placeholder: string;
      value: string;
      isError: boolean;
      required: boolean;
      isDisabled: boolean;
      body_key: string;
    };
    helper: {
      value: string;
      isActive: boolean;
    };
  }) {
    for (const key in object) {
      this[key] = object[key];
    }
  }

  setValue(value: string): void {
    this.input.value = value;
    this.clearError();
    if (this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = 'Введите корректный email';
    }
  }

  isEmpty(): void {
    this.clearError();
    if ((!this.input.value && !this.input.value.length) || this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = this.input.value.length
        ? 'Введите корректный email'
        : 'Поле не должно быть пустым';
    }
  }

  // При вводе значений в инпут проверяем стал ли он валидным
  checkValid(): boolean {
    console.log('checkValid');
    
    return !this.input.value.includes('@');
  }

  clearError(): void {
    this.input.isError = false;
    this.helper.isActive = false;
    this.helper.value = '';
  }
}

ЭТОЙ МОЙ КОМПОНЕНТ
вот ошибка 
Uncaught SyntaxError: The requested module '/src/components/global/fields/email-field/email-field.model.ts' does not provide an export named 'IEmailField' (at email-field.vue:35:10)

вот что я передаю
      <emailField
        :config="{
          label: 'Email',
          input: {
            type: 'email',
            placeholder: 'Введите email',
            value: '',
            isError: false,
            isDisabled: false,
            required: true,
          },
          helper: {
            value: 'Пожалуйста, введите email',
            isActive: false,
          },
        }"
        @input="viewModel.setEmail($event)"
      ></emailField> 

Type '{ label: string; input: { type: string; placeholder: string; value: string; isError: false; isDisabled: false; required: true; }; helper: { value: string; isActive: false; }; }' is missing the following properties from type 'IEmailField': isEmpty, setValuets(2739)
(property) config: IEmailField

