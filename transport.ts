import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Document & Message;

@Schema({ versionKey: false })
export class Message {
  @Prop({ default: '' })
  Number: string;

  @Prop({ default: Date.now })
  Date: Date;

  @Prop({ default: '' })
  Organization: string;

  @Prop({ default: '' })
  DocumentStatus: string;

  @Prop({ default: '' })
  Driver: string;

  @Prop({ default: '' })
  ISR: string;

  @Prop({ default: '' })
  Informal_Document: string;

  @Prop({ default: '' })
  SKU_Weight: string;

  @Prop({ default: [] })
  ArrayStrings: ArrayStrings[];

  @Prop({ default: {} })
  ContactInformation: ContactInformation;
}

@Schema()
class ArrayStrings {
  @Prop({ default: '' })
  Shipping_Point: string;

  @Prop({ default: '' })
  Goods: string;

  @Prop({ default: '' })
  Quantity: string;

  @Prop({ default: '' })
  Item_Status: string;

  @Prop({ default: '' })
  Pickup_Point: string;

  @Prop({ default: '' })
  Delivery_Point: string;

  @Prop({ default: '' })
  Pickup_Latitude: string;

  @Prop({ default: '' })
  Pickup_Longitude: string;

  @Prop({ default: '' })
  Delivery_Latitude: string;

  @Prop({ default: '' })
  Delivery_Longitude: string;

  @Prop({ default: '' })
  Pickup_Time: string;

  @Prop({ default: '' })
  Delivery_Time: string;
}

@Schema()
class ContactInformation {
  @Prop({ default: '' })
  City: string;

  @Prop({ default: '' })
  Delivery_Condition: string;

  @Prop({ default: '' })
  Date_Time_delivery: string;

  @Prop({ default: '' })
  Time_Window: string;

  @Prop({ default: '' })
  Latitude: string;

  @Prop({ default: '' })
  Longitude: string;

  @Prop({ default: 'нет данных' })
  Street: string;

  @Prop({ default: 'нет данных' })
  Home: string;

  @Prop({ default: '' })
  Phone: string;

  @Prop({ default: 'нет данных' })
  Apartment: string;

  @Prop({ default: '' })
  Contractor: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
