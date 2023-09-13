import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class ArrayString {
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
export class ContactInfo {
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

@Schema()
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

  @Prop({ type: [ArrayString], default: [] })
  ArrayStrings: ArrayString[];

  @Prop()
  ContactInformation: ContactInfo;
}

export const MessageSchema = SchemaFactory.createForClass(Message);


















import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
})
export class DatabaseModule {}
