import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller';
import { MessageSchema } from '../schemas/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { DBModule } from '../db/db.module';  


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule  ,HttpModule],
  controllers: [CouriersController],
  providers: [CouriersService],
})
export class CouriersModule {}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { ApiTags } from '@nestjs/swagger';
import { CouriersDateDto,CouriersNamesDto  } from './couriers.dto';

@ApiTags('Couriers')
@Controller('/api/getCouriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Get()
  getCouriers() {
    return this.couriersService.getCouriers();
  }
  @Post('/by-date')
  async getCouriersByDate(@Body() couriersDateDto: CouriersDateDto) {
    return this.couriersService.getCouriersByDate(couriersDateDto.date);
  }

  @Post('/names')
  async getCouriersNames(@Body() couriersNamesDto: CouriersNamesDto) {
    return this.couriersService.getCouriersNames(couriersNamesDto.city,couriersNamesDto.date);
  }
}

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CouriersDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}

export class CouriersNamesDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  date?: string;
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CouriersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  async getCouriersByDate(date: string) {
    const driversByDate = await this.dbService.getDriversByDate(date);
    const allCouriers = await this.getCouriers();
    
    // Фильтруем allCouriers, оставляя только тех водителей, которые присутствуют в driversByDate.
    const filteredCouriers = allCouriers.filter(courier => 
      driversByDate.some(driver => driver.driver === courier.Drivers)
    );
    
    return filteredCouriers; // Возвращаем отфильтрованный список курьеров.
  }



  async getCouriers() {
    const response = await firstValueFrom(
      this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'),
    );

    const data = await Promise.all(
      response.data.data.map(async (item: any) => {
        const convertValue = (value: string, fieldName: string) => {
          if (value === 'Да') return true;
          if (value === 'Нет') return false;
          return value; // Лучше добавить обработку неизвестных значений
        };

        let carNumberFromDB = '';

        // Например, предполагая, что у вас есть метод для получения драйвера из базы данных:
        const driverFromDB = await this.dbService.getDriverByDriverName(
          item.Drivers,
        );

        if (driverFromDB) {
          carNumberFromDB = driverFromDB.NumberCar;
        }

        return {
          ...item,
          carNumber: carNumberFromDB,
          HardTimeWindow: convertValue(item.HardTimeWindow, 'HardTimeWindow'),
          ReturnWarehouse: convertValue(
            item.ReturnWarehouse,
            'ReturnWarehouse',
          ),
        };
      }),
    );

    return data;
  }

  async getCouriersNames(city: string, date: string) {
    //TODO: В дальнейшем сортировать по графику работы с учетом даты
    console.log(date, 'date');
    
    const couriers = await this.getCouriers();
    
    const couriersNames = couriers
        .filter(courier => courier.City && courier.City.toLowerCase() === city.toLowerCase()) 
        .map(courier => ({ 
            full_name: courier.Drivers,
            hiring_type: courier.HiringType,
            time_window: courier.TimeWindow,
            hard_time_window: courier.HardTimeWindow,
            return_warehouse: courier.ReturnWarehouse,
            city: courier.City,
            car_number: courier.carNumber
        }));
        
    return couriersNames;
}
}









[Nest] 22188  - 19.10.2023, 16:20:01   ERROR [NestApplication] Error: listen EADDRINUSE: address already in use :::4000 +3ms
Error: listen EADDRINUSE: address already in use :::4000
    at Server.setupListenHandle [as _listen2] (node:net:1330:16)
    at listenInCluster (node:net:1378:12)
    at Server.listen (node:net:1465:7)
    at ExpressAdapter.listen (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\platform-express\
adapters\express-adapter.js:88:32)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\nest-application.js:180:30
    at new Promise (<anonymous>)
    at NestApplication.listen (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\nest-applic
ation.js:170:16)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at bootstrap (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\main.ts:42:3)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>
