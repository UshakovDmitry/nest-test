import { Injectable } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @EventPattern('get_message')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    await this.messageService.create(data);
    channel.ack(originalMsg);
  }
}




import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { MessageService } from '../message/message.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
          queue: 'TmsQueue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [RabbitMQService, MessageService],
})
export class RabbitMQModule {}

