
MODULE.TS
import { Module } from '@nestjs/common';
import { LoadersService } from './loaders.service';
import { LoadersController } from './loaders.controller';

@Module({
  controllers: [LoadersController],
  providers: [LoadersService],
})
export class LoadersModule {}


COTROLLER.TS
import { Controller, Get } from '@nestjs/common';
import { LoadersService } from './loaders.service';

@Controller('loaders')
export class LoadersController {
  constructor(private readonly loadersService: LoadersService) {}

  @Get()
  getLoaders() {
    return this.loadersService.getLoaders();
  }
}



SERVICE.TS
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadersService {
  private LOADERS: any[] = [
    {
      fullName: 'Иванов Иван Иванович',
      warehouseNumber: '1',
      schedule: 'Пн-Пт 9:00-18:00',
      transportNumber: 'A 123 AA 77',
      isActive: true,
    },
    {
      fullName: 'Кукин Иван Иванович',
      warehouseNumber: '1',
      schedule: 'Пн-Пт 9:00-18:00',
      transportNumber: 'A 123 AA 77',
      isActive: true,
    },
    {
      fullName: 'Сидоренко Иван Иванович',
      warehouseNumber: '1',
      schedule: 'Пн-Пт 9:00-18:00',
      transportNumber: 'A 123 AA 77',
      isActive: true,
    },
  ];

  getLoaders(): any[] {
    return this.LOADERS;
  }
}
