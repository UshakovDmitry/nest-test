auth.viewmodel.ts:63 Ошибка при разборе токена: DOMException: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
    at AuthViewModel.parseJwt (http://localhost:3000/src/pages/auth/auth.viewmodel.ts?t=1697774185994:40:46)
    at AuthViewModel.authorize (http://localhost:3000/src/pages/auth/auth.viewmodel.ts?t=1697774185994:24:32)
parseJwt @ auth.viewmodel.ts:63
authorize @ auth.viewmodel.ts:34
await in authorize (async)
handleLogin @ auth.viewmodel.ts:120
_createVNode.onOnClick._cache.<computed>._cache.<computed> @ auth.component.vue:23
callWithErrorHandling @ runtime-core.esm-bundler.js:158
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:166
emit @ runtime-core.esm-bundler.js:664
(anonymous) @ runtime-core.esm-bundler.js:7422
_createElementBlock.onClick._cache.<computed>._cache.<computed> @ button.vue:15
callWithErrorHandling @ runtime-core.esm-bundler.js:158
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:166
invoker @ runtime-dom.esm-bundler.js:278
Show 7 more frames
Show less
auth.viewmodel.ts:35 null 'dataToken'

  constructor(model: AuthModel) {
    this.model = model;
  }
  async authorize(): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('client_id', 'DispatcherWorkplace');
      formData.append('client_secret', 'secret');
      formData.append('grant_type', 'password');
      formData.append('username', this.model.email);
      formData.append('password', this.model.password);
      formData.append('scope', 'myAPIs');

      const response = await fetch('https://auth3.next.local/connect/token', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        this.saveToken(data.access_token);
        const dataToken = this.parseJwt(data.access_token); // Декодирование и вывод содержимого токена
console.log(dataToken, 'dataToken');

        // router.push('/dashboard');
        return true;
      } else {
        console.error('Авторизация не удалась:', await response.text());
        return false;
      }
    } catch (error: Error | any) {
      console.error(error.message);
      return false;
    }
  }

  parseJwt(token) {
    try {
      // Получить payload токена
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      
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



вот как приходят данные 
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJhODU1NGY5MTgxYjQ0Mzc5ZjA3MTllZjI4NDE0MmFmIn0.eyJjbGllbnRfaWQiOiJEaXNwYXRjaGVyV29ya3BsYWNlIiwiaWRwIjoibG9jYWwiLCJsb2NhbGUiOiLQkNC70LzQsNGC0YsiLCJuaWNrbmFtZSI6IiIsImF1dGhfdGltZSI6MTY5Nzc5NDg4OCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQzg5OTRCQUEtQkQ3OS00REE1LUFFMDMtNzk0RjVGMTFDOTg0IiwiZmFtaWx5X25hbWUiOiLQo9GI0LDQutC-0LIiLCJnaXZlbl9uYW1lIjoi0JTQvNC40YLRgNC40LkiLCJ3ZWJzaXRlIjpbItCe0YLQtNC10Lsg0YDQsNC30YDQsNCx0L7RgtC60Lgg0J_QniIsItCg0LDQt9GA0LDQsdC-0YLRh9C40Log0J_QniJdLCJwcm9maWxlIjoiOTUwNDA4MDUwMzc0IiwibmJmIjoxNjk3NzczMjg3LCJleHAiOjE2OTc4MTY0ODcsImlzcyI6Imh0dHA6Ly9hdXRoMy5uZXh0LmxvY2FsIiwic2NvcGUiOlsibXlBUElzIl0sImF1ZCI6WyJteUFQSXMiLCJodHRwOi8vYXV0aDMubmV4dC5sb2NhbC9yZXNvdXJjZXMiXSwiYW1yIjpbInB3ZCJdfQ.zqJcy_pyWGFu0jsu-AMChVbNjwMk0K5ugoxKibsEjfM",
    "expires_in": 42279,
    "token_type": "Bearer",
    "scope": "bus.api myAPIs offline_access",
    "refresh_token": "0b1581e4e64700bc9498687c59dc27ea96a257c126a8bf01d9a412bd3a48013f"
}
