<template>
  <component :is="layout">
    <router-view />
  </component>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Layout from "./ui/layout/layout.vue";
import NotAuthorizedLayout from "./ui/layout/not-authorized/not-authorized-layout.vue";
import FooterComponent from "./ui/layout/footer.vue";

const route = useRoute();

const layout = computed(() => {
  // Возвращаем компонент layout в зависимости от мета-данных роута
  return route.meta.layout === 'not-authorized' ? NotAuthorizedLayout : Layout;
});
</script>

<style scoped>
// Ваши стили...
</style>

