import { Injectable } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}
  console.log('RabbitMQService');
  @EventPattern('TmsQueue')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Получено сообщение:', originalMsg);

    try {
      if (data && data.data) {
        console.log('Сообщение получено:', data.data);
        await this.messageService.create(data.data);
        console.log('Сообщение сохранено');

        console.log('Отправка подтверждения для сообщения:', originalMsg);
        channel.ack(originalMsg);
        console.log('Подтверждение отправлено.');
      } else {
        console.error('Некорректный формат сообщения');
      }
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  }
}



ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-
3)
$ npm run start

> tms-api@0.0.1 start
> nest start

src/rabbitmq/rabbitmq.service.ts:8:3 - error TS1434: Unexpected keyword or identifier.

8   console.log('RabbitMQService');
    ~~~~~~~
src/rabbitmq/rabbitmq.service.ts:8:10 - error TS1068: Unexpected token. A constructor,
method, accessor, or property was expected.

8   console.log('RabbitMQService');
           ~
src/rabbitmq/rabbitmq.service.ts:8:15 - error TS1003: Identifier expected.

8   console.log('RabbitMQService');
                ~~~~~~~~~~~~~~~~~
src/rabbitmq/rabbitmq.service.ts:10:9 - error TS2389: Function implementation name must
 be 'log'.

10   async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
           ~~~~~~~~~~

Found 4 error(s).


ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-
3)
$

