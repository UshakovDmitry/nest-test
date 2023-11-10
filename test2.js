import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DispatcherActionDocument } from '../schemas/history.schema';

@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectModel('DispatcherAction')
    private historyModel: Model<DispatcherActionDocument>,
  ) {}

  async getAllHistory() {
    return this.historyModel.find().exec();
  }

  async addCorrectionHistory({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const userAction = await this.historyModel.findOne({ name }).exec();

    if (userAction) {
      // Если пользователь найден, добавляем запись в correctionHistory
      userAction.correctionHistory.push({ time, comment });
      await userAction.save();
      return { status: 'success', message: 'Коррекция успешно записана в историю' };
    } else {
      // Если пользователь не найден, можно выбросить исключение или вернуть статус ошибки
      throw new Error('Пользователь не найден');
    }
  }

  async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
    const userAction = await this.historyModel.findOne({ name }).exec();
    if (userAction) {
      userAction.callHistory.push(callData);
      await userAction.save();
      return true; // Указываем, что операция прошла успешно
    } else {
      throw new Error('Пользователь не найден');
    }
  }
}
Добавь новую логику в addCorrectionHistory и addCallHistory
Если пользователь не найден то создать его в бд
