import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { MessageService } from '../message/message.service';
import { RabbitMQController } from './rabbitmq.controller';

@Module({
  providers: [RabbitMQService, MessageService, RabbitMQController],
})
export class RabbitMQModule {}




import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageService } from './message/message.service';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
          queue: 'TmsQueue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService, MessageService],
})
export class AppModule {}
