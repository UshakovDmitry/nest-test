import { Injectable } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  Client,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private readonly messageService: MessageService) {
    this.client = new ClientProxy({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
        queue: 'TmsQueue',
        queueOptions: {
          durable: true,
        },
      },
    });
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

  async sendToQueue(data: any) {
    await this.client.connect();
    return this.client.emit('TmsQueue', data).toPromise();
  }
}
