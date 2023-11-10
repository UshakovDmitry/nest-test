@Schema({ versionKey: false })
export class DispatcherAction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  comment: string;

  // Добавьте новое поле для истории звонков
  @Prop({ default: [] })
  callHistory: {
    date: string;
    tel_number: string;
  }[];
}

export const DispatcherActionSchema = SchemaFactory.createForClass(DispatcherAction);





