https://t.me/+te5IKguDpzE4OTli
Источник: https://travelask.ru/questions/4020225_th_na-phukete-est-magazin-nike

import { ActionHistory } from '../schemas/actionHistory.schema';

// ... (остальной код модуля)

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ActionHistory', schema: ActionHistorySchema }]),
    // ... другие импортируемые модули
  ],
  // ... (контроллеры и провайдеры)
})
export class ActionHistoryModule {}





import { Injectable, InjectModel } from '@nestjs/common';
import { Model } from 'mongoose';
import { ActionHistoryDocument } from '../schemas/actionHistory.schema';

@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectModel('ActionHistory') private actionHistoryModel: Model<ActionHistoryDocument>
  ) {}

  async getAllHistory() {
    return this.actionHistoryModel.find().exec();
  }
}






@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectModel('ActionHistory') private actionHistoryModel: Model<ActionHistoryDocument>
  ) {}

  async getAllHistory() {
    try {
      const historyActions = await this.actionHistoryModel.find().exec();
      return historyActions;
    } catch (error) {
      // Обработка возможной ошибки при выполнении запроса к базе данных
      throw new Error('Не удалось получить историю действий: ' + error.message);
    }
  }
}

