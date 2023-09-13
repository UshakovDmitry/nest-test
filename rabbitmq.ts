$ npm i --save amqplib amqp-connection-manager @nestjs/microservices


// MODULE.TS
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller'; 
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule.register({}),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local:5672'],
          queue: 'TmsQueue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController], 
  providers: [RabbitMQService],
})
export class RabbitMQModule {}





// SERVICE.TS
import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { QueueMessage } from './rabbitmq.interface';

@Injectable()
export class RabbitMQService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local:5672'],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    },
  })
  client: ClientProxy;

  async readFromQueue(): Promise<QueueMessage> {
    return this.client.send<QueueMessage>('read', {}).toPromise();
  }
}













import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { QueueMessage } from './rabbitmq.interface';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get('read')
  async readFromQueue() {
    return await this.rabbitMQService.readFromQueue();
  }

  @MessagePattern('read')
  handleMessage(@Payload() data: QueueMessage) {
    console.log(data); // ваше сообщение из очереди RabbitMQ
    return data; 
  }
}

