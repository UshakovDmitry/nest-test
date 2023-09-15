rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { getAllMessagesFromRabbitMQ } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService {
  constructor(private readonly messageService: MessageService) {
    try {
      // При создании сервиса выводим текущий список сообщений из RabbitMQ
      this.listenForNewMessages();
    } catch (error) {
      // Если возникли ошибки, выводим их в консоль
      console.log('Ошибка при подключении к RabbitMQ', error);
    }
  }

  private async listenForNewMessages() {
    console.log('listenForNewMessages----------------');
    
    const messages = getAllMessagesFromRabbitMQ();
    for (const message of messages) {
      // Попробуйте сохранить сообщение в базу данных
      try {
        console.log('Сохраняем сообщение в базе данных', message);

        await this.messageService.saveMessage(message);
      } catch (error) {
        console.log('Ошибка при сохранении сообщения в базе данных', error);
      }
    }
  }
}

listener-rabbitMQ.ts
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


rabbitmq.service.ts не отрабатыет при изменении getAllMessagesFromRabbitMQ
реализуй подску или слушатель с помощью дизайн паттерна обзервбл

