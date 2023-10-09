couriers.service
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CouriersService {
  constructor(private readonly httpService: HttpService ,  private readonly dbService: DBService, ) {}



  async getCouriers() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/Drivers'));

    const data = await Promise.all(response.data.data.map(async (item: any) => {
        const convertValue = (value: string, fieldName: string) => {
            if (value === 'Да') return true;
            if (value === 'Нет') return false;
            return value; // Лучше добавить обработку неизвестных значений
        };

        let carNumberFromDB = '';

        // Например, предполагая, что у вас есть метод для получения драйвера из базы данных:
        const driverFromDB = await getDriverFromDatabase(item.Drivers);
        if (driverFromDB) {
            carNumberFromDB = driverFromDB.NumberCar;
        }

        return {
            ...item,
            carNumber: carNumberFromDB,
            HardTimeWindow: convertValue(item.HardTimeWindow, 'HardTimeWindow'),
            ReturnWarehouse: convertValue(item.ReturnWarehouse, 'ReturnWarehouse')
        };
    }));

    return data;
}

async function getDriverFromDatabase(driverName: string) {

    return await dbService.collection('drivers').findOne({ Driver: driverName });
}

}

couriers.module
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



couriers.controller
import { Controller, Get } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Couriers')
@Controller('/api/getCouriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Get()
  getDistributedСities() {
    return this.couriersService.getCouriers();
  }
}


не получается 
Unexpected token. A constructor, method, accessor, or property was expected.ts(1068)

Cannot find name 'dbService'. Did you mean 'DBService'?ts(2552)
any






