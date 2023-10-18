import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(username: string, password: string): Promise<any> {
    const formData = new URLSearchParams();
    formData.append('client_id', 'DispatcherWorkplace');
    formData.append('client_secret', 'secret');
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', 'myAPIs');

    const response = await fetch('https://auth3.next.local/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    return response.json();
  }

  async checkToken(token: string): Promise<any> {
    const response = await fetch('https://auth3.next.local/connect/checktoken', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }
}


[Nest] 18424  - 18.10.2023, 12:44:11   ERROR [ExceptionsHandler] fetch is not defined
ReferenceError: fetch is not defined
    at AuthService.login (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\auth\auth.service.ts:14:22)
    at AuthController.login (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\auth\auth.controller.ts:16:29)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\router\router-execution-context.js:3
8:29
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\router\router-execution-context.js:4
6:28
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\router\router-proxy.js:9:17
