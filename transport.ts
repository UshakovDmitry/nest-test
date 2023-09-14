import { Injectable } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @EventPattern('#')
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

[Nest] 17640  - 14.09.2023, 14:52:22     LOG [NestFactory] Starting Nest application...
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] MongooseModule dependenci
es initialized +28ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] ClientsModule dependencie
s initialized +0ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] MongooseCoreModule depend
encies initialized +10ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] MongooseModule dependenci
es initialized +6ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] MessageModule dependencie
s initialized +1ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] RabbitMQModule dependenci
es initialized +0ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [InstanceLoader] AppModule dependencies in
itialized +1ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [NestMicroservice] Nest microservice succe
ssfully started +83ms
Microservices started
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [RoutesResolver] RabbitMQController {/all-
messages}: +17ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [RouterExplorer] Mapped {/all-messages, GE
T} route +2ms
[Nest] 17640  - 14.09.2023, 14:52:22     LOG [NestApplication] Nest application success
fully started +2ms
Application is listening on port 4000
[Nest] 17640  - 14.09.2023, 14:52:34   ERROR [Server] There is no matching event handle
r defined in the remote service. Event pattern: undefined
