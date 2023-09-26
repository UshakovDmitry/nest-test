нужно добавить новую логику в проект на nest 

есть модуль drivers

drivers.controller
import { Controller, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('/api/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getDrivers() {
    return await this.driversService.getDrivers();
  }
}


drivers.module
import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}

drivers.service 
import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class DriversService {
  //   constructor(
  //     @InjectModel('Message') private messageModel: Model<MessageDocument>,
  //   ) {}

  async getDrivers(): Promise<any[]> {
    // return await this.messageModel.find().exec();
  здесь хочу вызывать метод который возвращает массив водителей и их заказов
  }
}

у меня есть база данных монго вот таких заявок на транспорт

_id
650d4ccd50f0a77202216bfe
Number
"№№00015933"
Date
"01.08.2023 9:01:14"
Organization
"TOO Gulser Computers (Гулсер Компьютерс)"
DocumentStatus
"Доставляется"
Driver
"Бархудар Асан Арыпұлы"
ISR
""
Informal_Document
"Акт регистрации брака TL300000000014 от 01.04.2022 18:36:05"
SKU_Weight
"17"

ArrayStrings
Array (1)

0
Object
Shipping_Point
"Талгар 3, ул. Абылай хана, дом 111 (склад товара, ожидающего ремонта)"
Goods
"Телевизор KIVI 55U710KB  Smart 4K UHD"
Quantity
"1"
Item_Status
"Оформлена"
Pickup_Point
"1"
Delivery_Point
"2"
Pickup_Latitude
"43,305732"
Pickup_Longitude
"77,241999"
Delivery_Latitude
"43,245609"
Delivery_Longitude
"76,90425"
Pickup_Time
"01.01.0001 9:43:53"
Delivery_Time
"01.01.0001 10:46:44"

ContactInformation
Object
City
"Алматы"
Delivery_Condition
"Доставка"
Date_Time_delivery
"2023-08-05 До 18:00"
Time_Window
"09:00-18:00"
Latitude
"43,245609"
Longitude
"76,90425"
Street
"нет данных"
Home
"нет данных"
Phone
"+7(778)021-1316"
Apartment
"нет данных"
Contractor
"нет данных"
_id
650d4ccd50f0a77202216bff


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const createdMessage = new this.messageModel(parsedData);
      console.log(createdMessage, 'createdMessage!');
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }

  async getMessagesByDrivers() {
    // return await this.messageModel.find({ Driver: { $in: drivers } }).exec();
    мне нужно сортировать все заявки по полю Driver
тем самым я хочу получить массив водителей и все их заказы
так как сейчас они разбросаны в бд 
  }
}
