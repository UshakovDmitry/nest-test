import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from 'https';

@Injectable()
export class GeliosService {
  private axiosInstance;

  constructor() {
    // Creating an Axios instance with custom configuration
    this.axiosInstance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false // This will ignore unauthorized self-signed certificates, use with caution
      }),
      // You can add more custom configuration if necessary
    });
  }

  async getCarLocations() {
    try {
      const login = process.env.GELIOS_LOGIN;
      const pass = process.env.GELIOS_PASSWORD;

      // Check if login and password are available
      if (!login || !pass) {
        throw new Error('Login or password for Gelios is undefined.');
      }

      const response = await this.axiosInstance.get(
        `https://admin.geliospro.com/sdk/?login=${login}&pass=${pass}&svc=get_units&params={}`
      );

      // Check if the data is present and is an array
      if (!Array.isArray(response.data)) {
        throw new Error('Response data is not an array.');
      }

      const drivers = response.data.map(driver => {
        // Using optional chaining and nullish coalescing operator
        const name = driver?.name ?? 'Unknown';
        const unit_icon = driver?.unit_icon ?? 'Default Icon';
        const lat = driver?.lmsg?.lat ?? 0;
        const lon = driver?.lmsg?.lon ?? 0;
        const info = driver?.info ? JSON.parse(driver.info) : {};

        return {
          name,
          unit_icon,
          latitude: lat,
          longitude: lon,
          info,
        };
      });
      
      return drivers;
    } catch (error) {
      // Error handling remains similar to your current implementation
      // ...
      throw new Error('Не удалось получить данные о водителях');
    }
  }
}
