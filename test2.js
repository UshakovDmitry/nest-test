router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    try {
      const response = await fetch('https://auth3.next.local/connect/checktoken', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        next(); // Переход к следующему роуту, если токен действителен
      } else {
        localStorage.removeItem("access_token"); // Удалить токен, если он недействителен
        next('/auth'); // Перенаправление на страницу аутентификации
      }
    } catch (error) {
      console.error(error);
      next('/auth'); // Перенаправление на страницу аутентификации в случае ошибки
    }
  } else if (to.meta.public) {
    next(); // Разрешить доступ к публичным роутам
  } else {
    next('/auth'); // Перенаправление на страницу аутентификации, если токен отсутствует
  }
});

