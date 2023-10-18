import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

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



[Nest] 19464  - 18.10.2023, 13:58:11   ERROR [ExceptionsHandler] request to https://auth3.next.local/connect/token failed, reason: self s
igned certificate in certificate chain
FetchError: request to https://auth3.next.local/connect/token failed, reason: self signed certificate in certificate chain
    at ClientRequest.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\node-fetch\lib\index.
js:1501:11)
    at ClientRequest.emit (node:events:526:28)
    at TLSSocket.socketErrorListener (node:_http_client:442:9)
    at TLSSocket.emit (node:events:526:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
