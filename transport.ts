import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service'; // 1. Импортируем DBService

@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly dbService: DBService, // 2. Инъекция DBService
  ) {}

  async getDrivers() {
    return await this.dbService.getDriversTest(); // 3. Вызов метода getDriversTest из dbService
  }
}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { DBService } from './db.service';
import { DBController } from './db.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [DBService],
  exports: [DBService],  // Экспорт DBService
  controllers: [DBController],
})
export class DBModule {}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DBModule } from '../db/db.module';  // Импорт DBModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule  // Добавьте DBModule в массив импорта
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
