import { Module } from '@nestjs/common';
import { MessageSchema } from './message/message.shema';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/rabbitmq'),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


