main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

// Инициализация dotenv
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
  console.log('Microservices started');

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  console.log(`Application is listening on port ${port}`);
}
bootstrap();
//////////////////////////////////////////////////////////////
app module
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
          queue: 'TmsQueue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
})
export class AppModule {}
//////////////////////////////////////////////////////////////////

rabbitmq.module
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { MessageModule } from '../message/message.module'; // 👈 import
@Module({
  imports: [MessageModule], 
  providers: [RabbitMQService, RabbitMQController],
})
export class RabbitMQModule {}
////////////////////////////////////////////////////////////////
rabbitmq.service
import { Injectable } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  ClientRMQ,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  private client: ClientRMQ;

  constructor(private readonly messageService: MessageService) {
    this.client = new ClientRMQ({
      urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    });
    this.client.connect(); // подключаемся к RabbitMQ
  }

  @EventPattern('TmsQueue')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('Сообщение получено:', data);

    try {
      await this.messageService.create(data);
      console.log('Сообщение сохранено');
      channel.ack(originalMsg); // Подтверждаем успешное получение и обработку сообщения
    } catch (error) {
      console.error('Ошибка при сохранении', error);
      channel.nack(originalMsg); // Отправляем neg-ack в случае ошибки, чтобы сообщение могло быть переотправлено или обработано иначе
    }
  }

  // Метод для отправки сообщений в RabbitMQ
  async emitToQueue(message: any) {
    return this.client.emit('TmsQueue', message);
  }
}
/////////////////////////////////////////////////////////
rabbitmq.controller
import { Controller, Get } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Controller('all-messages')
export class RabbitMQController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll() {
    return this.messageService.findAll();
  }
}

///////////////////////////////////////////////////////////////////////////////////////
message.module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService], // 👈 export for DI
})
export class MessageModule {}
/////////////////////////////////////////////////////////////////////
message.shema
import { Document, Schema } from 'mongoose';

const ArrayStringSchema = new Schema({
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
  Pickup_Time: String,
  Delivery_Time: String,
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
  Date: String,
  Organization: String,
  DocumentStatus: String,
  Driver: String,
  ISR: String,
  Informal_Document: String,
  SKU_Weight: String,
  ArrayStrings: [ArrayStringSchema],
  ContactInformation: ContactInformationSchema,
});

export interface Message extends Document {
  Number: string;
  Date: string;
  Organization: string;
  DocumentStatus: string;
  Driver: string;
  ISR: string;
  Informal_Document: string;
  SKU_Weight: string;
  ArrayStrings: (typeof ArrayStringSchema)[];
  ContactInformation: typeof ContactInformationSchema;
}

