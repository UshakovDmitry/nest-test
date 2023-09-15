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

      const queue = 'TmsQueue';
    //   const msg = 'Hello World!';

      channel.assertQueue(queue, {
        durable: true,
      });
      // channel.sendToQueue(queue, Buffer.from(msg));

      // console.log(" [x] Sent %s", msg);
      console.log(
        ' [*] Waiting for messages in %s. To exit press CTRL+C',
        queue,
      );

      channel.consume(
        queue,
        function (msg) {
          console.log(' [x] Received %s', msg.content.toString());
          arrMessage.push(msg.content.toString());
        },
        {
          noAck: true,
        },
      );
    });
    // setTimeout(function() {
    //     connection.close();
    //     process.exit(0);
    // }, 500);
  },
);

export function RRR() {
  return arrMessage;
}


я реализовал вот такое подключение и чтение из очереди в файле listener.rabbitMQ.ts

а вот rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  ClientRMQ,
  MessagePattern,
} from '@nestjs/microservices';
import { MessageService } from '../message/message.service';
import { RRR } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService {
  private client: ClientRMQ;

  constructor(private readonly messageService: MessageService) {
    try {
      this.client = new ClientRMQ({
        urls: ['amqp://tms:26000567855499290979@rabbitmq.next.local'],
        queue: 'TmsQueue',
        queueOptions: {
          durable: true,
        },
      });
      this.client.connect();
      console.log('list', RRR());
      setTimeout(() => {
        console.log('list', RRR());
      }, 20000);
    } catch (error) {
      console.log('Ошибка при подключении к RabbitMQ', error);
    }
  }

  @MessagePattern('test')
  ackMessageTestData(data: unknown) {
    try {
      console.log(data.toString());
      return 'Message Received';
    } catch (error) {
      console.log('Ошибка при получении сообщения из очереди', error);
    }
  }



  async emitToQueue(message: any) {
    try {
      return this.client.emit('TmsQueue', message);
    } catch (error) {
      console.log('Ошибка при отправке сообщения в очередь', error);
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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    MessageModule,
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
  controllers: [],
  providers: [RabbitMQService],
})
export class AppModule {}


сделай рефакторинг 
убери все не нужное 
примери дизайн паттерн observale

