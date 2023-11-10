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
