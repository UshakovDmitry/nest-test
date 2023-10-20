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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import AppNavbarComponent from '../components/AppNavbarComponent.vue';
import { IUser } from '../domain/interfaces/user.interface';
import { userCRUDService } from '../services/userCRUDService';

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');

// Реактивное свойство для хранения данных пользователя
const user = ref<IUser | null>(null);

onMounted(() => {
  // Загрузка данных пользователя из сервиса userCRUDService
  const userData = userCRUDService.readUser();
  if (userData.fullName && userData.position && userData.iin) {
    user.value = userData;
  }
});

// Наблюдение за изменением маршрута и обновление признака isAuthPage
watch(route, () => {
  isAuthPage.value = route.path === '/auth';
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

