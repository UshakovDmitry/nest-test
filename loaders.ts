
message.service
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
      const message = new this.messageModel(parsedData);  // Используйте this.messageModel
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



message.shema
import { Schema } from 'mongoose';

const ArrayStringsSchema = new Schema({
  Shipping_Point: String,
  Goods: String,
  Quantity: String,
  Item_Status: String,
  Pickup_Point: String,
  Delivery_Point: String,
  Pickup_Latitude: String,
  Pickup_Longitude: String,
  Delivery_Latitude: String,
  Delivery_Longitude: String,
  Pickup_Time: Date,
  Delivery_Time: Date,
});

const ContactInformationSchema = new Schema({
  City: String,
  Delivery_Condition: String,
  Date_Time_delivery: String,
  Time_Window: String,
  Latitude: String,
  Longitude: String,
  Street: String,
  Home: String,
  Phone: String,
  Apartment: String,
  Contractor: String,
});

export const MessageSchema = new Schema({
  Number: String,
  Date: Date,
  Organization: String,
  DocumentStatus: String,
  Driver: String,
  ISR: String,
  Informal_Document: String,
  SKU_Weight: String,
  ArrayStrings: [ArrayStringsSchema],
  ContactInformation: ContactInformationSchema,
});
message.module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}

message.controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Post()
  async saveMessage(@Body() messageData: any) {
    return this.messageService.saveMessage(messageData);
  }
}
