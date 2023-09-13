

import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = new ClientProxy({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: false }
      },
    });
  }

  async readFromQueue(): Promise<any> {
    // Просто отправьте сообщение на сервер
    return this.client.send('get_message', {}).toPromise();
  }
}

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.module.ts:9:19 - error TS2511: Cannot create an instance of an abstract class.

  9     this.client = new ClientProxy({
                      ~~~~~~~~~~~~~~~~~
 10       transport: Transport.RMQ,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
 15       },
    ~~~~~~~~
 16     });
    ~~~~~~

Found 1 error(s).

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>



      
