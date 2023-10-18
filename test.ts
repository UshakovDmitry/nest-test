import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}






import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body): Promise<any> {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Get('checktoken')
  async checkToken(@Query('token') token: string): Promise<any> {
    return this.authService.checkToken(token);
  }
}










import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(username: string, password: string): Promise<AxiosResponse<any>> {
    const formData = new URLSearchParams();
    formData.append('client_id', 'DispatcherWorkplace');
    formData.append('client_secret', 'secret');
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', 'myAPIs');

    return this.httpService
      .post('https://auth3.next.local/connect/token', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
  }

  async checkToken(token: string): Promise<AxiosResponse<any>> {
    return this.httpService
      .get('https://auth3.next.local/connect/checktoken', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
  }
}
