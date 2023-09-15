PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 18988  - 15.09.2023, 10:47:46     LOG [NestFactory] Starting Nest application...
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [InstanceLoader] AppModule dependencies initialized +14ms
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [InstanceLoader] DiscoveryModule dependencies initialized +0ms
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [RabbitMQModule] Successfully connected to RabbitMQ
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [AmqpConnection] Successfully connected a RabbitMQ channel "AmqpConnection"
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [InstanceLoader] RabbitMQModule dependencies initialized +0ms
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [RoutesResolver] AppController {/}: +16ms
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [RabbitMQModule] Initializing RabbitMQ Handlers
[Nest] 18988  - 15.09.2023, 10:47:46     LOG [NestApplication] Nest application successfully started +3ms
Микросервис запущен


и вот мой код

app.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Message } from 'amqplib';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @RabbitSubscribe({
    exchange: 'TmsExchange',
    routingKey: 'tms1c',
    queue: 'TmsQueue',
  })
  public async handleMessage(message: any, amqpMsg: Message) {
    console.log('Received full message:', JSON.stringify(message));
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
    amqpMsg.ack();
  }
}


app.module
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'TmsExchange',
          type: 'direct',
        },
      ],
      uri: 'amqp://tms:26000567855499290979@rabbitmq.next.local',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}


main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // Можете изменить порт, если необходимо
  console.log('Микросервис запущен');
}

bootstrap();
