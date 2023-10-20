вот тут я передаю моковые данные 
<template>
  <div>
    <AppHeaderComponent
      :user="{
        fullName: 'Иванов Иван Иванович',
        iin: '123456789012',
      }"
      v-if="!isAuthPage"
    />
    <div class="main-layout">
      <AppNavbarComponent v-if="!isAuthPage" />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import AppNavbarComponent from '../components/AppNavbarComponent.vue';

const route = useRoute();
const isAuthPage = ref(route.path === '/auth');
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



как мне теперь передать данные из локального хранилища
