import { Injectable } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, ClientRMQ } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  private client: ClientRMQ;

  constructor(private readonly messageService: MessageService) {
    this.client = new ClientRMQ({
      urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    });
    this.client.connect(); // подключаемся к RabbitMQ
  }

  @EventPattern('TmsQueue')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('Сообщение получено:', data);

    try {
      await this.messageService.create(data);
      console.log('Сообщение сохранено');
      channel.ack(originalMsg); // Подтверждаем успешное получение и обработку сообщения
    } catch (error) {
      console.error('Ошибка при сохранении', error);
      channel.nack(originalMsg); // Отправляем neg-ack в случае ошибки, чтобы сообщение могло быть переотправлено или обработано иначе
    }
  }

  // Метод для отправки сообщений в RabbitMQ
  async emitToQueue(message: any) {
    return this.client.emit('TmsQueue', message);
  }
}








ushakov.dmitriy@DIT-104 MINGW64 ~/Desktop/alser.dispatcherworkplaceui/backend (develop-
3)
$ npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 3616  - 14.09.2023, 15:54:31     LOG [NestFactory] Starting Nest application...
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] MongooseModule dependencie
s initialized +28ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] ClientsModule dependencies
 initialized +0ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] MongooseCoreModule depende
ncies initialized +10ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] MongooseModule dependencie
s initialized +6ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] MessageModule dependencies
 initialized +1ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] RabbitMQModule dependencie
s initialized +6ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [InstanceLoader] AppModule dependencies ini
tialized +1ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [NestMicroservice] Nest microservice succes
sfully started +86ms
Microservices started
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [RoutesResolver] RabbitMQController {/all-m
essages}: +16ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [RouterExplorer] Mapped {/all-messages, GET
} route +2ms
[Nest] 3616  - 14.09.2023, 15:54:31     LOG [NestApplication] Nest application successf
ully started +2ms
Application is listening on port 4000
[Nest] 3616  - 14.09.2023, 15:54:34   ERROR [Server] There is no matching event handler
 defined in the remote service. Event pattern: undefined
