import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const createdMessage = new this.messageModel(parsedData);
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }

  async processNewMessage(messageData: any) {
    try {
      const existingMessage = await this.messageModel.findOne({ Number: messageData.Number }).exec();

      if (existingMessage) {
        return await this.messageModel.updateOne({ Number: messageData.Number }, messageData).exec();
      } else {
        const parsedData =
          typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
        const createdMessage = new this.messageModel(parsedData);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка при обработке нового сообщения:', error);
      throw error;
    }
  }
}















import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { Observer } from '../observer';
import { messageSubject } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly messageService: MessageService) {
    messageSubject.addObserver(this);
  }

  public update(messageArray: Array<any>): void {
    console.log('Получено сообщение: ', messageArray);
    this.processReceivedMessages(messageArray);
  }

  private async processReceivedMessages(messageArray: Array<any>): Promise<void> {
    try {
      for (const message of messageArray) {
        console.log('Обработка сообщения: ', message);
        await this.messageService.processNewMessage(message);
      }
    } catch (error) {
      console.log('Ошибка обработки полученных сообщений: ', error);
    }
  }
}




