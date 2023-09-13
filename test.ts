import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

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

  @Prop([{}])
  ArrayStrings: Array<object>;

  @Prop({})
  ContactInformation: object;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
