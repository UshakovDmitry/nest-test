https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/
import { HttpException, HttpStatus } from '@nestjs/common';

// ...

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';  


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule,
    HttpModule,
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}




