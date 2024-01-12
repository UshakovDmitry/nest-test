router.beforeEach(async (to, from, next) => {
  const tokenLocalStorage: string | null = localStorage.getItem('token')
  const tokenSessionStorage: string | null = sessionStorage.getItem('token')

  if (to.name !== 'login' && !tokenLocalStorage) {
    return next({
      name: 'login'
    })
  }
  

  if (to.name === 'login' && (tokenLocalStorage || tokenSessionStorage) )
    return next({
      name: 'orders'
    })
  else {
    next()
  }

})
