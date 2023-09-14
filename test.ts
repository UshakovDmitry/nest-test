import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';

process.env.SWAGGER_USER = 'tms';
process.env.SWAGGER_PASSWORD = '123456789';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // -- SWAGGER -- //
  app.use(
    ['/swagger', '/swagger-stats'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
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
  // -- CORS -- //
  app.enableCors();
  // -- COMPRESS -- //
  app.use(compression());
  // -- LISTEN -- //
  await app.listen(4000);
}
bootstrap();





import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageService } from './message/message.service';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';

@Module({
  imports: [
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
  providers: [RabbitMQService, MessageService],
})
export class AppModule {}




import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageService } from './message/message.service';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';

@Module({
  imports: [
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
  providers: [RabbitMQService, MessageService],
})
export class AppModule {}



