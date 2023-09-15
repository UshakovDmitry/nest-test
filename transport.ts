rabbitmq.service.ts:

import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { getAllMessagesFromRabbitMQ } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService {
  constructor(private readonly messageService: MessageService) {
    try {
      // При создании сервиса выводим текущий список сообщений из RabbitMQ
      this.listenForNewMessages();
    } catch (error) {
      // Если возникли ошибки, выводим их в консоль
      console.log('Ошибка при подключении к RabbitMQ', error);
    }
  }

  private async listenForNewMessages() {
    const messages = getAllMessagesFromRabbitMQ();
    for (const message of messages) {
      // Попробуйте сохранить сообщение в базу данных
      try {
        await this.messageService.saveMessage(message); // предположим, что у вас есть метод saveMessage в вашем messageService
      } catch (error) {
        console.log('Ошибка при сохранении сообщения в базе данных', error);
      }
    }
  }
}







message.service.ts (Пример):



import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
  ) {}

  async saveMessage(content: string) {
    const newMessage = new this.messageModel({ content });
    return await newMessage.save();
  }
}












