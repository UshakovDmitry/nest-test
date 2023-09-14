import { Injectable, MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(private messageService: MessageService) {}

  @MessagePattern()
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(data);
    await this.messageService.create(data);
    channel.ack(originalMsg);
  }
}




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
      queue: 'TmsQueue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();



