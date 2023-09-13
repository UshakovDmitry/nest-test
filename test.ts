import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.interface';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async create(data: any): Promise<Message> {
    const createdMessage = new this.messageModel(data);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}





import { Document } from 'mongoose';

export interface Message extends Document {
  // ваша структура данных, например:
  content: string;
  timestamp: Date;
  // добавьте дополнительные поля при необходимости
}


