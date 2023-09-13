Сервис для работы с RabbitMQ (rabbitmq.service.ts)
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  constructor(private readonly messageService: MessageService) {}

  async onModuleInit() {
    // Логика для инициализации, если необходимо
  }

  @EventPattern('get_message')
  async handleData(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    await this.messageService.create(data);
    channel.ack(originalMsg);
  }
}



Сервис для работы с MongoDB (message.service.ts)
Замечание: Предполагая, что у вас уже есть Mongoose схема для сообщений.
  
  
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async create(data: any): Promise<Message> {
    const createdMessage = new this.messageModel(data);
    return await createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }
}







Контроллер (rabbitmq.controller.ts)
import { Controller, Get } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Controller('all-messages')
export class RabbitMQController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll() {
    return this.messageService.findAll();
  }
}






Обновление AppModule (app.module.ts)
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageService } from './message/message.service';
import { MessageSchema } from './message/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/rabbitmq'),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
          queue: 'TmsQueue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService, MessageService],
})
export class AppModule {}

