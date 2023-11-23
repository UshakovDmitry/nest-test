
const amqp = require('amqplib/callback_api');
import { Subject } from './observer';

export const messageSubject = new Subject();

amqp.connect(
  'amqp://tms:26000567855499290979@rabbitmq.next.local',
  function (errorConnect, connection) {
    if (errorConnect) {
      throw 'Ошибка подключения к rabbitMQ: ' + errorConnect;
    }
    connection.createChannel(function (errorCreateChannel, channel) {
      if (errorCreateChannel) {
        throw 'Ошибка создания канала: ' + errorCreateChannel;
      }
      const queue = 'TmsQueue';

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(
        queue,
        function (msg: any) {
          try {
            const messageObj = JSON.parse(msg.content.toString());
            console.log('Сообщение из TmsQueue', messageObj);
            messageSubject.notifyObservers(messageObj);
          } catch (error) {
            console.error('Ошибка при обработке сообщения из TmsQueue:', error.message);
          }
        },
        {
          noAck: true,
        },
      );
    });
  },
);

Максимально подробно расскажи про этот код
как он подключается к очереди и что там за методы
и как это работает
