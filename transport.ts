import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { Observer } from '../observer';
import { messageSubject } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly messageService: MessageService) {
    messageSubject.addObserver(this);
  }

  public update(message: string): void {
    this.saveMessageToDb(message);
  }

  private async saveMessageToDb(message: string): Promise<void> {
    try {
      console.log('Saving message to database:', message);
      await this.messageService.saveMessage(message);
    } catch (error) {
      console.log('Error saving message to database:', error);
    }
  }
}




import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<any>,
  ) {}

  saveMessage(data: any): any {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      const message = new this.messageModel(parsedData); 
      return message.save();
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}
