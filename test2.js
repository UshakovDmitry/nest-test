у меня есть модуль TransportRequests внутри которого есть TransportRequestsService

здесь метод recordHistoryAction уже не нужен 
его функционал выполняет ранее описанный метод addCorrectionHistory
примени его замени везде
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DispatcherActionDocument } from '../schemas/history.schema';
import { DBService } from '../db/db.service';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    @InjectModel('DispatcherAction') private historyModel: Model<DispatcherActionDocument>,
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  async getAllTransportRequests(): Promise<any[]> {
    return await this.dbService.getAllTransportRequests();
  }

  async getNotPredictedTransportRequestsByDate(date: string): Promise<any[]> {
    const requestsByDate =
      await this.dbService.getTransportRequestsByDate(date);

    const notPredictedRequests = requestsByDate.filter(
      (request) =>
        request.Driver.trim() === '' &&
        request.NumberCar.trim() === '' &&
        (request.CarModel ? request.CarModel.trim() === '' : true), // проверяет CarModel только если оно существует
    );

    return notPredictedRequests;
  }

  async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.dbService.getTransportRequestByNumber(number);
  }

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    return await this.dbService.getTransportRequestsByDateRange(
      startDate,
      endDate,
    );
  }

  getTransportRequestsByDate(date: string): Promise<any[]> {
    return this.dbService.getTransportRequestsByDate(date);
  }

  async recordHistoryAction({ name, time, comment }: { name: string; time: string; comment: string; }) {
    const newHistoryEntry = new this.historyModel({
      name,
      time,
      comment,
    });

    try {
      const savedEntry = await newHistoryEntry.save();
      console.log('Запись в историю действий сохранена', savedEntry);
      
      return savedEntry;
    } catch (error) {
      throw new HttpException('Не удалось сохранить запись в историю действий', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async transportRequestCorrection(dto): Promise<any> {
    // Сопоставление полей DTO с ожидаемыми полями в запросе
    const requestData = {
      DocNumber: dto.documentNumber,
      DateDoc: dto.date,
      TimeDelivery: dto.timeDelivery,
      Driver: dto.driver,
      СarNumber: dto.carNumber,
      UserIIN: dto.userIIN,
      Сomment: dto.comment,
    };

    // Проверка наличия и формата всех необходимых полей
    const requiredFields = [
      'DocNumber',
      'DateDoc',
      'TimeDelivery',
      'Driver',
      'UserIIN',
      'Сomment',
    ];

    for (const field of requiredFields) {
      if (!requestData[field]) {
        throw new HttpException(
          `Обязательное поле отсутствует: ${field}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (typeof requestData[field] !== 'string') {
        throw new HttpException(
          `Неверный тип данных для поля: ${field}. Ожидалась строка.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    console.log(requestData, 'корректировка ( отправляю Сане )');

    // http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver  боевая
    try {

      await this.recordHistoryAction({
        name: dto.userName, 
        time: dto.timeDelivery, 
        comment: dto.comment
      });

      const response = await firstValueFrom(
        this.httpService.post(
          // 'http://10.0.1.32:8080/1CHS/hs/TMS//ReplaceDriver', // тестовая
          'http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver ',
          requestData,
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Ошибка при отправке запроса на корректировку транспортной заявки: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  serverSentEvents(): any {
    return this.dbService.dataChange$.pipe(
      map(() => ({ data: { message: 'Pong' } })),
    );
  }
}
