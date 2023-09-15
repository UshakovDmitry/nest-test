http://rabbitmq.next.local/#/queues/%2F/TmsQueue
Queue TmsQueue in virtual host /
Overview
Queued messages last minute 
10:50:4010:50:5010:51:0010:51:1010:51:2010:51:300.01.02.03.04.0
Ready
3
Unacked
0
Total
3
Message rates last minute 
10:50:4010:50:5010:51:0010:51:1010:51:2010:51:300.0 /s1.0 /s
Publish
0.00/s
Deliver (manual ack)
0.00/s
Deliver (auto ack)
0.00/s
Consumer ack
0.00/s
Redelivered
0.00/s
Get (manual ack)
0.00/s
Get (auto ack)
0.00/s
Get (empty)
0.00/s
Details
Features	
arguments:	
x-queue-type:	classic
durable:	true
Policy	ha-fed
Operator policy	
Effective policy definition	
federation-upstream-set:	all
ha-mode:	exactly
ha-params:	5
ha-sync-mode:	automatic
message-ttl:	3465687905
Node	rabbit@dkrclstrnd1
Mirrors	rabbit@dkrclstrnd4
rabbit@dkrclstrnd3
rabbit@dkrclstrnd2
rabbit@dkrclstrnd5
State	idle
Consumers	0
Consumer capacity 	0%
Total	Ready	Unacked	In memory	Persistent	Transient, Paged Out
Messages 	3	3	0	3	0	0
Message body bytes 	4.6 KiB	4.6 KiB	0 B	4.6 KiB	0 B	0 B
Process memory 	20 KiB
Consumers (0)
... no consumers ...

Bindings (2)
From	Routing key	Arguments	
(Default exchange binding)
TmsExchange
tms1c	
⇓

This queue

Add binding to this queue
From exchange:
 *
Routing key:
Arguments:
=	

String
Publish message
Message will be published to the default exchange with routing key TmsQueue, routing it to this queue.
Delivery mode:

1 - Non-persistent
Headers: 
=	

String
Properties: 
=	
Payload:
Get messages
Warning: getting messages from a queue is a destructive action. 

Ack Mode:

Nack message requeue true
Encoding:

Auto string / base64
 
Messages:
1
Delete
Purge
Runtime Metrics (Advanced)
Reductions (per second) last minute 
10:50:4010:50:5010:51:0010:51:1010:51:2010:51:300 /s100 /s200 /s300 /s400 /s
Reductions
0.00/s
Minimum binary virtual heap size in words (min_bin_vheap_size)	46422
Minimum heap size in words (min_heap_size)	233
Maximum generational collections before fullsweep (fullsweep_after)	65535
Number of minor GCs (minor_gcs)	23241
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
