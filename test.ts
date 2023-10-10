import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable()
export class DBService {
  [x: string]: any;
  private dataChangeSubject: Subject<void>;
  public dataChange$: Observable<void>;
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService,
   
  ) {
    this.dataChangeSubject = new Subject<void>();
    this.dataChange$ = this.dataChangeSubject.asObservable();
  }

  async getCorrectCityName(city: string) {
    console.log(city, 'ПРИХОДИТ ГОРОД В getCorrectCityName');
    // TODO: Переделать на нормальный запрос + добавить кэширование + .env
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;

    try {
      const response$ = this.httpService.get(url);
      const response = await lastValueFrom(response$);
      console.log(
        response.data.response.GeoObjectCollection.featureMember[0].GeoObject
          .name,
        'яндекс возвращает:',
      );
      return response.data.response.GeoObjectCollection.featureMember[0]
        .GeoObject.name;
    } catch (error) {
      console.error('Ошибка при выполнении GET-запроса:', error);
      throw error;
    }
  }

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      if (parsedData.IdYandex !== '') {
        parsedData.distribution = true;
      } else {
        parsedData.distribution = false;
      }

      const existingMessage = await this.messageModel
        .findOne({ Number: parsedData.Number })
        .exec();

      if (existingMessage) {
      //Слушаем изменения в бд
        this.dataChangeSubject.next();
        // Если сообщение с таким номером уже существует, обновляем его
        const updatedMessage = await this.messageModel
          .findOneAndUpdate({ Number: parsedData.Number }, parsedData, {
            new: true,
          })
          .exec();
        console.log('Обновил сообщение:', updatedMessage.Number);
        return updatedMessage;
      } else {
      //Слушаем изменения в бд
        this.dataChangeSubject.next();
        // Если сообщения с таким номером нет, создаем новое
        const createdMessage = new this.messageModel(parsedData);
        console.log('Новое сообщение в бд:', createdMessage.Number);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }
Cannot find name 'Observable'.ts(2304)
Public property 'dataChange$' of exported class has or is using private name 'Observable'.ts(4031)
type Observable = /*unresolved*/ any
