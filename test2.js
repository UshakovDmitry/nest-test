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




// Метод для добавления записи о звонке
  async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
    const userAction = await this.historyModel.findOne({ name }).exec();
    if (userAction) {
      userAction.callHistory.push(callData);
      await userAction.save();
    } else {
      // Обработка случая, когда пользователь не найден
    }
  }



@Controller('api/history')
export class ActionHistoryController {
  // ... существующий код ...

  @Post('call') // Используйте декоратор @Post для обработки POST-запросов
  async addCall(@Body() callData: { name: string; date: string; tel_number: string }) {
    return this.historyService.addCallHistory(callData.name, {
      date: callData.date,
      tel_number: callData.tel_number,
    });
  }
}


