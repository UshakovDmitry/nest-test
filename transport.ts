import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageSchema } from '../message/message.shema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageSchema>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      console.log(parsedData, 'messageData!');

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
}

'MessageSchema' refers to a value, but is being used as a type here. Did you mean 'typeof MessageSchema'?ts(2749)
Parameter 'messageModel' of constructor from exported class has or is using private name 'MessageSchema'.ts(4063)
type MessageSchema = /*unresolved*/ any


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Document & Message;
@Schema()
class ArrayStrings {
  @Prop()
  Shipping_Point: string;

  @Prop()
  Goods: string;

  @Prop()
  Quantity: string;

  @Prop()
  Item_Status: string;

  @Prop()
  Pickup_Point: string;

  @Prop()
  Delivery_Point: string;

  @Prop()
  Pickup_Latitude: string;

  @Prop()
  Pickup_Longitude: string;

  @Prop()
  Delivery_Latitude: string;

  @Prop()
  Delivery_Longitude: string;

  @Prop()
  Pickup_Time: string;

  @Prop()
  Delivery_Time: string;
}

@Schema()
class ContactInformation {
  @Prop()
  City: string;

  @Prop()
  Delivery_Condition: string;

  @Prop()
  Date_Time_delivery: string;

  @Prop()
  Time_Window: string;

  @Prop()
  Latitude: string;

  @Prop()
  Longitude: string;

  @Prop()
  Street: string;

  @Prop()
  Home: string;

  @Prop()
  Phone: string;

  @Prop()
  Apartment: string;

  @Prop()
  Contractor: string;
}
@Schema({ versionKey: false })
export class Message {
  @Prop()
  Number: string;

  @Prop()
  Date: string;

  @Prop()
  Organization: string;

  @Prop()
  DocumentStatus: string;

  @Prop()
  Driver: string;

  @Prop()
  ISR: string;

  @Prop()
  Informal_Document: string;

  @Prop()
  SKU_Weight: string;

  @Prop()
  ArrayStrings: ArrayStrings[];

  @Prop()
  ContactInformation: ContactInformation;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

