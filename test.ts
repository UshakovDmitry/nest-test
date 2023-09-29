у меня проблема
когда у меня приходит сообщение из rabbitMQ я его записываю с помощью Obsrver
но проблема в том что приходит одно сообщение а записывается их два
я поставил console log и увидел что console log внутри 
 update(messageArray: Array<any>): void {
    console.log('Получено сообщение:', messageArray);
    this.saveMessageToDb(messageArray);
  }

а также вынутри 
  public notifyObservers(message: string | Array<any>): void {
    for (const observer of this.observers) {
    console.log('ПРОБЕГАЮ ПО ВСЕМ ПОДПИСЧИКАМ', message);
      observer.update(message);
    }
  }

срабатывают два раза 

при этом console log внутри файла listener-rabbitMQ срабатывает 1 раз 

вот файлы

 listener-rabbitMQ
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
          const messageObj = JSON.parse(msg.content.toString());
          console.log('Сообщение из TmsQueue', messageObj);
          messageSubject.notifyObservers(messageObj);
        },
        {
          noAck: true,
        },
      );
    });
  },
);



rabbitmq.service
import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Observer } from '../observer';
import { messageSubject } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly DBService: DBService) {
    messageSubject.addObserver(this);
  }

   update(messageArray: Array<any>): void {
    console.log('Получено сообщение:', messageArray);
    this.saveMessageToDb(messageArray);
  }
  private async saveMessageToDb(messageArray: Array<any>): Promise<void> {
    try {
      for (const message of messageArray) {
        // console.log('Сохранение в базу данных...', messageArray);
        console.log('Сохранено в базу данных:', message);
        await this.DBService.saveMessage(message);
      }
    } catch (error) {
      console.log('Ошибка сохранения в базу данных:', error);
    }
  }
}



observer

export interface Observer {
  update(message: string | Array<any>): void;
}

export class Subject {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notifyObservers(message: string | Array<any>): void {
    for (const observer of this.observers) {
    console.log('ПРОБЕГАЮ ПО ВСЕМ ПОДПИСЧИКАМ', message);
      observer.update(message);
    }
  }
}







class Test {
  private static instance: Test;
  private value: any | null;
  private constructor() {
    this.value = null;
  }
  public static getInstance(
    storage: any
  ): Test {
    if (!Test.instance) {
      Test.instance = new Test();
      Test.instance.value = storage;
    }
    return Test.instance;
  }
}

const testInstance = Test.getInstance("test");

