Я разработал приложение где есть роут /auth
и другие роуты(с использованием layout (navbar и header))
у меня проблема
из-за этого layout моя страница имеет отступы которые мешают сверстать страницу auth

вот страница auth.vue
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

вот App.vue
<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import './assets/styles/main.scss';

#app {
  // border: 2px solid rgb(245, 5, 5);
  padding-left: 72px;
  padding-top: 107px;
  margin: 0px;
  box-sizing: content-box;
  width: calc(100% - 72px);
  min-height: 100vh;
  color: #2c3e50;
  background-color: #f8f9fd;
  margin: 0;
  // border: 1px solid #1e39a8;
}

.app__content {
  padding: 0;
}
</style>

вот layout
<template>
  <div>
    <AppHeaderComponent v-if="!isAuthPage" />
    <div class="main-layout">
      <AppNavbarComponent v-if="!isAuthPage" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import AppNavbarComponent from '../components/AppNavbarComponent.vue';

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');
</script>

<style >
.main-layout {
  display: flex;
  flex-direction: row;
}
.content {
  flex: 1;
}
</style>
вот router
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
    },
  },
  {
    path: '/',
    component: Layout,
    meta: {},
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

если нужны еще какие то файлы то я предоставлю

