<template>
  <component :is="layoutComponent"></component>
  <div class="app">
    <router-view></router-view>
  </div>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Layout from "./ui/layout/layout.vue";
import NotAuthorizedLayout from "./ui/layout/not-authorized/not-authorized-layout.vue";
import FooterComponent from "./ui/layout/footer.vue";

const route = useRoute();
const layoutComponent = ref();

watch(route, (newRoute) => {
  layoutComponent.value = newRoute.meta.layout === "not-authorized" ? NotAuthorizedLayout : Layout;
}, { immediate: true });
</script>

<style scoped>
.app {
  /* Стили для .app */
}
</style>
