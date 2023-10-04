import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { MessageSchema } from '../schemas/message.shema';
// import { DBController } from './db.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [DBService],
  exports: [DBService],
  controllers: [],
})
export class DBModule {}
