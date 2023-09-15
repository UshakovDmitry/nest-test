observer.ts
export interface Observer {
  update(message: string): void;
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

  public notifyObservers(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}




listener-rabbitMQ.ts

const amqp = require('amqplib/callback_api');
import { Subject } from './observer';

export const messageSubject = new Subject();

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

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(
        queue,
        function (msg: any) {
          console.log('Received message:', msg.content.toString());
          messageSubject.notifyObservers(msg.content.toString());
        },
        {
          noAck: true,
        }
      );
    });
  }
);





rabbitmq.service.ts

import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { Observer } from './observer';
import { messageSubject } from './listener-rabbitMQ';

@Injectable()
export class RabbitMQService implements Observer {
  constructor(private readonly messageService: MessageService) {
    messageSubject.addObserver(this);
  }

  public update(message: string): void {
    this.saveMessageToDb(message);
  }

  private async saveMessageToDb(message: string): Promise<void> {
    try {
      console.log('Saving message to database:', message);
      await this.messageService.saveMessage(message);
    } catch (error) {
      console.log('Error saving message to database:', error);
    }
  }
}

