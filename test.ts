import { Injectable, HttpService } from '@nestjs/common';
import { QueueMessage } from './rabbitmq.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument, MESSAGE_SCHEMA_NAME } from '../message/message.schema';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(MESSAGE_SCHEMA_NAME) private readonly messageModel: Model<MessageDocument>
  ) {}

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

        // Сохраняем сообщение в базе данных
        const message = new this.messageModel(payload);
        await message.save();

        return payload;
      } else {
        throw new Error('Возникла ошибка при получении данных');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Дополнительный метод для получения всех сообщений из MongoDB
  async getAllMessages(): Promise<QueueMessage[]> {
    return this.messageModel.find().exec();
  }
}
