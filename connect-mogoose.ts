import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MessageDocument } from '../schemas/message.schema';
import { HistoryDocument } from '../schemas/history.schema';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    @InjectModel('History') private historyModel: Model<HistoryDocument>,
    private readonly httpService: HttpService,
    // ... возможно, другие зависимости
  ) {}

  // ... другие методы сервиса

  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }): Promise<HistoryDocument> {
    const newHistoryEntry = new this.historyModel({ name, time, comment });

    try {
      return await newHistoryEntry.save();
    } catch (error) {
      throw new HttpException('Не удалось сохранить запись в историю действий', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async transportRequestCorrection(dto: any): Promise<any> {
    // Подготовка данных из DTO
    const requestData = {
      // ... другие поля из dto
    };

    // Проверка полей DTO
    // ... ваши проверки для requestData

    try {
      // Регистрация действия в истории перед отправкой запроса на корректировку
      await this.recordHistoryAction({
        name: dto.userName, 
        time: dto.timeDelivery, 
        comment: dto.comment
      });

      // Логика отправки запроса на корректировку
      const response = await firstValueFrom(
        this.httpService.post('http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver', requestData)
      );

      return response.data;
    } catch (error) {
      throw new HttpException(`Ошибка при отправке запроса на корректировку транспортной заявки: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
