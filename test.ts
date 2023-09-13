Добавим новый метод в rabbitmq.service.ts:
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





rabbitmq.module.ts:


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




rabbitmq.controller.ts:

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
