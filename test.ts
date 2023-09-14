import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<any>,
  ) {}

  async create(data: any): Promise<any> {
    const createdMessage = new this.messageModel(data);
    return await createdMessage.save();
  }

  async findAll(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}
