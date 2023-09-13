
MODULE.TS
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}



COTROLLER.TS
import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rabbitmq')
@Controller('/api/rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get('/read')
  async readFromQueue() {
    return await this.rabbitMQService.readFromQueue();
  }
}





SERVICE.TS
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueueMessage } from './rabbitmq.interface';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';

  constructor(private readonly httpService: HttpService) {}

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
}
