
rabbitmq.module.ts:
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
// import { RabbitMQController } from './rabbitmq.controller';
import { MessageModule } from '../message/message.module';
@Module({
  imports: [MessageModule],
  providers: [RabbitMQService],
})
export class RabbitMQModule {}

rabbitmq.service.ts:
import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { getAllMessagesFromRabbitMQ } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService {
  constructor(private readonly messageService: MessageService) {
    try {
      // При создании сервиса выводим текущий список сообщений из RabbitMQ
      this.listenForNewMessages();
    } catch (error) {
      // Если возникли ошибки, выводим их в консоль
      console.log('Ошибка при подключении к RabbitMQ', error);
    }
  }

  private async listenForNewMessages() {
    const messages = getAllMessagesFromRabbitMQ();
    for (const message of messages) {
      // Попробуйте сохранить сообщение в базу данных
      try {
        await this.messageService.saveMessage(message); // предположим, что у вас есть метод saveMessage в вашем messageService
      } catch (error) {
        console.log('Ошибка при сохранении сообщения в базе данных', error);
      }
    }
  }
}
message.module.ts 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.shema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}


message.service.ts 
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<any>,
  ) {}

  async saveMessage(content: string) {
    console.log('saveMessage service', content);

    const newMessage = new this.messageModel({ content });
    return await newMessage.save();
  }
  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}




message.controller.ts:
import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }
}




app.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [],
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













