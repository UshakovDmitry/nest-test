<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <Field
        :config="model.fields[0]"
        @input="viewModel.setEmail($event)"
      ></Field>
      <Field
        :config="model.fields[1]"
        @input="viewModel.setPassword($event)"
      ></Field>
      <div>
        <ButtonComponent
          :config="{
            type: 'filled',
            color: 'green',
            value: 'Войти',
            border: 'large',
            width: '350px',
            disabled: false,
          }"
          @on-click="viewModel.handleLogin()"
        ></ButtonComponent>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '../../public/icons/logo.svg';
import ButtonComponent from '../../components/global/button/button.vue';
import { AuthModel } from './auth.model';
import { AuthViewModel } from './auth.viewmodel';
import Field from '../../components/global/fields/fieild/field.vue';
import { FieldModel } from '../../components/global/fields/fieild/field.model';
import { ref, Ref } from 'vue';

const model: Ref<AuthModel> = ref(
  new AuthModel({
    fields: [
      new FieldModel({
        label: 'Email',
        input: {
          type: 'email',
          value: '',
          placeholder: 'Введите Email',
          isError: false,
          isDisabled: false,
          isTextarea: false,
          required: true,
          maxLength: 20,
        },
        helper: {
          isActive: true,
          value: 'test',
        },
      }),
      new FieldModel({
        label: 'Пароль',
        input: {
          type: 'password',
          value: '',
          placeholder: 'Введите пароль',
          isDisabled: false,
          isTextarea: false,
          required: true,
          maxLength: 20,
          isError: false,
        },
        helper: {
          isActive: true,
          value: 'test',
        },
      }),
    ],
  }),
);
const viewModel: Ref<AuthViewModel> = ref(new AuthViewModel(model.value));
</script>
<style scoped>
.auth {
  background: linear-gradient(108deg, #01a254 0%, #50d17f 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* margin-left: -72px;
  margin-top: -107px; */
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

model

export interface IAuthModel {
    email: string;
    password: string;
    isShowedPassword?: boolean;
    fields?: any[];

  }
  
  export class AuthModel implements IAuthModel {
    email: string;
    password: string; 
    isShowedPassword?: boolean;
    fields?: any[];
  
    constructor(obj:any) {
        this.email = '';
        this.password = '';
        this.isShowedPassword = false;
        this.fields = obj.fields;

    }
  }
  
