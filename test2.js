import { Controller, Get,Post,Body } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Couriers')
@Controller('/api/getCouriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Get()
  getCouriers() {
    return this.couriersService.getCouriers();
  }
  @Post ('/by-date')
   async getCouriersByDate(@Body('date') date: string) {
     return this.couriersService.getCouriersByDate(date);
   }
   @Post('/names')  
   async getCouriersNames(@Body() body: { city: string, date: string }) {
       const { city, date } = body;
       return this.couriersService.getCouriersNames(city, date);
   }

}
