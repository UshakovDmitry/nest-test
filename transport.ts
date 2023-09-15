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







PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 27132  - 15.09.2023, 09:52:36     LOG [NestFactory] Starting Nest application...
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [AmqpConnection] Trying to connect to RabbitMQ broker (default)
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [InstanceLoader] DiscoveryModule dependencies initialized +1ms
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [RabbitMQModule] Successfully connected to RabbitMQ
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [AmqpConnection] Successfully connected a RabbitMQ channel "AmqpConnection"
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [InstanceLoader] RabbitMQModule dependencies initialized +0ms
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [RabbitMQModule] Initializing RabbitMQ Handlers
[Nest] 27132  - 15.09.2023, 09:52:36     LOG [NestMicroservice] Nest microservice successfully started +72ms
Микросервис запущен
[Nest] 27132  - 15.09.2023, 09:52:43   ERROR [Server] There is no matching event handler defined in the remote service. Event pattern: undefined
