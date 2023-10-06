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

// Инициализация статуса авторизации, если он еще не установлен
if (localStorage.getItem("isLogin") === null) {
  localStorage.setItem("isLogin", "false");
}

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isLogin") === "true";

  if (!to.meta.public && !isAuthenticated) {
    next("/auth");
  } else if (to.path === "/auth" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
