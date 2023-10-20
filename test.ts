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



  В этом коде я напряму лезу в локальное хранилище но у меня есть сервис userCRUDService
import { IUser } from '../interfaces/user.interface';
import {
  storeProviderGetValue,
  storeProviderRemoveValue,
  storeProviderSetValue,
} from '../providers/store.provider';

export class userCRUDService {
  static USER_FULLNAME = 'user_fullname';
  static USER_POSITION = 'user_position';
  static USER_IIN = 'user_iin';

  static createUser(user: IUser) {
    storeProviderSetValue(this.USER_FULLNAME, user.fullName);
    storeProviderSetValue(this.USER_POSITION, user.position);
    storeProviderSetValue(this.USER_IIN, user.iin);
  }
  static readUser() {
    return {
      fullName: storeProviderGetValue(this.USER_FULLNAME),
      position: storeProviderGetValue(this.USER_POSITION),
      iin: storeProviderGetValue(this.USER_IIN),
    };
  }
  static updateUser(user: IUser) {
    this.createUser(user);
  }
  static deleteUser() {
    storeProviderRemoveValue(this.USER_FULLNAME);
    storeProviderRemoveValue(this.USER_POSITION);
    storeProviderRemoveValue(this.USER_IIN);
  }
}

примени его 
