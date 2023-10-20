function parseJwt(token) {
  try {
    // Получить payload токена
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Декодировать payload
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    console.log(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Ошибка при разборе токена:", error);
    return null;
  }
}
