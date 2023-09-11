import { Module, HttpModule } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [HttpModule],  // Добавляем HttpModule для возможности делать HTTP запросы
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})
export class RabbitMQModule {}






import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';
  private readonly url: string = 'http://rabbitmq.next.local/api/queues/%2F/TmsQueue/get';

  constructor(private readonly httpService: HttpService) {}

  async readFromQueue(): Promise<any> {
    try {
      const response = await this.httpService.post(
        this.url,
        {
          count: 1,
          ackmode: 'ack_requeue_true',
          encoding: 'auto',
          truncate: 50000,
        },
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      ).toPromise();

      if (response.status !== 200) {
        throw new Error('Возникла ошибка при получении данных');
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
