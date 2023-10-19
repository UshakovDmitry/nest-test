// transport-requests.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

// DTO для получения непредсказанных транспортных запросов по дате
export class GetNotPredictedTransportRequestsByDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}

// DTO для получения транспортных запросов по номеру
export class GetTransportRequestByNumberDto {
  @IsNotEmpty()
  @IsString()
  number: string;
}

// DTO для получения транспортных запросов в заданном диапазоне дат
export class GetTransportRequestsByDateRangeDto {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;
}

// DTO для получения транспортных запросов по дате
export class GetTransportRequestsByDateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}










// transportrequests.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Sse,
} from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import {
  GetNotPredictedTransportRequestsByDateDto,
  GetTransportRequestByNumberDto,
  GetTransportRequestsByDateRangeDto,
  GetTransportRequestsByDateDto,
} from './transport-requests.dto';

@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  constructor(private readonly transportRequestsService: TransportRequestsService) {}

  // ... (other methods remain unchanged)

  @Post('/not-predicted')
  async getNotPredictedTransportRequestsByDate(@Body() dto: GetNotPredictedTransportRequestsByDateDto) {
    return this.transportRequestsService.getNotPredictedTransportRequestsByDate(dto.date);
  }

  @Post('byNumber')
  async getTransportRequestByNumber(@Body() dto: GetTransportRequestByNumberDto) {
    return this.transportRequestsService.getTransportRequestByNumber(dto.number);
  }

  @Post('byDateRange')
  async getTransportRequestsByDateRange(@Body() dto: GetTransportRequestsByDateRangeDto) {
    return this.transportRequestsService.getTransportRequestsByDateRange(dto.startDate, dto.endDate);
  }

  @Post('by-date')
  async getTransportRequestsByDate(@Body() dto: GetTransportRequestsByDateDto) {
    return this.transportRequestsService.getTransportRequestsByDate(dto.date);
  }

  // ... (other methods remain unchanged)
}
