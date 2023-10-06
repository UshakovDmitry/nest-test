я хочу добавить глобально переменную isLogin  в свой проект чтобы разрещать или запрещать посещать приватные роуты
страница auth должна появляться если isLogin false
а если после авторизации все успешено то isLogin true 
также нужно проверять localstoarge на токен

страница auth
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

roter/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Auth from '../pages/auth/auth.component.vue';
import Layout from '../layout/dafault.vue';
import Dashboard from '../pages/dashboard/dashboard.component.vue';
import Map from '../pages/map/map.component.vue';
import TransportRequests from '../pages/transport-requests/transportRequests.component.vue';
import Transport from '../pages/transport/transport.component.vue';
import Couriers from '../pages/couriers/couriers.component.vue';
import CourierDetail from '../pages/courier-detail/courier-detail.component.vue';
import TransportRequestsDetail from '../pages/transport-requests-detail/transport-requests-detail.component.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      public: true,
      hasLayout: false,
    },
  },
  {
    path: '/',
    component: Layout,
    meta: {hasLayout: true},
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'map',
        name: 'Map',
        component: Map,
      },
      {
        path: 'requests',
        name: 'transportRequests',
        component: TransportRequests,
      },
      {
        path: 'requests/:id',
        name: 'TransportRequestsDetail',
        component: TransportRequestsDetail,
      },
      {
        path: 'couriers',
        name: 'Сouriers',
        component: Couriers,
      },
      {
        path: 'couriers/:id',
        name: 'CourierDetail',
        component: CourierDetail,
      },
      {
        path: 'transport',
        name: 'Transport',
        component: Transport,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

с кормментариями 
и расскажи как правильно такой функционало реализовывать 
