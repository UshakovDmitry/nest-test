
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service';
import { GeliosService } from '../gelios/gelios.service';
import { GELIOS_PRO_LOGIN, GELIOS_PRO_PASSWORD } from '../config';
import e from 'express';
@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly dbService: DBService,
    private readonly geliosService: GeliosService,
  ) {}

  async getDrivers() {
    return await this.dbService.getAllDrivers();
  }


// Не приходят координаты
async getDriversByDate(date: string) {
  const drivers = await this.dbService.getDriversByDate(date);
console.log(drivers, 'drivers');



  const geliosCars = await this.geliosService.getCarLocations(
    GELIOS_PRO_LOGIN,
    GELIOS_PRO_PASSWORD,
  );

  // Инициализация координат водителей
  drivers.forEach(driver => {
    driver.coordinates = {
      latitude: '',
      longitude: '',
    };
  });

  geliosCars.forEach(geliosCar => {
    const { latitude, longitude } = geliosCar;
    const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(/\s+/g, '');

    drivers.forEach(driver => {
      if (driver.carNumber.replace(/\s+/g, '') === carNumberWithoutSpaces) {
        driver.coordinates = {
          latitude,
          longitude,
        };
      }
    });
  });

  return drivers;
}



  async getDriversByName(name: string, date: string) {
    const drivers = await this.dbService.getDriversByName(name, date);
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD,
    );

    // Устанавливаем пустые координаты для каждого водителя
    drivers.forEach((driver) => {
      driver.coordinates = {
        latitude: '',
        longitude: '',
      };
    });

    geliosCars.forEach((geliosCar) => {
      const { latitude, longitude } = geliosCar;
      const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(/\s+/g, '');

      drivers.forEach((driver) => {
     
        if (driver.carNumber === carNumberWithoutSpaces) {
          driver.coordinates = {
            latitude,
            longitude,
          };
        }
      });
    });
    return drivers;
}

  async getDriversStatsByDate(date: string, city: string) {
    return await this.dbService.getDriversStatsByDate(date, city);
  }
}
