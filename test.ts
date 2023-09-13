import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Number: string;

  @Column()
  Date: string;

  @Column()
  Organization: string;

  // ... (все остальные поля сообщения)

  @Column('json')
  ArrayStrings: Array<any>;

  @Column('json')
  ContactInformation: any;
}




////////////
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../database/message.entity';

@Injectable()
export class RabbitMQService {
  private readonly username: string = 'tms';
  private readonly password: string = '26000567855499290979';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async readFromQueue(): Promise<any> {
    try {
      const { data } = await this.httpService
        .post(
          'http://rabbitmq.next.local/api/queues/%2F/TmsQueue/get',
          {
            count: 1,
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            truncate: 50000,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${this.username}:${this.password}`,
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      if (data.length > 0) {
        const payload = JSON.parse(data[0].payload);
        const savedMessage = this.messageRepository.save(payload);
        return savedMessage;
      } else {
        throw new Error('Возникла ошибка при получении данных');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



//////////

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { Message } from './database/message.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule,
    TypeOrmModule.forRoot({
      type: 'mongodb', // или ваш тип базы данных
      host: 'localhost',
      port: 27017,
      database: 'your-db-name',
      entities: [Message],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

