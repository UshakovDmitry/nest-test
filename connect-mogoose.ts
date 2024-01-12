router.beforeEach(async (to, from, next) => {
  const tokenLocalStorage = localStorage.getItem('token');
  const tokenSessionStorage = sessionStorage.getItem('token');

  const isAuth = tokenLocalStorage || tokenSessionStorage;

  if (to.name !== 'login' && to.name !== 'singup' && !isAuth) {
    return next({ name: 'login' });
  }

  if (to.name === 'login' && isAuth) {
    return next({ name: 'orders' });
  }

  next();
});

export default router;
