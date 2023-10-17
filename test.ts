// src/drivers/driver-location.model.ts

export class DriverLocation {
  constructor(
    public id: number,
    public latitude: number,
    public longitude: number,
    // Другие поля, если необходимо
  ) {}
}


// src/drivers/drivers.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios'; // Установите axios, если он не установлен

@Injectable()
export class DriversService {
  async getDriverLocations(login: string, pass: string) {
    try {
      // Выполните запрос к API GeliosPro для получения данных о координатах водителей
      const response = await axios.get(
        `https://admin.geliospro.com/sdk/?login=${login}&pass=${pass}&svc=get_units&params={}`
      );

      // Обработайте ответ и верните данные о координатах водителей в нужном формате
      // Возможно, вам придется парсить JSON-ответ и извлекать нужные данные

      return response.data; // Верните данные о координатах водителей
    } catch (error) {
      throw new Error('Не удалось получить данные о водителях');
    }
  }
}








// src/drivers/drivers.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get('locations')
  async getDriverLocations(
    @Query('login') login: string,
    @Query('pass') pass: string,
  ) {
    const driverLocations = await this.driversService.getDriverLocations(
      login,
      pass
    );
    return driverLocations;
  }
}








// src/app.module.ts
import { Module } from '@nestjs/common';
import { DriversController } from './drivers/drivers.controller';
import { DriversService } from './drivers/drivers.service';

@Module({
  imports: [],
  controllers: [DriversController],
  providers: [DriversService],
})
export class AppModule {}














