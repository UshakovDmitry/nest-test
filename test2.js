@Injectable()
export class ActionHistoryService {
  // ... существующий код ...

  async addCorrectionHistory({ name, time, comment }: { name: string; time: string; comment: string; }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      // Если пользователь не найден, создаем новый документ
      userAction = new this.historyModel({ name, correctionHistory: [], callHistory: [] });
    }

    // Добавляем запись в correctionHistory
    userAction.correctionHistory.push({ time, comment });
    await userAction.save();
    return { status: 'success', message: 'Коррекция успешно записана в историю' };
  }

  async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      // Если пользователь не найден, создаем новый документ
      userAction = new this.historyModel({ name, correctionHistory: [], callHistory: [] });
    }

    // Добавляем запись в callHistory
    userAction.callHistory.push(callData);
    await userAction.save();
    return { status: 'success', message: 'Звонок успешно записан в историю' };
  }
}

