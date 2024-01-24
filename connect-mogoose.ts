import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BaseLayout from './layouts/BaseLayout.vue'; // Основной layout
import SimpleLayout from './layouts/SimpleLayout.vue'; // Простой layout для signup и login
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import OtherPage from './pages/OtherPage.vue'; // Пример другой страницы

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'profile', component: ProfilePage },
      { path: 'other', component: OtherPage } // Пример другой страницы внутри BaseLayout
      // Другие маршруты, которые должны использовать BaseLayout...
    ]
  },
  {
    path: '/login',
    component: SimpleLayout,
    children: [
      { path: '', component: LoginPage }
    ]
  },
  {
    path: '/signup',
    component: SimpleLayout,
    children: [
      { path: '', component: SignupPage }
    ]
  },
  // Любые другие маршруты, требующие SimpleLayout, можно добавить здесь...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
