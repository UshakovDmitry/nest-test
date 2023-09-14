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








 async readFromQueue(): Promise<QueueMessage> {
    try {
      const response = await this.httpService
        .post(
          'http://rabbitmq.next.local/api/queues/%2F/TmsQueue/get',
          {
            count: 1,
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            truncate: 50000,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${this.username}:${this.password}`,
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      if (response.status === 200 && response.data.length > 0) {
        const data = response.data[0];
        const payload = JSON.parse(data.payload);

        return payload;
      } else {
        throw new Error('Возникла ошибка при получении данных');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
