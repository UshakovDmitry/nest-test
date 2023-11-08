import { Injectable } from '@nestjs/common';
import axios from 'axios'; // Установите axios, если он не установлен

@Injectable()
export class GeliosService {
  async getCarLocations(login: string, pass: string) {
    try {
      // Выполните запрос к API GeliosPro для получения данных о координатах водителей
      const response = await axios.get(
        `https://admin.geliospro.com/sdk/?login=${login}&pass=${pass}&svc=get_units&params={}`
      );

      const drivers = response.data.map((driver: any) => {
        const {
          name,
          unit_icon,
          lmsg: { lat, lon },
          info,
        } = driver;
      
        // Распарсим поле "info" в объект
        const infoObject = JSON.parse(info);
      
        return {
          name,
          unit_icon,
          "latitude": lat,
          "longitude": lon,
          info: infoObject, // Вставляем распарсенный объект "info"
        };
      });
      
      return drivers;
    } catch (error) {
      throw new Error('Не удалось получить данные о водителях');
    }
  }
}

[Nest] 7612  - 08.11.2023, 15:16:46   ERROR [ExceptionsHandler] Не удалось получить данные о водителях
Error: Не удалось получить данные о водителях
    at GeliosService.getCarLocations (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\gelios\gelios.service.ts:35:13)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at DriversService.getDriversByDate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\drivers\drivers.service.ts:23:24)
    at DriversController.getDriversByDate (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\src\drivers\drivers.controller.ts:19:12)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\router\router-proxy.js:9:17


