<template>
  <AsyncLayoutComponent></AsyncLayoutComponent>
  <div class="app">
    <router-view></router-view>
  </div>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const AsyncLayoutComponent = defineAsyncComponent(() => new Promise(resolve => {
  // Ожидаем, пока роут будет полностью готов
  route.meta.loaded.then(() => {
    const layout = route.meta.layout === 'not-authorized' ? 
      import('./ui/layout/not-authorized/not-authorized-layout.vue') :
      import('./ui/layout/layout.vue');
    resolve(layout);
  });
}));

</script>
