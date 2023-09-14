import { Injectable } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, ClientRMQ, Transport } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  private client: ClientRMQ;

  constructor(private readonly messageService: MessageService) {
    this.client = new ClientRMQ({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
        queue: 'TmsQueue',
        queueOptions: {
          durable: true,
        },
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














Argument of type '{ transport: Transport; options: { urls: string[]; queue: string; queueOptions: { durable: boolean; }; }; }' is not assignable to parameter of type '{ urls?: string[] | RmqUrl[]; queue?: string; prefetchCount?: number; isGlobalPrefetchCount?: boolean; queueOptions?: any; socketOptions?: any; noAck?: boolean; serializer?: Serializer<any, any>; ... 5 more ...; maxConnectionAttempts?: number; }'.
  Object literal may only specify known properties, and 'transport' does not exist in type '{ urls?: string[] | RmqUrl[]; queue?: string; prefetchCount?: number; isGlobalPrefetchCount?: boolean; queueOptions?: any; socketOptions?: any; noAck?: boolean; serializer?: Serializer<any, any>; ... 5 more ...; maxConnectionAttempts?: number; }'.ts(2345)
(property) transport: Transport
