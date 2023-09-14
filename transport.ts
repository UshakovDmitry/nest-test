rabbitmq.module.ts
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessageController } from '../message/message.controller';

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
  ],
  controllers: [MessageController],
})
export class RabbitMqModule {}


AppModule
import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

main.ts
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

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  console.log(`Application is listening on port ${port}`);
}

bootstrap();

rabbitmq.service
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

message.controller

import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  @RabbitSubscribe({
    exchange: 'TmsExchange',
    routingKey: 'tms1c', // Или другой ключ маршрутизации, который вы используете
    queue: 'TmsQueue', // Имя очереди
  })
  public async handleMessage(message: any) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
  }
}



PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 14248  - 14.09.2023, 17:29:36     LOG [NestFactory] Starting Nest application...
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [InstanceLoader] RabbitMqModule dependencies initialized +0ms
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [InstanceLoader] DiscoveryModule dependencies initialized +1ms
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
[Nest] 14248  - 14.09.2023, 17:29:36   ERROR [AmqpConnection] Disconnected from RabbitMQ broker (default)
Error: Channel closed by server: 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - inequivalent arg 'type' for exchange 'TmsExchange' in vhost '/': received 'topic' but current is 'direct'"
    at ConfirmChannel.C.accept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:422:17)
    at Connection.mainAccept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:64:33)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:478:48)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
[Nest] 14248  - 14.09.2023, 17:29:36     LOG [AmqpConnection] Failed to setup a RabbitMQ channel - name: AmqpConnection / error: Channel ended, no reply will be forthcoming Error: Channel ended, no reply will
 be forthcoming
    at rej (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:201:7)
    at ConfirmChannel.C._rejectPending (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:207:42)
    at ConfirmChannel.C.toClosed (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:171:8)
    at Connection.C._closeChannels (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:394:18)
    at Connection.C.toClosed (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:401:8)
    at Connection.C.onSocketError (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:355:10)
    at Connection.emit (node:events:526:28)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:481:12)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)
Unhandled rejection Error: Operation failed: ExchangeDeclare; 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - inequivalent arg 'type' for exchange 'TmsExchange' in vhost '/': received 'topic' bu
t current is 'direct'"
    at reply (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:134:29)
    at ConfirmChannel.C.accept (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\channel.js:417:7)
    at Connection.mainAccept [as accept] (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:64:33)
    at Socket.go (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\node_modules\amqplib\lib\connection.js:478:48)
    at Socket.emit (node:events:526:28)
    at emitReadable_ (node:internal/streams/readable:578:12)
    at processTicksAndRejections (node:internal/process/task_queues:82:21)

[Nest] 14248  - 14.09.2023, 17:29:41   ERROR [ExceptionHandler] Failed to connect to a RabbitMQ broker within a timeout of 5000ms
Error: Failed to connect to a RabbitMQ broker within a timeout of 5000ms
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@golevelup\nestjs-rabbitmq\src\amqp\connection.ts:193:17
    at Observable.init [as _subscribe] (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\observable\throwError.ts:123:68)
    at Observable._trySubscribe (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:244:19)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:234:18
    at Object.errorContext (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\util\errorContext.ts:29:5)
    at Observable.subscribe (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\Observable.ts:220:5)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\operators\timeout.ts:354:15
    at AsyncAction.<anonymous> (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\util\executeSchedule.ts:27:5)
    at AsyncAction._execute (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncAction.ts:120:12)
    at AsyncAction.execute (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncAction.ts:95:24)
    at AsyncScheduler.flush (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\rxjs\src\internal\scheduler\AsyncScheduler.ts:40:27)
    at listOnTimeout (node:internal/timers:559:17)
    at processTimers (node:internal/timers:502:7)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>


