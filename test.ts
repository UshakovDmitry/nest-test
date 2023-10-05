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
import { IEmailField } from '../../components/global/fields/email-field/email-field.model';
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
    
'IEmailField' only refers to a type, but is being used as a value here.ts(2693)
any

'IEmailField' is declared but its value is never read.ts(6133)
(alias) interface IEmailField
import IEmailField
