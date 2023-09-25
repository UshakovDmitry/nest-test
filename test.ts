https://courier.yandex.ru/vrs/api/v1/result/mvrp/22cc3628-26f81dfa-a91c4ad4-15a49418




ya.module.ts
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class YaModule {}



ya.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class YaService {
  getDrivers(): any[] {
    
  }
}



ya.controller.ts
import { Controller, Get } from '@nestjs/common';
import { YaService } from './ya.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('/api/drivers')
export class TransportController {
  constructor(private readonly transportService: YaService) {}
  @Get()
  async getDrivers() {
    return await this.YaService.getDrivers();
  }
}


