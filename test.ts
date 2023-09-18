listener-rabbitMQ
const amqp = require('amqplib/callback_api');
import { Subject } from './observer';

export const messageSubject = new Subject();

amqp.connect(
  'amqp://tms:26000567855499290979@rabbitmq.next.local',
  function (errorConnect, connection) {
    if (errorConnect) {
      throw 'Ошибка подключения к rabbitMQ: ' + errorConnect;
    }
    connection.createChannel(function (errorCreateChannel, channel) {
      if (errorCreateChannel) {
        throw 'Ошибка создания канала: ' + errorCreateChannel;
      }
      const queue = 'TmsQueue';

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(
        queue,
        function (msg: any) {
          console.log('Сообщение из TmsQueue', msg.content.toString());
          messageSubject.notifyObservers(msg.content.toString());
        },
        {
          noAck: true,
        },
      );
    });
  },
);

rabbitmq.service
import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { Observer } from '../observer';
import { messageSubject } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly messageService: MessageService) {
    messageSubject.addObserver(this);
  }

  public update(message: string): void {
    this.saveMessageToDb(message);
  }

  private async saveMessageToDb(message: string): Promise<void> {
    try {
      console.log('Сохранено в базу данных:', message);
      await this.messageService.saveMessage(message);
    } catch (error) {
      console.log('Ошибка сохранения в базу данных:', error);
    }
  }
}
message.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<any>,
  ) {}

  saveMessage(messageData: any): any {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      console.log(parsedData, 'messageData!!!!!!!!!!!');

      const message = new this.messageModel(parsedData);

      return message.save();
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}

message.shema
import { Schema } from 'mongoose';

const ArrayStringsSchema = new Schema({
  Shipping_Point: String,
  Goods: String,
  Quantity: String,
  Item_Status: String,
  Pickup_Point: String,
  Delivery_Point: String,
  Pickup_Latitude: String,
  Pickup_Longitude: String,
  Delivery_Latitude: String,
  Delivery_Longitude: String,
  Pickup_Time: Date,
  Delivery_Time: Date,
});

const ContactInformationSchema = new Schema({
  City: String,
  Delivery_Condition: String,
  Date_Time_delivery: String,
  Time_Window: String,
  Latitude: String,
  Longitude: String,
  Street: String,
  Home: String,
  Phone: String,
  Apartment: String,
  Contractor: String,
});

export const MessageSchema = new Schema({
  Number: String,
  Date: Date,
  Organization: String,
  DocumentStatus: String,
  Driver: String,
  ISR: String,
  Informal_Document: String,
  SKU_Weight: String,
  ArrayStrings: [ArrayStringsSchema],
  ContactInformation: ContactInformationSchema,
});


message.controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Post()
  async saveMessage(@Body() messageData: any) {
    return this.messageService.saveMessage(messageData);
  }
}

PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 11392  - 18.09.2023, 09:30:33     LOG [NestFactory] Starting Nest application...
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] MongooseModule dependencies initialized +26ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +11ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] MongooseModule dependencies initialized +7ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] MessageModule dependencies initialized +1ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] RabbitMQModule dependencies initialized +1ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [NestMicroservice] Nest microservice successfully started +91ms
Микросервис запущен
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RoutesResolver] MessageController {/messages}: +16ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RouterExplorer] Mapped {/messages, GET} route +3ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RouterExplorer] Mapped {/messages, POST} route +0ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RoutesResolver] MessageController {/messages}: +1ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RouterExplorer] Mapped {/messages, GET} route +0ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [RouterExplorer] Mapped {/messages, POST} route +1ms
[Nest] 11392  - 18.09.2023, 09:30:33     LOG [NestApplication] Nest application successfully started +2ms
Приложение слушаетсчя на 4000
Сообщение из TmsQueue [
        {
                "Number": "№№00015934",
                "Date": "14.08.2023 15:53:04",
                "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
                "DocumentStatus": "Оформлена",
                "Driver": "",
                "ISR": "(747)2667569",
                "Informal_Document": "Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12",
                "SKU_Weight": "",
                "ArrayStrings": [
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        },
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        }
                ],
                "ContactInformation": {
                        "City": "Алматы",
                        "Delivery_Condition": "Доставка",
                        "Date_Time_delivery": "2023-08-16 К До 20:00",
                        "Time_Window": "15:00-18:00",
                        "Latitude": "43,3189165",
                        "Longitude": "76,93994950000001",
                        "Street": "нет данных",
                        "Home": "74",
                        "Phone": "(747)2667569",
                        "Apartment": "нет данных",
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
Сохранено в базу данных: [
        {
                "Number": "№№00015934",
                "Date": "14.08.2023 15:53:04",
                "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
                "DocumentStatus": "Оформлена",
                "Driver": "",
                "ISR": "(747)2667569",
                "Informal_Document": "Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12",
                "SKU_Weight": "",
                "ArrayStrings": [
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        },
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        }
                ],
                "ContactInformation": {
                        "City": "Алматы",
                        "Delivery_Condition": "Доставка",
                        "Date_Time_delivery": "2023-08-16 К До 20:00",
                        "Time_Window": "15:00-18:00",
                        "Latitude": "43,3189165",
                        "Longitude": "76,93994950000001",
                        "Street": "нет данных",
                        "Home": "74",
                        "Phone": "(747)2667569",
                        "Apartment": "нет данных",
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
[
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
] messageData!!!!!!!!!!!
Сохранено в базу данных: [
        {
                "Number": "№№00015934",
                "Date": "14.08.2023 15:53:04",
                "Organization": "TOO Gulser Computers (Гулсер Компьютерс)",
                "DocumentStatus": "Оформлена",
                "Driver": "",
                "ISR": "(747)2667569",
                "Informal_Document": "Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12",
                "SKU_Weight": "",
                "ArrayStrings": [
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        },
                        {
                                "Shipping_Point": "Алматы ул.Кабдолова 1/4 ТРК Grand Park",
                                "Goods": "",
                                "Quantity": "1",
                                "Item_Status": "",
                                "Pickup_Point": "0",
                                "Delivery_Point": "0",
                                "Pickup_Latitude": "0",
                                "Pickup_Longitude": "0",
                                "Delivery_Latitude": "0",
                                "Delivery_Longitude": "0",
                                "Pickup_Time": "01.01.0001 0:00:00",
                                "Delivery_Time": "01.01.0001 0:00:00"
                        }
                ],
                "ContactInformation": {
                        "City": "Алматы",
                        "Delivery_Condition": "Доставка",
                        "Date_Time_delivery": "2023-08-16 К До 20:00",
                        "Time_Window": "15:00-18:00",
                        "Latitude": "43,3189165",
                        "Longitude": "76,93994950000001",
                        "Street": "нет данных",
                        "Home": "74",
                        "Phone": "(747)2667569",
                        "Apartment": "нет данных",
                        "Contractor": "АЛЕКСЕЙ ТРУНКИН"
                }
        }
]
[
  {
    Number: '№№00015934',
    Date: '14.08.2023 15:53:04',
    Organization: 'TOO Gulser Computers (Гулсер Компьютерс)',
    DocumentStatus: 'Оформлена',
    Driver: '',
    ISR: '(747)2667569',
    Informal_Document: 'Заказ покупателя ППО 000000080238 от 14.08.2023 15:46:12',
    SKU_Weight: '',
    ArrayStrings: [ [Object], [Object] ],
    ContactInformation: {
      City: 'Алматы',
      Delivery_Condition: 'Доставка',
      Date_Time_delivery: '2023-08-16 К До 20:00',
      Time_Window: '15:00-18:00',
      Latitude: '43,3189165',
      Longitude: '76,93994950000001',
      Street: 'нет данных',
      Home: '74',
      Phone: '(747)2667569',
      Apartment: 'нет данных',
      Contractor: 'АЛЕКСЕЙ ТРУНКИН'
    }
  }
] messageData!!!!!!!!!!!


