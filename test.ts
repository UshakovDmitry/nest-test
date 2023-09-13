import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.entity';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(data: any): Promise<Message> {
    const createdMessage = new this.messageModel(data);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
