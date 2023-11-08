import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeliosService {
  async getCarLocations(login: string, pass: string) {
    try {
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

        const infoObject = JSON.parse(info);
        
        return {
          name,
          unit_icon,
          latitude: lat,
          longitude: lon,
          info: infoObject,
        };
      });
      
      return drivers;
    } catch (error) {
      if (error.response) {
        // Сервер вернул ответ с кодом статуса, который вышел из диапазона 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // Запрос был сделан, но ответ не был получен
        console.error('Request:', error.request);
      } else {
        // Что-то пошло не так при настройке запроса
        console.error('Error message:', error.message);
      }
      console.error('Config:', error.config);
      throw new Error('Не удалось получить данные о водителях');
    }
  }
}

