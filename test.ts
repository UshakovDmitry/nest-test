
main.ts


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { config } from 'dotenv';

// Инициализация dotenv
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Описание всех контроллеров REST API')
    .setDescription(
      'Внимание! Некоторые методы могут изменять данные в базе данных!',
    )
    .setVersion('1.0')
    .addTag('API для TMS')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  app.use(compression());

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  console.log(`Application is listening on port ${port}`);
}

bootstrap();



app.module.ts

import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
})

export class AppModule {}


rabbitmq.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private readonly messageService: MessageService) {}

  async checkForNewMessages() {
    try {
      // Замените этот код на логику, которая реально проверяет и получает сообщения из RabbitMQ
      const newMessages = []; // Mockup 

      for (const message of newMessages) {
        await this.messageService.create(message);
      }
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при сохранении', error);
    }
  }
}


rabbitmq.controller.ts

import { Controller, Get, Post } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(
    private readonly messageService: MessageService,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @Get('/all-messages')
  async findAll() {
    return this.messageService.findAll();
  }

  @Post('/check-for-new-messages')
  async checkForNewMessages() {
    await this.rabbitMQService.checkForNewMessages();
    return { success: true };
  }
}
