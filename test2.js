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
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name, correctionHistory: [], callHistory: [] });
    }

    userAction.correctionHistory.push({ time, comment });
    await userAction.save();
    return { status: 'success', message: 'Коррекция успешно записана в историю' };
  }

  async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name, correctionHistory: [], callHistory: [] });
    }

    userAction.callHistory.push(callData);
    await userAction.save();
    return { status: 'success', message: 'Звонок успешно записан в историю' };
  }
}

Если пользователь не найден, то его нужно создать и записать его действие 
