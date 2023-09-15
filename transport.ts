// src/rabbitmq/rabbitmq.service.ts

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private readonly logger = new Logger(RabbitmqService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://tms:26000567855499290979@rabbitmq.next.local');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('TmsQueue');
    this.consume();
  }

  async consume() {
    await this.channel.consume('TmsQueue', (msg) => {
      if (msg !== null) {
        this.logger.log(`Received message: ${msg.content.toString()}`);
        this.channel.ack(msg);
      }
    });
  }
}


// src/app.module.ts

import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  providers: [RabbitmqService],
})
export class AppModule {}



// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Микросервис запущен');
}

bootstrap();
