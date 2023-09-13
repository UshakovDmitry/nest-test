

MODULE.TS
import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: false },
      },
    });
  }

  async readFromQueue(): Promise<any> {
    // Просто отправьте сообщение на сервер
    return this.client.send('get_message', {}).toPromise();
  }
}

COTROLLER.TS

import { Controller, Get } from '@nestjs/common';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}
  @Get()
  async getTransport() {
    return await this.transportService.getTransport();
  }
}

SERVICE.TS
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: false },
      },
    });
  }

  async readFromQueue(): Promise<any> {
    return this.client.send<any, any>('get_message', {}).toPromise();
  }
}
