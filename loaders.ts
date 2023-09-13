// src/rabbitmq/index.ts

export * from './rabbitmq.module';
export * from './rabbitmq-listener.service';




MODULE.TS

// src/rabbitmq/rabbitmq.module.ts
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: false }
      },
    });
  }

  async readFromQueue(): Promise<any> {
    return this.client.send<any, any>('get_message', {}).toPromise();
  }
}





COTROLLER.TS






SERVICE.TS

import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';
  private client: ClientProxy;

  constructor() {
    this.client = new Client({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${this.username}:${this.password}@rabbitmq.next.local:5672`],
        queue: 'TmsQueue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async readFromQueue(): Promise<QueueMessage> {
    return this.client.send<QueueMessage, void>('get_message', {}).toPromise();
  }
}



// src/rabbitmq/rabbitmq-listener.service.ts

import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MessageService } from 'path-to-your-message-service'; // Обновите этот путь

@Injectable()
export class RabbitMQListenerService {

  constructor(private readonly messageService: MessageService) {}

  @EventPattern('TmsQueue')
  async handleMessage(data: any): Promise<any> {
    console.log('Received message:', data);

    try {
      const savedMessage = await this.messageService.create(data);
      console.log('Message saved:', savedMessage);

      return { status: 'success', id: savedMessage._id };
    } catch (error) {
      console.error('Error saving message:', error);
      return { status: 'error', message: error.message };
    }
  }
}















import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueueMessage } from './rabbitmq.interface';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';

  constructor(private readonly httpService: HttpService) {}

  async readFromQueue(): Promise<QueueMessage> {
    try {
      const response = await this.httpService
        .post(
          'http://rabbitmq.next.local/api/queues/%2F/TmsQueue/get',
          {
            count: 1,
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            truncate: 50000,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${this.username}:${this.password}`,
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      if (response.status === 200 && response.data.length > 0) {
        const data = response.data[0];
        const payload = JSON.parse(data.payload);

        return payload;
      } else {
        throw new Error('Возникла ошибка при получении данных');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
