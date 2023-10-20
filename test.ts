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
import NotFound from '../pages/not-found/not-found.component.vue';



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
    meta: { hasLayout: true },
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
      {
        path: '/:catchAll(.*)', 
        name: 'NotFound',
        component: NotFound,
        meta: {
          public: true,
          hasLayout: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;




мы с тобой реализовали функционал авторизации и получения токена
также мы с тобой реализовали парсинг токена
теперь я представлю тебе код roter/index.js
реализуй мне логику 
когда пользователь заходит в мое приложение я должен проверять наличие токена 
если он есть то у него должна быть возможность посещать все страницы сайта 
если поля токен нет 
то направляем его на /auth
