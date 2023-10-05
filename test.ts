GET
http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.vue

GET
http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts

Loading module from “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.vue” was blocked because of a disallowed MIME type (“text/html”).
auth
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.vue”. auth:13:45
Loading module from “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts” was blocked because of a disallowed MIME type (“text/html”).
auth
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/public/icons/logo.svg?import”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/button/button.vue”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.model.ts”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/password-field/password-field.model.ts”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.viewmodel.ts”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/password-field/password-field.vue?t=1696503580072”. auth:13:45
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.component.vue?vue&type=style&index=0&scoped=a624e9e6&lang.css”. auth:13:45
<template>
  <div
    class="field"
    :class="{ invalid: config.helper.isActive && config.input.isError }"
  >
    <label for="email-field" class="label grey-text">
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

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 80px;
}

.label {
  color: rgba(4, 48, 27, 0.3);

/* Typography/Body Medium */
font-family: Rubik;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: 0.5px;
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
    border-color: #c91e2d !important;

    &::placeholder {
      color: #c91e2d !important;
    }
  }

  label {
    color: #c91e2d !important;
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



