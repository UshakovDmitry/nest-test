auth.component.vue:62 Uncaught (in promise) TypeError: IEmailField is not a constructor
    at setup (auth.component.vue:62:23)
    at callWithErrorHandling (runtime-core.esm-bundler.js:158:18)
    at setupStatefulComponent (runtime-core.esm-bundler.js:7236:25)
    at setupComponent (runtime-core.esm-bundler.js:7197:36)
    at mountComponent (runtime-core.esm-bundler.js:5599:7)
    at processComponent (runtime-core.esm-bundler.js:5565:9)
    at patch (runtime-core.esm-bundler.js:5040:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5773:9)
    at ReactiveEffect.run (reactivity.esm-bundler.js:178:19)
    at instance.update (runtime-core.esm-bundler.js:5814:51)

<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <emailField
        :config="emailConfig"
        @input="viewModel.setEmail($event)"
      ></emailField> 
   <passwordField
        :config="{
          label: 'Пароль',
          isShowed: model.isShowedPassword,
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
          setValue: (value: string) => {
            viewModel.setPassword(value);
          },
          togglePasswordAction: () => {
            viewModel.togglePasswordAction();
          },

        }">
        </passwordField>
      <ButtonComponent
        :config="{
          value: 'Войти',
          type: 'filled',
          color: 'green',
          border: 'large',
          loading: false,
          disabled: false,
          width: '100%',
        }"
        @onClick="viewModel.postData()"
      ></ButtonComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../public/icons/logo.svg';
import ButtonComponent from '../../components/global/button/button.vue';
import emailField from '../../components/global/fields/email-field/email-field.vue';
import passwordField from '../../components/global/fields/password-field/password-field.vue';
import { AuthModel } from './auth.model';
import IEmailField from '../../components/global/fields/email-field/email-field.vue';
import { AuthViewModel } from './auth.viewmodel';
import { ref, Ref } from 'vue';

const model: Ref<AuthModel> = ref(new AuthModel());
const viewModel: Ref<AuthViewModel> = ref(new AuthViewModel(model.value));
  const emailConfig = new IEmailField({
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
});
</script>
<style scoped lang="scss">
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


