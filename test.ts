drivers.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('/api/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getDrivers() {
    return await this.driversService.getDrivers();
  }
}

drivers.module.ts
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { DriversService } from './drivers.service';
// import { MessageSchema } from '../schemas/message.shema';
import { DriversController } from './drivers.controller';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}

drivers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async getDrivers() {
      
  }
}

db.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DBService } from './db.service';
// import { DriversService } from 'src/drivers/drivers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('getMessages')
@Controller('/api/getMessages')
export class DBController {
  constructor(
    private readonly DBService: DBService,
    // private readonly driversService: DriversService,
    ) {}

  @Get()
  async getAllMessages() {
    return this.DBService.getAllMessages();
  }

  @Post()
  async saveMessage(@Body() messageData: any) {
    return this.DBService.saveMessage(messageData);
  }

  @Get('/test')
  async test() {
    return this.DBService.getDriversTest();
  }
}


db.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { MessageSchema } from '../schemas/message.shema';
import { DBController } from './db.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [DBService],
  exports: [DBService],
  controllers: [DBController],
})
export class DBModule {}

db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class DBService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const createdMessage = new this.messageModel(parsedData);
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }

  async processNewMessage(messageData: any) {
    try {
      // TODO - Проверить {upsert: true}
      /**
       * return await this.messageModel
          .update({ Number: messageData.Number }, messageData, {upsert: true})
          .exec();
       */
      const existingMessage = await this.messageModel
        .findOne({ Number: messageData.Number })
        .exec();

      if (existingMessage) {
        return await this.messageModel
          .updateOne({ Number: messageData.Number }, messageData)
          .exec();
      } else {
        const parsedData =
          typeof messageData === 'string'
            ? JSON.parse(messageData)
            : messageData;
        const createdMessage = new this.messageModel(parsedData);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка при обработке нового сообщения:', error);
      throw error;
    }
  }
  async getDriversTest() {
    // Получить все уникальные имена из коллекции по полю Driver
    const collectionDriverNames = await this.messageModel.distinct('Driver').exec();
    for (const driver in collectionDriverNames) {
      console.log(driver);
    }
}
}
