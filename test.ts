const handleLogin = () => {
  // здесь вы можете добавить проверку значений, если это необходимо

  // установить isLogin в true в localStorage
  localStorage.setItem("isLogin", "true");

  // перенаправить пользователя на главную страницу
  router.push("/");
}

Отлично
теперь давай реализуем логику авторизации

пока что нужно просто ввести любые значения тогда islogin должен стать true
у меня есть 
auth.vue
<template>
  <div class="auth">
    <div class="auth__content">
      <img :src="logo" alt="logo" />
      <Field
        :config="model.fields[0]"
      ></Field>
      <Field
        :config="model.fields[1]"
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

const model: Ref<AuthModel> = ref(new AuthModel({
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
        new FieldModel( {
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
        })]
}));
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

auth.model.ts где я опичываю состояния

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
  
auth.viwModel.ts где я описываю бизнес логику
import { type AuthModel } from './auth.model';
export class AuthViewModel {
  model: AuthModel;

  constructor(model: AuthModel) {
    this.model = model;
  }
}

для инпутов я использую компонент Fieid
он принимает defineProps<{
  config: IField;
}>();
вот IField
export interface IField {
    label: string;
    translateLabel?: string | undefined;
    input: {
      type: string;
      placeholder: string;
      translateKey?: string | undefined;
      value: string;
      isError: boolean;
      isDisabled: boolean;
      required: boolean;
      body_key?: string;
      height?: string;
      isTextarea?: boolean;
      maxLength?: number | undefined;
    };
    helper: {
      value: string;
      isActive: boolean;
    };
    isEmpty: () => void;
    setValue: (value: string) => void;
  }
  
  export class FieldModel implements IField {
    label: any;
    input: any;
    helper: any;
  
    constructor(object: {
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
        height?: string;
        isTextarea?: boolean;
        maxLength?: number;
      };
      helper: {
        value: string;
        isActive: boolean;
      };
    }) {
      for (const key in object) {
        (this as any)[key] = (object as any)[key];
      }
    }
  
    setValue(value: string) {
      this.clearError();
      if (!value.length) {
        this.helper.isActive = true;
      }
      if (this.input.body_key?.includes("phone_number")) {
        this.input.value = this.phoneNumberValidation(value.trim());
      } else if (this.input.body_key?.includes("card_number")) {
        this.input.value = this.cardNumberValidation(value.trim());
      } else if (this.input.body_key?.includes("card_expire")) {
        this.input.value = this.cardExpiredValidate(value.trim());
      } else if (this.input.body_key?.includes("card_cvv")) {
        this.input.value = this.cardCVVValidation(value.trim());
      } else if (this.input.body_key?.includes("card_name")) {
        this.input.value = this.cardHandlerName(value);
      } else if (this.input.body_key?.includes("summa")) {
        const summa = parseInt(value.trim().replace(/\s/g, ""));
        if (isNaN(Number(summa))) {
          this.input.value = "";
          return;
        }
        this.input.value = new Intl.NumberFormat("ru-KK", {
          useGrouping: true
        }).format(Number(summa));
      } else {
        this.input.value = value.trim();
      }
    }
  
    isEmpty(): any {
      if (!this.input.value.length) {
        this.helper.isActive = true;
        this.input.isError = true;
        this.helper.value = "Поле не должно быть пустым";
      }
    }
  
    clearError() {
      this.input.isError = false;
      this.helper.isActive = false;
      this.helper.value = "";
    }
  
    cardCVVValidation(value: string) {
      value = value.replace(/\D/g, "");
      if (value.length > 3) {
        value = value.substring(0, 3);
      } else if (isNaN(Number(value))) {
        value = "";
      }
      return value;
    }
  
    cardHandlerName(value: any) {
      return value.toUpperCase();
    }
  
    cardExpiredValidate(value: string) {
      const x: any = value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/);
  
      if (!x[1]) {
        value = "";
      } else if (isNaN(x[1])) {
        value = "";
      } else if (x[1] < 2) {
        value = x[1];
      } else if (!x[2] || isNaN(x[2])) {
        value = x[1] + "/";
      } else {
        value = x[1] + "/" + x[2];
      }
      return value.substring(0, 5);
    }
  
    cardNumberValidation(value: string) {
      const x: any = value
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  
      if (!x[1]) {
        value = "";
      } else if (x[1].length < 4) {
        value = x[1];
      } else if (x[1].length === 4 && x[2].length < 4) {
        value = x[1] + " " + x[2];
      } else if (x[1].length + x[2].length === 8 && x[3].length < 4) {
        value = x[1] + " " + x[2] + " " + x[3];
      } else {
        value = x[1] + " " + x[2] + " " + x[3] + " " + x[4];
      }
      return value.substring(0, 19);
    }
  
    phoneNumberValidation(value: string) {
      const x: any = value
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
  
      if (!x[1]) {
        value = "";
      } else if (x[1] < 7) {
        value = "";
      } else if (x[1] === 8) {
        value = "+7";
      } else if (x[1] > 8) {
        value = "+7" + x[1];
      } else if (!x[2] && x[1] !== "") {
        value = x[1] === "+" ? x[1] : "+" + x[1] === "8" ? x[1] : "+7";
      } else {
        value = !x[3]
          ? "+" + x[1] + x[2]
          : "+" + x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
      }
      return value.substring(0, 16);
    }
  }
