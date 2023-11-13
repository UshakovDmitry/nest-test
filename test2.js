У меня есть модуль написанный на Nest 
он отвечает за историю действий диспетчеров

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DispatcherActionSchema } from '../schemas/history.schema';
import { ActionHistoryService } from './actionHistory.service';
import { ActionHistoryController } from './actionHistory.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DispatcherAction', schema: DispatcherActionSchema },
    ]),
    DBModule,
  ],
  controllers: [ActionHistoryController],
  providers: [ActionHistoryService],
  exports: [ActionHistoryService],
})
export class ActionHistoryModule {}


import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActionHistoryService } from './actionHistory.service';

@ApiTags('history')
@Controller('api/history')
export class ActionHistoryController {
  constructor(private readonly historyService: ActionHistoryService) {}

  @Get()
  async getAllHistory() {
    return this.historyService.getAllHistory();
  }

  @Post('call')
  async addCall(
    @Body() callData: { name: string; date: string; tel_number: string },
    @Res() response
  ) {
    try {
      await this.historyService.addCallHistory(callData.name, {
        date: callData.date,
        tel_number: callData.tel_number,
      });
      return response.status(HttpStatus.OK).json({
        message: "Звонок успешно записан в БД"
      });
    } catch (error) {
      // Обработка ошибок, например, если не удалось найти пользователя или сохранить данные
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Произошла ошибка при записи звонка"
      });
    }
  }
}

import { DutyDriversService } from './../dutyDriver/dutyDriver.service';
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

  async addCorrectionTransportRequestHistory({ name, time, comment }: { name: string; time: string; comment: string; }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name, transportRequestHistory: [], callHistory: [] , DutyDriversHistory: [] });
    }

    userAction.transportRequestHistory.push({ time, comment });
    await userAction.save();
    return { status: 'success', message: 'Корректировка транспортной заявки успешно записана в историю' };
  }

  async addCallHistory(name: string, callData: { date: string; tel_number: string }) {
    let userAction = await this.historyModel.findOne({ name }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    }

    userAction.callHistory.push(callData);
    await userAction.save();
    return { status: 'success', message: 'Звонок успешно записан в историю' };
  }

  async addCorrectionDutyDriversSHistory (data) {
    console.log(data, 'data');
    
    let userAction = await this.historyModel.findOne({ name: data.UserName }).exec();

    if (!userAction) {
      userAction = new this.historyModel({ name: data.UserName, transportRequestHistory: [], callHistory: [] ,DutyDriversHistory: [] });
    }

    userAction.DutyDriversHistory.push({ userIIN:data.UserIIN, date:data.date });
    await userAction.save();
    return { status: 'success', message: 'Заявка успешно записана в историю' };
  }
}


вот схема записи 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DispatcherActionDocument = Document & DispatcherAction;

@Schema({ versionKey: false })
export class DispatcherAction {
  @Prop({ required: true })
  name: string;

  @Prop()
  time: string;

  @Prop()
  comment: string;

  // История звонков
  @Prop({ default: [] })
  callHistory: {
    date: string;
    tel_number: string;
  }[];

  // История коррекций
  @Prop({ default: [] })
  transportRequestHistory: {
    time: string;
    comment: string;
  }[];

  // История дежурных водителей
  @Prop({ default: [] })
  DutyDriversHistory: {
    date: string;
    userIIN: string;
  }[];
}

export const DispatcherActionSchema = SchemaFactory.createForClass(DispatcherAction);


Моя задача добавить новый endpoint POST /by-date

Мне будет приходить body {
  date: "2023-11-02"
}
это пример
В таком же формате даты у меня записаны поля date в базк данных (год - месяц - число)
Я хочу примать дату и возвращать диспетчеров и внутри их историй (callHistory, transportRequestHistory, DutyDriversHistory)
оставлять только те элементы которые совпадают с date которая приходит в body

