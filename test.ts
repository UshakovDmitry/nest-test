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

Cannot find name 'Message'.ts(2304)
Parameter 'amqpMsg' of public method from exported class has or is using private name 'Message'.ts(4073)
type Message = /*unresolved*/ any

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
