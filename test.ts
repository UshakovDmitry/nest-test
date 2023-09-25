https://courier.yandex.ru/vrs/api/v1/result/mvrp/22cc3628-26f81dfa-a91c4ad4-15a49418




ya.module.ts
import { Module, HttpModule } from '@nestjs/common';
import { YaService } from './ya.service';
import { TransportController } from './ya.controller';

@Module({
  imports: [HttpModule],  // Добавляем HttpModule, если вам нужно использовать HTTP в сервисе (это зависит от того, как вы реализуете GET-запрос).
  controllers: [TransportController],  // Добавляем контроллер
  providers: [YaService],  // Добавляем сервис
})
export class YaModule {}



ya.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YaService {
  async getDrivers(): Promise<any> {
    try {
      const response = await axios.get('https://courier.yandex.ru/vrs/api/v1/result/mvrp/22cc3628-26f81dfa-a91c4ad4-15a49418');
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  }
}



ya.controller.ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { YaService } from './ya.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('/api/drivers')
export class TransportController {
  constructor(private readonly yaService: YaService) {}  // Исправил имя сервиса на "yaService"

  @Get()
  async getDrivers() {
    try {
      return await this.yaService.getDrivers();  // Исправил имя сервиса на "yaService"
    } catch (error) {
      throw new HttpException('Failed to fetch drivers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

