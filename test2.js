У меня есть модуль для хранения истории действий пользователем написанный на NEST

import { Controller, Get } from '@nestjs/common';
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
}

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
}

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
})
export class ActionHistoryModule {}

Вот в таком виде записываются данные 

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
}

export const DispatcherActionSchema =
  SchemaFactory.createForClass(DispatcherAction);


Я хочу добавить новые эндпоинт CALL
это будет POST
фронт будет присылать мне 
{
name: "",
date: "",
tel_number: "",
}

Я хочу при получении этих данных искать в базе данных по name пользователя и добавлять в новый массив ему историю совершенных звонков




