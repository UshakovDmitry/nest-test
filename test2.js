import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

// DTO для получения водителей по дате
export class GetDriversByDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}

// DTO для получения водителей по имени
export class GetDriversByNameDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

// DTO для получения статистики водителей по дате
export class GetDriversStatsDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}



import { Controller, Get, Post, Body } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiTags } from '@nestjs/swagger';
import { GetDriversByDateDto, GetDriversByNameDto, GetDriversStatsDto } from './drivers.dto';

@ApiTags('drivers')
@Controller('/api/getDrivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getDrivers() {
    return await this.driversService.getDrivers();
  }

  @Post('/by-date')
  async getDriversByDate(@Body() dto: GetDriversByDateDto) {
    return await this.driversService.getDriversByDate(dto.date);
  }

  @Post('/by-name')
  async getDriversByName(@Body() dto: GetDriversByNameDto) {
    return await this.driversService.getDriversByName(dto.name);
  }
  
  @Post('/stats')
  async getDriversStats(@Body() dto: GetDriversStatsDto) {
    return this.driversService.getDriversStatsByDate(dto.date);
  }
}

