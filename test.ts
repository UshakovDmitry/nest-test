GET
http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts?t=1696504961130

Loading module from “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts?t=1696504961130” was blocked because of a disallowed MIME type (“text/html”).
auth
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/email-field/email-field.model.ts?t=1696504961130”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/public/icons/logo.svg?import”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/domain/interfaces/button.interface.ts?t=1696505347060”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/button/button.vue?t=1696505347060”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.model.ts?t=1696505131964”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.viewmodel.ts”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/pages/auth/auth.component.vue?vue&type=style&index=0&scoped=a624e9e6&lang.css”. auth:13:61
Loading failed for the module with source “http://127.0.0.1:3000/src/components/global/fields/password-field/password-field.model.ts?t=1696504961130”. auth:13:61

<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <EmailInput
        :config="model.login.fields[0]"
        @input="viewModel.setEmail($event)"
      ></EmailInput>
      <!-- <PasswordInput :config="model.login.fields[1]"> </PasswordInput> -->
      <ButtonComponent
        :config="model.login.loginBtn"
        @onClick="viewModel.postData()"
      ></ButtonComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../public/icons/logo.svg';
import ButtonComponent from '../../components/global/button/button.vue';
// import EmailInput from '../../components/global/fields/email-field/email-field.vue';
import PasswordInput from '../../components/global/fields/password-field/password-field.vue';
import { Button } from '../../domain/interfaces/button.interface';
import { AuthModel } from './auth.model';
import { EmailField } from '../../components/global/fields/email-field/email-field.model';
import { PasswordField } from '../../components/global/fields/password-field/password-field.model';
import { AuthViewModel } from './auth.viewmodel';
import { ref, Ref } from 'vue';

const model: Ref<AuthModel> = ref(new AuthModel({
  email: '',
  password: '',
  login: {
    fields:[
      new EmailField ({
        label: 'Email',
        input: {
          type: 'email',
          placeholder: 'Введите email',
          value: '',
          isError: false,
          isDisabled: false,
          required: true,
          body_key: 'email',
        },
        helper: {
          value: 'Пожалуйста, введите email',
          isActive: false,
        },
      }),
      new PasswordField ({
        label: 'Пароль',
        isShowed: false,
        input: {
          type: 'password',
          placeholder: 'Введите пароль',
          value: '',
          isError: false,
          isDisabled: false,
          required: true,
          body_key: 'password',
        },
        helper: {
          value: 'Пожалуйста, введите пароль',
          isActive: false,
        },
      }),
    ],
    loginBtn: new Button({
      value: 'Войти',
      type: 'filled',
      color: 'green',
      border: 'large',
      loading: false,
      disabled: false,
      width: '100%',
    }),
  }
}
  
));
const viewModel: Ref<AuthViewModel> = ref(new AuthViewModel(model.value));

</script>
<style scoped >
.auth {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(108deg, #01a254 0%, #50d17f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -72px;
  margin-top: -107px;
  box-sizing: border-box;
}
.auth__content {
  display: flex;
  width: 420px;
  padding: 36px;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
  border-radius: 16px;
  box-sizing: border-box;

  background: #fff;
}
</style>
export interface IEmailField {
  label: string;
  translateLabel?: string;
  input: {
    type: string;
    placeholder: string;
    translateKey?: string;
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
  checkValid: () => void;
  setValue: (value: string) => void;
}

export class EmailField implements IEmailField {
  label: string;
  translateLabel?: string;
  input: {
    type: string;
    placeholder: string;
    translateKey?: string;
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
    translateLabel?: string;
    input: {
      type: string;
      placeholder: string;
      translateKey?: string;
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
    this.label = object.label;
    this.translateLabel = object.translateLabel;
    this.input = object.input;
    this.helper = object.helper;
  }

  setValue(value: string) {
    this.input.value = value;
    this.clearError();
    if (this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = "Введите корректный email";
    }
  }

  isEmpty(): void {
    this.clearError();
    if ((!this.input.value && !this.input.value.length) || this.checkValid()) {
      this.input.isError = true;
      this.helper.isActive = true;
      this.helper.value = this.input.value.length
        ? "Введите корректный email"
        : "Поле не должно быть пустым";
    }
  }

  // При вводе значений в инпут проверяем стал ли он валидным
  checkValid(): boolean {
    return !this.input.value.includes("@");
  }

  clearError() {
    this.input.isError = false;
    this.helper.isActive = false;
    this.helper.value = "";
  }
}
<template>
  <div
    class="field"
    :class="{ invalid: config.helper.isActive && config.input.isError }"
  >
    <label for="email-field" class="body-small grey-text"></label>
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
import { IEmailField } from "./email-field.model";

defineProps<{
  config: IEmailField;
}>();

const emits = defineEmits(["input"]);
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
