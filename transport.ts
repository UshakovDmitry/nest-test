
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema'; 
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]), // Это строка предоставляет MessageModel
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
