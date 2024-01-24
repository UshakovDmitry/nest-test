<template>
  <not-authorized-layout
    v-if="
      $router.currentRoute.value.name === 'login' ||
      $router.currentRoute.value.name === 'signup'
    "
  ></not-authorized-layout>

  <layout
    v-if="
      $router.currentRoute.value.name !== 'login' &&
      $router.currentRoute.value.name !== 'signup'
    "
  ></layout>
  <div class="app">
    <router-view></router-view>
  </div>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import Layout from "./ui/layout/layout.vue";
import NotAuthorizedLayout from "./ui/layout/not-authorized/not authorized-layout.vue";
import FooterComponent from "./ui/layout/footer.vue";
</script>

<style scoped>
.app {
  /* border: 1px solid green; */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fbfbfb;
}
</style>




///////////

import { createRouter, createWebHistory, RouteRecordRaw, } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "catalog",
    component: () => import("@/ui/pages/catalog/сatalog.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/ui/pages/login/login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/ui/pages/sign-up/sign-up.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/ui/pages/orders/orders.vue"),
  },
  {
    path: "/service",
    name: "service",
    component: () => import("@/ui/pages/service/service.vue"),
  },
  {
    path: "/promotions",
    name: "promotions",
    component: () => import("@/ui/pages/promotions/promotions.vue"),
  },

  {
    path: '/compare',
    name: 'compare',
    component: () => import("@/ui/pages/compare/compare.vue"),

  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("@/ui/pages/favorites/favorites.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/ui/pages/cart/cart.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/ui/pages/profile/profile.vue"),
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link-active',
});

// FIXME: update
router.beforeEach(async (to, from, next) => {
  console.log(from);
  
  const tokenLocalStorage = localStorage.getItem('token');
  const tokenSessionStorage = sessionStorage.getItem('token');

  const isAuth = tokenLocalStorage || tokenSessionStorage;

  // Проверка, находится ли пользователь на странице login или signup
  const isOnAuthPages = to.name === 'login' || to.name === 'signup';

  if (!isAuth && !isOnAuthPages) {
    // Если пользователь не авторизован и не на страницах login или signup, перенаправляем на login
    return next({ name: 'login' });
  }

  if (isOnAuthPages && isAuth) {
    // Если пользователь авторизован и пытается зайти на страницу login или signup, перенаправляем на orders
    return next({ name: 'catalog' });
  }

  // В остальных случаях пропускаем пользователя на запрашиваемый роут
  next();
});

export default router;


