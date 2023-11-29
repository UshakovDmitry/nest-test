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

  // Остальные методы...

  async getDriversByDate(date: string) {
    let drivers = await this.dbService.getDriversByDate(date);

    // Получение данных о местоположении автомобилей
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

    // Получение и обновление данных водителей из внешнего источника
    drivers = await this.updateDriversWithExternalData(drivers);

    return drivers;
  }

  // Добавленная функция
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
}
