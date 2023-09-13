

MODULE.TS
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';

@Module({
  providers: [RabbitMQService],
  controllers: [RabbitMQController],
  exports: [RabbitMQService] // Если нужно использовать сервис в других модулях
})
export class RabbitMQModule {}


COTROLLER.TS

import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get('all-message')
  async findAll(): Promise<any[]> {
    return this.rabbitMQService.readFromQueue();
  }
}

SERVICE.TS
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MessageService } from './message.service'; // импортируйте ваш сервис

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private messageService: MessageService) { // инжектите ваш сервис
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://tms:26000567855499290979@rabbitmq.next.local`],
        queue: 'TmsQueue',
        queueOptions: { durable: false },
      },
    });
    this.client.connect(); // подключаемся к RabbitMQ
    this.listenForMessages(); // начинаем слушать сообщения
  }

  async listenForMessages(): Promise<void> {
    this.client.on('data', async (data) => {
      await this.messageService.create(data); // сохраняем сообщение в MongoDB
    });
  }

  async readFromQueue(): Promise<any> {
    return this.client.send<any, any>('get_message', {}).toPromise();
  }
}
