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
          const messageObj = JSON.parse(msg.content.toString());
          console.log('Сообщение из TmsQueue', messageObj);
          messageSubject.notifyObservers(messageObj);
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
      console.log(parsedData, 'messageData!');

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
  Shipping_Point: { type: String, default: '' },
  Goods: { type: String, default: '' },
  Quantity: { type: String, default: '' },
  Item_Status: { type: String, default: '' },
  Pickup_Point: { type: String, default: '' },
  Delivery_Point: { type: String, default: '' },
  Pickup_Latitude: { type: String, default: '' },
  Pickup_Longitude: { type: String, default: '' },
  Delivery_Latitude: { type: String, default: '' },
  Delivery_Longitude: { type: String, default: '' },
  Pickup_Time: { type: String, default: '' },
  Delivery_Time: { type: String, default: '' },
});

const ContactInformationSchema = new Schema({
  City: { type: String, default: '' },
  Delivery_Condition: { type: String, default: '' },
  Date_Time_delivery: { type: String, default: '' },
  Time_Window: { type: String, default: '' },
  Latitude: { type: String, default: '' },
  Longitude: { type: String, default: '' },
  Street: { type: String, default: 'нет данных' },
  Home: { type: String, default: 'нет данных' },
  Phone: { type: String, default: '' },
  Apartment: { type: String, default: 'нет данных' },
  Contractor: { type: String, default: '' },
});

export const MessageSchema = new Schema(
  {
    Number: { type: String, default: '' },
    Date: { type: Date, default: Date.now },
    Organization: { type: String, default: '' },
    DocumentStatus: { type: String, default: '' },
    Driver: { type: String, default: '' },
    ISR: { type: String, default: '' },
    Informal_Document: { type: String, default: '' },
    SKU_Weight: { type: String, default: '' },
    ArrayStrings: { type: [ArrayStringsSchema], default: [] },
    ContactInformation: { type: ContactInformationSchema, default: {} },
  },
  { versionKey: false },
);


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

message.module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}

app.module

import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MessageController } from './message/message.controller';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [RabbitMQService],
})
export class AppModule {}

main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || ''],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // SWAGGER CONFIGURATION
  app.use(
    ['/swagger', '/swagger-stats'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER || '']: process.env.SWAGGER_PASSWORD || '',
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Описание всех контроллеров REST API')
    .setDescription(
      'Внимание! Некоторые методы могут изменять данные в базе данных!',
    )
    .setVersion('1.0')
    .addTag('API для TMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.use(compression());

  await app.startAllMicroservices();
  console.log('Микросервис запущен');

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  console.log(`Приложение слушаетсчя на ${port}`);
}
bootstrap();




















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


