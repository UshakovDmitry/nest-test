Ты разработчик JS с 10 летним стажем

Я пишу фронт и бэкенд
для передачи использую http но сейчас хочу реализовать SSE
вот код модуля на NEST 


TransportRequestsService
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly dbService: DBService,
  ) {}

  async getAllTransportRequests(): Promise<any[]> {
    return await this.dbService.getAllTransportRequests();
  }

  async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.dbService.getTransportRequestByNumber(number);
  }

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    return await this.dbService.getTransportRequestsByDateRange(
      startDate,
      endDate,
    );
  }
}


TransportRequestsController
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  constructor(
    private readonly transportRequestsService: TransportRequestsService,
  ) {}

  @Get()
  async getAllTransportRequests() {
    return this.transportRequestsService.getAllTransportRequests();
  }

  @Post('byNumber')
  async getTransportRequestByNumber(@Body('number') number: string) {
    return this.transportRequestsService.getTransportRequestByNumber(number);
  }

  @Post('byDateRange')
  async getTransportRequestsByDateRange(
    @Body() dateRangeDto: { startDate: string; endDate: string },
  ) {
    return this.transportRequestsService.getTransportRequestsByDateRange(
      dateRangeDto.startDate,
      dateRangeDto.endDate,
    );
  }
}

TransportRequestsModule

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule  
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}


реализуй передачу данных через SSE 
я хочу чтобы обновленные данные приходили на фронтенд без перезагрузки страницы
пусть бекенд отправляет на фронт понги и когда случится событие(изменение) фронтенд делает уже сущесвующий запрос 
вот как выглядит запрос с фронтенда 

  async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    console.log(response.length, 'кол-во заявок');
    // console.log(response, 'response');
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);

      this.model.transportRequests.unshift(transformedDataForTable);
    });
  }

