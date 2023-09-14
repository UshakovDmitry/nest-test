npm install @golevelup/nestjs-rabbitmq



import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { connectMongoose } from './connect-mongoose';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'TmsExchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://tms:26000567855499290979@rabbitmq.next.local',
    }),
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}




rabbitmq.service.ts (может быть переименован для большей ясности):


import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {

  constructor(private readonly messageService: MessageService) {}

  @RabbitSubscribe({
    exchange: 'TmsExchange',
    routingKey: 'tms1c',
    queue: 'TmsQueue',
  })
  async handleTms1cEvent(message: any) {
    console.log('Received message:', message);
    try {
      await this.messageService.create(message);
      console.log('Message saved');
    } catch (error) {
      console.error('Error saving message', error);
      // Handle the error. For example, you can republish the message for retry.
    }
  }
}



Обновите ваш файл main.ts:

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setDescription('Внимание! Некоторые методы могут изменять данные в базе данных!')
    .setVersion('1.0')
    .addTag('API для TMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.use(compression());

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  console.log(`Application is listening on port ${port}`);
}

bootstrap();
