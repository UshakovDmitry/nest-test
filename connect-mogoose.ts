import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.schema'; // Убедитесь, что путь к файлу верный
import { HistoryDocument } from '../schemas/history.schema'; // Убедитесь, что путь к файлу верный
import { DBService } from '../db/db.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    @InjectModel('History') private historyModel: Model<HistoryDocument>, // Используйте корректное имя модели, если оно отличается
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  // ... Остальные методы и логика сервиса
}







  






















import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.schema'; // Убедитесь, что путь к файлу верный
import { HistorySchema } from '../schemas/history.schema'; // Убедитесь, что путь к файлу верный
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'History', schema: HistorySchema }, // Добавленная схема истории
    ]),
    DBModule,
    HttpModule,
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}

