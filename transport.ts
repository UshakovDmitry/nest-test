// В файле actionHistory.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';

@Controller('api/history')
export class ActionHistoryController {
  // ... другие методы ...

  @Post('by-date')
  async getByDate(@Body() body: { date: string }, @Res() response) {
    try {
      const history = await this.historyService.getByDate(body.date);
      return response.status(HttpStatus.OK).json(history);
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Произошла ошибка при получении истории",
      });
    }
  }
}





// В файле actionHistory.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DispatcherActionDocument } from '../schemas/history.schema';

@Injectable()
export class ActionHistoryService {
  // ... другие методы ...

  async getByDate(date: string) {
    const actions = await this.historyModel.find().exec();
    return actions.map(action => ({
      name: action.name,
      callHistory: action.callHistory.filter(ch => ch.date === date),
      transportRequestHistory: action.transportRequestHistory.filter(tr => tr.time.startsWith(date)),
      DutyDriversHistory: action.DutyDriversHistory.filter(dd => dd.date === date),
    }));
  }
}







// В файле actionHistory.module.ts
import { Module } from '@nestjs/common';
// ... импорты ...

@Module({
  // ... другие настройки ...
  controllers: [ActionHistoryController],
  providers: [ActionHistoryService],
})
export class ActionHistoryModule {}
