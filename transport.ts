import { Injectable } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @MessagePattern()
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Сообщение получено:', data);
    try {
      await this.messageService.create(data);
      console.log('Сообщение сохранено');
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Ошибка при сохранении', error);
      channel.nack(originalMsg);
    }
  }
}



ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-
3)
$ npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 1616  - 14.09.2023, 13:44:49     LOG [NestFactory] Starting Nest application...
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] MongooseModule dependencie
s initialized +28ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] ClientsModule dependencies
 initialized +1ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] MongooseCoreModule depende
ncies initialized +10ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] MongooseModule dependencie
s initialized +7ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] MessageModule dependencies
 initialized +1ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] RabbitMQModule dependencie
s initialized +0ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [InstanceLoader] AppModule dependencies ini
tialized +1ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [NestMicroservice] Nest microservice succes
sfully started +84ms
Microservices started
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [RoutesResolver] RabbitMQController {/all-m
essages}: +16ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [RouterExplorer] Mapped {/all-messages, GET
} route +3ms
[Nest] 1616  - 14.09.2023, 13:44:49     LOG [NestApplication] Nest application successf
ully started +3ms
Application is listening on port 4000
[Nest] 1616  - 14.09.2023, 13:44:57   ERROR [Server] There is no matching event handler
 defined in the remote service. Event pattern: undefined
