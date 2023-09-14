import { Injectable } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {
    console.log('RabbitMQService');
  }

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

[Nest] 9400  - 14.09.2023, 14:58:07     LOG [NestFactory] Starting Nest application...
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] MongooseModule dependencie
s initialized +28ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] ClientsModule dependencies
 initialized +0ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] MongooseCoreModule depende
ncies initialized +10ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] MongooseModule dependencie
s initialized +7ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] MessageModule dependencies
 initialized +1ms
RabbitMQService
RabbitMQService
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] RabbitMQModule dependencie
s initialized +1ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [InstanceLoader] AppModule dependencies ini
tialized +1ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [NestMicroservice] Nest microservice succes
sfully started +96ms
Microservices started
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [RoutesResolver] RabbitMQController {/all-m
essages}: +16ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [RouterExplorer] Mapped {/all-messages, GET
} route +3ms
[Nest] 9400  - 14.09.2023, 14:58:07     LOG [NestApplication] Nest application successf
ully started +2ms
Application is listening on port 4000
