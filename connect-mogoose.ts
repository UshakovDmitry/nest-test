router.beforeEach(async (to, from, next) => {
  const tokenLocalStorage = localStorage.getItem('token');
  const tokenSessionStorage = sessionStorage.getItem('token');

  const isAuth = tokenLocalStorage || tokenSessionStorage;

  // Проверка, находится ли пользователь на странице login или signup
  const isOnAuthPages = to.name === 'login' || to.name === 'signup';

  if (!isAuth && !isOnAuthPages) {
    // Если пользователь не авторизован и не на страницах login или signup, перенаправляем на login
    return next({ name: 'login' });
  }

  if (isOnAuthPages && isAuth) {
    // Если пользователь авторизован и пытается зайти на страницу login или signup, перенаправляем на orders
    return next({ name: 'orders' });
  }

  // В остальных случаях пропускаем пользователя на запрашиваемый роут
  next();
});

export default router;
