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
    console.log('Received message:', message);
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
  }
}



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
