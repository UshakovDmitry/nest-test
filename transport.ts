import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessageController } from '../message/message.controller';

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
  controllers: [MessageController],
})
export class RabbitMqModule {}



данные из плагина просмотра очереди

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




From	Routing key	Arguments	
(Default exchange binding)
TmsExchange
tms1c



Warning: getting messages from a queue is a destructive action. 

Ack Mode:

Nack message requeue true
Encoding:

Auto string / base64
 
Messages:
1
