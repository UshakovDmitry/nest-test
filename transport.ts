я читаю сообщения из rabbitMQ
у меня вознкла проблема
когда появляется ссобщение в rabbit то оно почему то два раза записывается в базу данных
вот файлы

listener-rabbitMQ.ts
    
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

rabbitMQ.service.ts

import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { Observer } from '../observer';
import { messageSubject } from '../listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly messageService: MessageService) {
    messageSubject.addObserver(this);
  }

  public update(messageArray: Array<any>): void {
    console.log('Получено сообщение: ', messageArray);
    this.saveMessageToDb(messageArray);
  }

  private async saveMessageToDb(messageArray: Array<any>): Promise<void> {
    try {
      for (const message of messageArray) {
        console.log('Сохранено в базу данных: ', message);
        await this.messageService.saveMessage(message);
      }
    } catch (error) {
      console.log('Ошибка сохранения в базу данных: ', error);
    }
  }
}

message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const createdMessage = new this.messageModel(parsedData);
      console.log(createdMessage, 'createdMessage!');
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}



observer.ts
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
      observer.update(message);
    }
  }
}




