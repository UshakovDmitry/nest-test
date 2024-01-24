<template>
  <component :is="layoutComponent"></component>
  <div class="app">
    <router-view></router-view>
  </div>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import Layout from "./ui/layout/layout.vue";
import NotAuthorizedLayout from "./ui/layout/not-authorized/not authorized-layout.vue";
import FooterComponent from "./ui/layout/footer.vue";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const layoutComponent = ref();

watch(route, (newRoute) => {
  layoutComponent.value = newRoute.meta.layout === "not-authorized" ? NotAuthorizedLayout : Layout;
}, { immediate: true });
</script>

<style scoped>
.app {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fbfbfb;
}
</style>
