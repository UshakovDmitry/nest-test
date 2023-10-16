  {
        "driver": "Наумов Сергей Александрович",
        "carNumber": "",
        "carModel": ""
  }

 {
        "Drivers": "Наумов Сергей Александрович",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-20:00:00",
        "HardTimeWindow": true,
        "ReturnWarehouse": true,
        "City": "Алматы",
        "carNumber": ""
    }

У меня есть метод getCouriersByDate в котором я получаю массив водителей  (driversByDate)
вот как выглядит элемент в массиве
  {
        "driver": "Наумов Сергей Александрович",
        "carNumber": "",
        "carModel": ""
  }

а вот тут (allCouriers) у меня массив всех моих курьеров с элементами вида 
 {
        "Drivers": "Наумов Сергей Александрович",
        "HiringType": "Водитель-экспедитор",
        "TimeWindow": "10:00:00-20:00:00",
        "HardTimeWindow": true,
        "ReturnWarehouse": true,
        "City": "Алматы",
        "carNumber": ""
    }

я хочу возвращать allCouriers только с теми курьерами которые совпадаю с элементами driversByDate по полю driver

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
    const driversByDate =  this.dbService.getDriversByDate(date);
    const allCouriers = await this.getCouriers();
    
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
        console.log(driverFromDB, 'driverFromDB');

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
}
