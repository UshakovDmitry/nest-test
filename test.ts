import {
  createRouter,
  createWebHistory,
} from 'vue-router';
// ... (остальные импорты)

const routes = [ /* ваш массив маршрутов */ ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Проверяем, есть ли токен в localStorage
  const token = localStorage.getItem('token');
  
  // Проверяем, есть ли мета-тег "public" в маршруте, куда мы переходим
  const isPublicRoute = to.matched.some(record => record.meta.public);
  
  // Если токен есть, или это публичный маршрут, то разрешаем переход
  if (token || isPublicRoute) {
    next();
  } else {
    // Иначе, перенаправляем пользователя на страницу авторизации
    next({ name: 'Auth' });
  }
});

export default router;
