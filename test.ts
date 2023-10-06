// cities.module.ts
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}


// cities.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CitiesService {
  constructor(private readonly httpService: HttpService) {}

  async getDistributedСities() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/DistributionWorks'));
    return response.data;
  }
}




// cities.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cities')
@Controller('/api/getCities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getLoaders() {
    return await this.citiesService.getDistributedСities();
  }
}
