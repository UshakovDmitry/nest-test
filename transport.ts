 listener.rabbitMQ.ts
const amqp = require('amqplib/callback_api');

const arrMessage = [];

amqp.connect(
  'amqp://tms:26000567855499290979@rabbitmq.next.local',
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      // Название очереди
      const queue = 'TmsQueue';

      channel.assertQueue(queue, {
        durable: true,
      });

      // Здесть мы получаем сообщения из очереди и добавляем в массив arrMessage
      channel.consume(
        queue,
        function (msg: any) {
          console.log('Сообщение :', msg.content.toString());
          arrMessage.push(msg.content.toString());
        },
        {
          noAck: true,
        },
      );
    });
  },
);

export function getAllMessagesFromRabbitMQ() {
  return arrMessage;
}


а вот rabbitmq.service.ts
import { Injectable } from '@nestjs/common';

import { MessageService } from '../message/message.service';
import { getAllMessagesFromRabbitMQ } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService {
  constructor(private readonly messageService: MessageService) {
    try {
      console.log('list', getAllMessagesFromRabbitMQ());
      setTimeout(() => {
        console.log('list', getAllMessagesFromRabbitMQ());
      }, 20000);
    } catch (error) {
      console.log('Ошибка при подключении к RabbitMQ', error);
    }
  }
}

app.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
// import { RabbitMQController } from './rabbitmq/rabbitmq.controller';
import { MessageModule } from './message/message.module';
import { MessageSchema } from './message/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [RabbitMQService],
})
export class AppModule {}



сделай рефакторинг 

