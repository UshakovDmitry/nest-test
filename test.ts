
rabbitmq.service
import { Injectable } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @MessagePattern('createMessage')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Сообщение получено:', data);
    try {
      await this.messageService.create(data);
      console.log('Сообщение сохранено');
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  }
}

rabbitmq.module

import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { MessageService } from '../message/message.service';
import { RabbitMQController } from './rabbitmq.controller';

@Module({
  providers: [RabbitMQService, MessageService, RabbitMQController],
})
export class RabbitMQModule {}
