router.ts

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Auth from '../views/auth/auth.component.vue';
import Layout from '../layout/dafault.vue';
import Dashboard from '../views/dashboard/dashboard.component.vue';
import Map from '../views/map/map.component.vue';
import Applications from '../views/applications/applications.component.vue';
import Transport from '../views/transport/transport.component.vue';
import Delivery from '../views/couriers/delivery.component.vue';

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
        path: 'applications',
        name: 'Applications',
        component: Applications,
      },
      {
        path: 'couriers',
        name: 'Сouriers',
        component: Delivery,
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
  <section class="couriers">
    <div class="couriers__header">
      <h1 class="couriers__title">Курьеры</h1>
      <div 
      class="add-courier__button"
      @click="viewModel.openModalAddCourier(true)"
      >
        <IconComponent
        :сonfig="{
          name: 'add',
          color:  '#fff',
          width: 24,
          height: 24,
        }"
      >
      </IconComponent>
        <span>Добавить курьера</span>
      </div>
    </div>

    <div class="couriers__content">
      <filters-panel-component
        :cities="model.cities"
        @select-city="viewModel.selectCity($event)"
        @downloadLoadersAsXLSX="viewModel.downloadLoadersAsXLSX"
      ></filters-panel-component>

      <table-component
        :headers="model.headersCouriers"
        :rows="model.couriers"
        :config="model.configCouriers"
        :currentCity="model.currentCity"
      ></table-component>
    </div>
    <modal-window-component
    v-if="model.isModalAddCourier"
      :cssClass="'add-courier-modal'"
      @close="viewModel.closeModalAddCourier"
    >
  <AddCourierModal></AddCourierModal></modal-window-component>
  
  </section>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { CouriersViewModel } from './delivery.viewmodel';
import { CouriersModel } from './delivery.model';
import TableComponent from '../../components/table/table-component.vue';
import filtersPanelComponent from '../applications/components/filters-panel/filters-panel.component.vue';
import IconComponent from '../../components/global/icon/icon.component.vue';
import ModalWindowComponent from '../../components/global/modal-window/modal.component.vue';
import AddCourierModal from './components/addCourier.modal.vue'; 
const model: Ref<CouriersModel> = ref(new CouriersModel());
const viewModel: Ref<CouriersViewModel> = ref(
  new CouriersViewModel(model.value),
);
</script>
<style scoped>
.couriers__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px 8px 0 8px;

}

.add-courier__button {
  border-radius: 16px;
  background: var(--primary-light-mode-main, #00a153);
  display: flex;
  padding: 8px 16px 8px 8px;
  align-items: center;
  gap: 12px;
  box-shadow:
    0px 2px 3px 0px rgba(204, 204, 204, 0.3),
    0px 6px 10px 4px rgba(204, 204, 204, 0.15);
  color: var(--text-light, #fff);
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.15px;
  cursor: pointer;
}
.couriers__title {
  align-self: stretch;
  color: var(--text-dark, #23362d);
  font-family: Rubik;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.wrapper-toggle-btns {
  width: 394px;
  height: 44px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.wrapper-toggle-btns-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.isActiveTab {
  color: var(--primary-light-mode-main, #00a153);
  border-bottom: 3px solid var(--primary-light-mode-main, #00a153);
}
.couriers {
  padding: 0 20px;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fd;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.couriers__content {
  margin-top: 24px;
  padding: 0 16px 16px 16px;
  border-radius: 16px;
  height: 840px;
  border: 1px solid var(--tertiary-light-mode-border, rgba(35, 54, 45, 0.12));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  box-shadow:
    0px 1px 3px 0px rgba(204, 204, 204, 0.3),
    0px 4px 8px 3px rgba(204, 204, 204, 0.15);
}
</style>


  в компонент <table-component
        :headers="model.headersCouriers"
        :rows="model.couriers"
        :config="model.configCouriers"
        :currentCity="model.currentCity"
      ></table-component>
я хочу передавать функцию которая будет брать id у того обьекта на который кликнули и переходит на новую страницу /couriers + этот id
