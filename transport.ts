

MODULE.TS
import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

@Module({
  controllers: [TransportController],
  providers: [TransportService],
})
export class TransportModule {}



COTROLLER.TS

import { Controller, Get } from '@nestjs/common';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}
  @Get()
  async getTransport() {
    return await this.transportService.getTransport();
  }
}

SERVICE.TS
import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

@Module({
  controllers: [TransportController],
  providers: [TransportService],
})
export class TransportModule {}
