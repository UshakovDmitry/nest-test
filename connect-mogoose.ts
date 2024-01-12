router.beforeEach(async (to, from, next) => {
  const tokenLocalStorage = localStorage.getItem('token');
  const tokenSessionStorage = sessionStorage.getItem('token');

  const isAuthenticated = tokenLocalStorage || tokenSessionStorage;

  if (to.name !== 'login' && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'orders' });
  }

  next();
});
