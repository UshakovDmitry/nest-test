npm install @nestjs/microservices @nestjs/common @nestjs/core reflect-metadata rxjs
npm install @golevelup/nestjs-rabbitmq



import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
        queue: 'TmsQueue',
        queueOptions: {
          durable: true
        },
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();



///////////////////////////////////////////


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


///////////////////////////////////////////


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
  public handleIncomingMessage(payload: any) {
    this.logger.log(`Received message: ${JSON.stringify(payload)}`);
  }
}


///////////////////////////////////////////


