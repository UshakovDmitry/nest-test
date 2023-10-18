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
