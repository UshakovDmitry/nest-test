npm install amqplib @nestjs/platform-express


// rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection;
  private channel;

  async connect() {
    this.connection = await amqp.connect('amqp://tms:26000567855499290979@rabbitmq.next.local');
    this.channel = await this.connection.createChannel();
  }

  async getFromQueue(queue: string) {
    if (!this.channel) {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      this.channel.get(queue, { noAck: true }, (err, msgOrFalse) => {
        if (err) reject(err);
        if (msgOrFalse) resolve(msgOrFalse.content.toString());
        else resolve(null);
      });
    });
  }
}




// message.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('message')
export class MessageController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get()
  async getFromQueue(): Promise<string> {
    return await this.rabbitMQService.getFromQueue('TmsQueue');
  }
}




// app.module.ts
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [RabbitMQService],
})
export class AppModule {}























PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api> npx nest g resource  rabbitmq --no-spec
? What transport layer do you use? (Use arrow keys)
> REST API
  GraphQL (code first)
  GraphQL (schema first)
  Microservice (non-HTTP)
  WebSockets
