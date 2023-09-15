Exchange: TmsExchange in virtual host /
Overview
Message rates last minute 
10:30:5010:31:0010:31:1010:31:2010:31:3010:31:400.0 /s1.0 /s
Publish (In)
0.00/s
Publish (Out)
0.00/s
Details
Type	direct
Features	
durable:	true
Policy	ha-fed
Bindings
This exchange

⇓

To	Routing key	Arguments	
TmsQueue
tms1c	
Add binding from this exchange

To queue
:	
 *
Routing key:
Arguments:
=	

String
Publish message
Routing key:
Headers: 
=	

String
Properties: 
=	
Payload:
Delete this exchange




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
          durable: true,
        },
      },
    },
  );
  await app.listen();
  console.log('Микросервис запущен');
}

bootstrap();


