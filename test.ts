AuthController
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body): Promise<any> {
    const { username, password } = body;
    console.log('body', body);
    
    return this.authService.login(username, password);
  }


  @Post('/checktoken')
  async checkToken(@Body('token') token: string): Promise<any> {
    return this.authService.checkToken(token);
  }
}

AuthService
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom,firstValueFrom } from 'rxjs'; // Импортируйте нужный метод

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
    
    return lastValueFrom(response$); //  lastValueFrom или firstValueFrom
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
    
    return lastValueFrom(response$); //  lastValueFrom или firstValueFrom
  }
}

AuthModule
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

Приложение запущено на порту 4000
body {}
[Nest] 17768  - 18.10.2023, 12:21:44   ERROR [ExceptionsHandler] self signed certificate in certificate chain
Error: self signed certificate in certificate chain
    at Function.AxiosError.from (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\axios\lib\core\AxiosErr
or.js:89:14)
    at RedirectableRequest.handleRequestError (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\axios\lib
\adapters\http.js:593:25)
    at RedirectableRequest.emit (node:events:526:28)
    at ClientRequest.eventHandlers.<computed> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\follow-re
directs\index.js:14:24)
    at ClientRequest.emit (node:events:526:28)
    at TLSSocket.socketErrorListener (node:_http_client:442:9)
    at TLSSocket.emit (node:events:526:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)


