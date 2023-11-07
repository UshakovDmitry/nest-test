import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
// ... другие импорты

@Injectable()
export class TransportRequestsService {
  // ... конструктор и другие методы

  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const newHistoryEntry = new this.historyModel({
      name,
      time,
      comment,
    });

    try {
      const savedEntry = await newHistoryEntry.save();
      return savedEntry;
    } catch (error) {
      // Здесь вы можете обработать ошибку более конкретно, если есть информация об ошибках
      throw new HttpException('Не удалось сохранить запись в историю действий', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
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

