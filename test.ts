// message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  providers: [MessageService],
  exports: [MessageService]  // Убедитесь, что сервис экспортируется
})
export class MessageModule {}




// rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { MessageModule } from '../message/message.module';  // Добавьте этот импорт

@Module({
  imports: [MessageModule],  // Добавьте этот импорт в массив
  providers: [RabbitMQService, RabbitMQController],
})
export class RabbitMQModule {}

