import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import { ApiTags } from '@nestjs/swagger';
import { Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';

@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  constructor(
    private readonly transportRequestsService: TransportRequestsService,

  ) {}

  @Get()
  async getAllTransportRequests() {
    return this.transportRequestsService.getAllTransportRequests();
  }


  @Post('/not-predicted')
  async getNotPredictedTransportRequestsByDate(@Body('date') date: string) {
    return this.transportRequestsService.getNotPredictedTransportRequestsByDate(date);
  }
    
  

  @Post('byNumber')
  async getTransportRequestByNumber(@Body('number') number: string) {
    return this.transportRequestsService.getTransportRequestByNumber(number);
  }

  @Post('byDateRange')
  async getTransportRequestsByDateRange(
    @Body() dateRangeDto: { startDate: string; endDate: string },
  ) {
    return this.transportRequestsService.getTransportRequestsByDateRange(
      dateRangeDto.startDate,
      dateRangeDto.endDate,
    );
  }


  @Post('by-date')
  async getTransportRequestsByDate(@Body('date') date: string) {
    return this.transportRequestsService.getTransportRequestsByDate(date);
  }


  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.transportRequestsService.serverSentEvents();
  }

}
