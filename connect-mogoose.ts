<template>
  <component :is="currentLayout">
    <router-view></router-view>
  </component>
  <footer-component></footer-component>
</template>

<script setup lang="ts">
import { ref, onBeforeRouteUpdate, onBeforeRouteEnter } from 'vue';
import { useRoute } from 'vue-router';
import Layout from "./ui/layout/layout.vue";
import NotAuthorizedLayout from "./ui/layout/not-authorized/not-authorized-layout.vue";
import FooterComponent from "./ui/layout/footer.vue";

const route = useRoute();
const currentLayout = ref(Layout); // Инициализируем с основным layout

// Функция обновления layout
function updateLayout() {
  currentLayout.value = route.meta.layout === "not-authorized" ? NotAuthorizedLayout : Layout;
}

// Обновляем layout при изменении маршрута
onBeforeRouteUpdate(updateLayout);
onBeforeRouteEnter(updateLayout);

// Вызываем функцию обновления при инициализации
updateLayout();
</script>

<style scoped>
.app {
  /* Ваши стили... */
}
</style>
