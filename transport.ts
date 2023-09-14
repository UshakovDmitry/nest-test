// rabbitmq.module.ts

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'TmsExchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://user:password@localhost:5672',
    }),
  ],
  controllers: [MessageController],
})
export class RabbitMqModule {}



// message.controller.ts

import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  @RabbitSubscribe({
    exchange: 'TmsExchange',
    routingKey: 'some-routing-key', // Или другой ключ маршрутизации, который вы используете
    queue: 'some-queue-name', // Имя очереди
  })
  public async handleMessage(message: any) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
  }
}





// app.module.ts

import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
