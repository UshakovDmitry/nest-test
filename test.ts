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

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');

// Реактивное свойство для хранения данных пользователя
const user = ref<IUser | null>(null);

// Функция для загрузки данных пользователя из локального хранилища
function loadUserData() {
  const fullName = localStorage.getItem('userFullName');
  const position = localStorage.getItem('userPosition');
  const iin = localStorage.getItem('userIin');

  if (fullName && position && iin) {
    user.value = {
      fullName: fullName,
      position: position,
      iin: iin,
    };
  }
}

onMounted(loadUserData);

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

