import { Controller, Get, Post, Body } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('/api/getDrivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getDrivers() {
    return await this.driversService.getDrivers();
  }

  @Post('/by-date')
  async getDriversByDate(@Body('date') date: string) {
    console.log('date', date);
    return await this.driversService.getDriversByDate(date);
  }

  @Post('/by-name')
  async getDriversByName(@Body('name') name: string) {
    console.log('name', name);
    return await this.driversService.getDriversByName(name);
  }
  
  @Post('/stats')
  async getDriversStats(@Body('date') date: string) {
    return this.driversService.getDriversStatsByDate( date);
  }
}

