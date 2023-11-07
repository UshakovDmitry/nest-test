// dispatcher-action.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DispatcherActionDocument = Document & DispatcherAction;

@Schema({ timestamps: true })
export class DispatcherAction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  comment: string;
}

export const DispatcherActionSchema = SchemaFactory.createForClass(DispatcherAction);

