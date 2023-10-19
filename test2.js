// couriers.dto.ts

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CouriersDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}

export class CouriersNamesDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  date?: string;
}












// couriers.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { ApiTags } from '@nestjs/swagger';
import { CouriersDateDto } from './dto/couriers-date.dto';
import { CouriersNamesDto } from './dto/couriers-names.dto';

@ApiTags('Couriers')
@Controller('/api/getCouriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  // ... (остальные методы)

  @Post('/by-date')
  async getCouriersByDate(@Body() couriersDateDto: CouriersDateDto) {
    return this.couriersService.getCouriersByDate(couriersDateDto.date);
  }

  @Post('/names')
  async getCouriersNames(@Body() couriersNamesDto: CouriersNamesDto) {
    const { city, date } = couriersNamesDto;
    return this.couriersService.getCouriersNames(city, date);
  }
}
