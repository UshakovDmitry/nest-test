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

<template>
  <router-view :class="{ 'with-layout': $route.meta.hasLayout }" />
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import './assets/styles/main.scss';


#app {

  margin: 0px;
  box-sizing: content-box;
  width: calc(100% - 72px);
  min-height: 100vh;
  color: #2c3e50;
  background-color: #f8f9fd;
  margin: 0;
  // border: 1px solid #1e39a8;
}
#app.with-layout {
  padding-left: 72px;
  padding-top: 107px;
  /* остальные стили */
}

.app__content {
  padding: 0;
}
</style>


