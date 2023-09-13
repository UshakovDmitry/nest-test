

MODULE.TS
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';

@Module({
  providers: [RabbitMQService],
  controllers: [RabbitMQController],
  exports: [RabbitMQService] // Если нужно использовать сервис в других модулях
})
export class RabbitMQModule {}

COTROLLER.TS
import { Controller, Get } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Controller('all-messages')
export class RabbitMQController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll() {
    return this.messageService.findAll();
  }
}


SERVICE.TS
import { Injectable } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private messageService: MessageService) {
    // инжектите ваш сервис
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: true },
      },
    });
    this.client.connect(); // подключаемся к RabbitMQ
  }
  @EventPattern('get_message')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    await this.messageService.create(data);
    channel.ack(originalMsg);
  }


}


rabbitmq-listener.service
import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

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


