я создал модуль actionHistory
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { ActionHistoryService } from './actionHistory.service';
import { ActionHistoryController } from './actionHistory.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule,
  ],
  controllers: [ActionHistoryController],
  providers: [ActionHistoryService],
})
export class ActionHistoryModule {}


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


import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionHistoryService {
  constructor() {}

  async getAllHistory() {
   
  }
}

Реализуй функцию возврата всех действий из данной коллекции
