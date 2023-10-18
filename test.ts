import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; // Импортируйте нужный метод

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(username: string, password: string): Promise<any> {
    const formData = new URLSearchParams();
    formData.append('client_id', 'DispatcherWorkplace');
    formData.append('client_secret', 'secret');
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', 'myAPIs');

    const response$ = this.httpService.post(
      'https://auth3.next.local/connect/token', 
      formData.toString(), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    return lastValueFrom(response$); // Используйте lastValueFrom или firstValueFrom
  }

  async checkToken(token: string): Promise<any> {
    const response$ = this.httpService.get(
      'https://auth3.next.local/connect/checktoken', 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return lastValueFrom(response$); // Используйте lastValueFrom или firstValueFrom
  }
}
