// src/rabbitmq/index.ts

export * from './rabbitmq.module';
export * from './rabbitmq-listener.service';




MODULE.TS

// src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { MessageModule } from '../message/message.module'; // Путь может отличаться в зависимости от структуры вашего проекта

@Module({
  imports: [MessageModule],
  providers: [RabbitMQService],
  controllers: [RabbitMQController]
})
export class RabbitMQModule {}





COTROLLER.TS

import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('all-message')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.rabbitMQService.getAllMessages();
  }
}





SERVICE.TS
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message/message.schema';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>
  ) {
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
    return this.client.send('get_message', {}).toPromise();
  }

  async getAllMessages(): Promise<any[]> {
    return this.messageModel.find().exec();
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
