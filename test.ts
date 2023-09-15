PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 21896  - 15.09.2023, 10:37:30     LOG [NestFactory] Starting Nest application...
[Nest] 21896  - 15.09.2023, 10:37:30     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 21896  - 15.09.2023, 10:37:30     LOG [InstanceLoader] AppModule dependencies initialized +13ms
[Nest] 21896  - 15.09.2023, 10:37:30     LOG [InstanceLoader] DiscoveryModule dependencies initialized +0ms
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [RabbitMQModule] Successfully connected to RabbitMQ
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [AmqpConnection] Successfully connected a RabbitMQ channel "AmqpConnection"
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [InstanceLoader] RabbitMQModule dependencies initialized +0ms
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [RoutesResolver] AppController {/}: +17ms
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [RabbitMQModule] Initializing RabbitMQ Handlers
[Nest] 21896  - 15.09.2023, 10:37:31     LOG [NestApplication] Nest application successfully started +2ms
Микросервис запущен

при добавлении сообщений в очередь ничего не проиходит



и вот мой код
app.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @RabbitSubscribe({
    exchange: 'TmsExchange',
    routingKey: 'tms1c',
    queue: 'TmsQueue',
  })
  public async handleMessage(message: any) {
    console.log('Received full message:', JSON.stringify(message));
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
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


