import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service';
import { GeliosService } from '../gelios/gelios.service';
import { GELIOS_PRO_LOGIN, GELIOS_PRO_PASSWORD } from '../config';
import axios from 'axios';


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

  async getDriversByDate(date: string) {
    let drivers = await this.dbService.getDriversByDate(date);

    // Обновление данных водителей на основе внешнего API
    drivers = await this.updateDriversWithExternalData(drivers);

    // Получение данных о местоположении автомобилей
    const geliosCars = await this.geliosService.getCarLocations(
      GELIOS_PRO_LOGIN,
      GELIOS_PRO_PASSWORD,
    );

    // Установка координат для водителей
    this.setDriversCoordinates(drivers, geliosCars);

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
      const carNumberWithoutSpaces = geliosCar.info.numberPlate.replace(
        /\s+/g,
        '',
      );

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

  async updateDriversWithExternalData(drivers) {
    try {
      const response = await axios.get('http://10.0.1.20/1CHS/hs/Yandex_Go/ListDiliveryBlocked');
      const externalData = response.data.data;

      drivers.forEach(driver => {
        const matchedDriver = externalData.find(externalDriver => 
          externalDriver.DriverName.trim() === driver.driver.trim()
        );

        if (matchedDriver && matchedDriver.CarModel && matchedDriver.RegistrationNumber) {
          driver.carModel = matchedDriver.CarModel;
          driver.carNumber = matchedDriver.RegistrationNumber;
        }
      });
    } catch (error) {
      console.error('Ошибка при получении данных из внешнего источника:', error);
    }

    return drivers;
  }

  setDriversCoordinates(drivers, geliosCars) {
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
  }
}


измени updateDriversWithExternalData
если водителя нет в externalData 
то оставляем его поля carModel и carNumber такие же как и были в drivers
