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

