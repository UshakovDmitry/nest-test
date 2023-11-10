import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DispatcherActionDocument = Document & DispatcherAction;

@Schema({ versionKey: false })
export class DispatcherAction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  comment: string;

  // История звонков
  @Prop({ default: [] })
  callHistory: {
    date: string;
    tel_number: string;
  }[];

  // История коррекций
  @Prop({ default: [] })
  correctionHistory: {
    time: string;
    comment: string;
  }[];
}

export const DispatcherActionSchema = SchemaFactory.createForClass(DispatcherAction);
