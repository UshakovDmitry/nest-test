
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportService {
  private TRANSPORT: any[] = [
    {
      model: 'ЗАЗ',
      number: 'A 123 AA 77',
      type: 'Газель',
      volume: '4.5',
      loadCapacity: '1.5',
      city: 'Караганда',
      isActive: true,
      schedule: 'Пн-Пт 9:00-18:00',
      hasDriver: true,
    },
    {
      model: 'БелАЗ',
      number: 'I 901 II 15',
      type: 'Минивэн',
      volume: '5.2',
      loadCapacity: '1.7',
      city: 'Астана',
      isActive: false,
      schedule: 'Пн-Пт 13:00-21:00',
      hasDriver: true,
    },
  ];

  
  getTransport() {
    return this.TRANSPORT;
  }
}



///////////
import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

@Module({
  controllers: [TransportController],
  providers: [TransportService],
})
export class TransportModule {}

///////
import { isString } from "class-validator";

export class TransportDto {
@isString()

}
//////////////
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

