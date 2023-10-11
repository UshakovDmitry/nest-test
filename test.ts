Ты fullstack разработчик с 20 летним стажем
У меня есть массив вот с такими элемаентами 

   {
            "QuantityPlaces": "3",
            "LoadingCapacity": "1 500",
            "MaximumLoadLength": "2 970",
            "MaximumCargoWidth": "1 900",
            "MaximumLoadHeight": "2 160",
            "RegistrationNumber": "M121237",
            "City": "Актау",
            "Brandcar": [
                {
                    "Brand": "ГАЗ-3302",
                    "Imei": ""
                }
            ],
            "LoadType": [
                {
                    "Type": "NORMAL_TRUCK"
                },
                {
                    "Type": "TAIL_LIFT"
                }
            ],
            "WorkingSchedule": [
                {
                    "TimeWindow": "09:00:00-18:00:00",
                    "RigidTimeWindow": "Да"
                }
            ]
        },

я хочу преобразовать к вот такому виду

{
       carBrand: Brandcar.Brand ,
       carNumber: RegistrationNumber,
       carVolume : (MaximumLoadLength * MaximumCargoWidth * MaximumLoadHeight) / 1000000,
       loadingCapacity : LoadingCapacity,
       city:City,
       timeWindow: WorkingSchedule.TimeWindow
}






вставь сюда это промежуточную логику 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransportService {
  constructor(private readonly httpService: HttpService) {}
  async getTransport() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/ParametersCars'));
    return response.data.data;
  }
}



















      carVolume: (parseInt(data.MaximumLoadLength) * parseInt(data.MaximumCargoWidth) * parseInt(data.MaximumLoadHeight)) / 1000000000,













import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransportService {
  constructor(private readonly httpService: HttpService) {}

  transformData(data) {
    return {
      carBrand: data.Brandcar[0]?.Brand || "",
      carNumber: data.RegistrationNumber,
      carVolume: (parseInt(data.MaximumLoadLength) * parseInt(data.MaximumCargoWidth) * parseInt(data.MaximumLoadHeight)) / 1000000,
      loadingCapacity: parseInt(data.LoadingCapacity.replace(/\s+/g, '')), // убираем пробелы и конвертируем в число
      city: data.City,
      timeWindow: data.WorkingSchedule[0]?.TimeWindow || ""
    };
  }

  async getTransport() {
    const response = await firstValueFrom(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS/ParametersCars'));
    return response.data.data.map(this.transformData);
  }
}




