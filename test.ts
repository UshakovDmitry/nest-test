у меня написан модуль на NEST 
я хочу избавиться от моковых данных получать и возвращать города по этому адресу 
 GET: http://10.0.1.20/1CHS/hs/TMS/DistributionWorks

cities.controller
import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cities')
@Controller('/api/getCities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getLoaders() {
    return this.citiesService.getDistributedСities();
  }
}


cities.service
import { Injectable } from '@nestjs/common';

@Injectable()
export class CitiesService {
  private LOADERS: any[] = [
'астана','алматы'
  ];

  getDistributedСities() {
    return this.LOADERS;
  }
}


cities.module
import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}


