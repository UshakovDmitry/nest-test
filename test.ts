<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 80px;
  color: #ff0000;
}

p {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>



import NotFound from '../path-to-your-component/NotFound.vue';

const routes: RouteRecordRaw[] = [
  // ... ваши текущие маршруты
  {
    path: '/:catchAll(.*)', // Это сработает для всех неизвестных маршрутов
    name: 'NotFound',
    component: NotFound,
    meta: {
      public: true,
      hasLayout: true,
    },
  },
];

// ... остальной код
