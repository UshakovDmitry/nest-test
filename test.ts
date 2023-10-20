<template>
  <div>
    <AppHeaderComponent :user="user" v-if="!isAuthPage" />
    <div class="main-layout">
      <AppNavbarComponent v-if="!isAuthPage" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import AppNavbarComponent from '../components/AppNavbarComponent.vue';

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');

// Реактивное свойство для хранения данных пользователя
const user = ref<IUser | null>(null);

onMounted(() => {
  // Считывание данных пользователя из локального хранилища при монтировании компонента
  const userData = localStorage.getItem('user');
  if (userData) {
    user.value = JSON.parse(userData);
  }
});

</script>

<style>
.main-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.content {
  flex: 1;
}
</style>

