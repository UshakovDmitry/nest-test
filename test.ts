У меня есть котроллер который возвращает все транспортные заявки а также по номеру
./transportRequests.controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  constructor(
    private readonly transportRequestsService: TransportRequestsService,
  ) 
  {}

  @Get()
  async getAllTransportRequests() {
    return this.transportRequestsService.getAllTransportRequests();
  }

  @Post('byNumber')
async getTransportRequestByNumber(@Body('number') number: string) {
    return this.transportRequestsService.getTransportRequestByNumber(number);
}

}

Я хочу добавить метод который будет принимать две даты и возвращать заявки из указанного диапазона

./transportRequests.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service'; 


@Injectable()
export class TransportRequestsService {
    constructor(
        @InjectModel('Message') private messageModel: Model<MessageDocument>,
        private readonly dbService: DBService, 
      ) {}
    
        async getAllTransportRequests(): Promise<any[]> {
            return await this.dbService.getAllTransportRequests();
        }


        async getTransportRequestByNumber(number: string): Promise<any> {
          return await this.dbService.getTransportRequestByNumber(number);
      }
}

db.service
Здесь у меня описаны методы с базоданных монго
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DBService {
  [x: string]: any;
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getDriversByDate(date: string) {
    const drivers = await this.getAllDrivers();
    const filteredDrivers = drivers
      .map((driver) => {
        const filteredRequests = driver.transportRequests.filter(
          (transportRequest) => {
            return (
              transportRequest.contactInformation.Date_Time_delivery.split(
                ' ',
              )[0] === date
            );
          },
        );

        return { ...driver, transportRequests: filteredRequests };
      })
      .filter((driver) => driver.transportRequests.length > 0);
    return filteredDrivers;
  }

  async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.messageModel.findOne({ Number: number }).exec();
  }
}
вот так выглядят обьекты в бд

_id
651cfc4d1d80def42ca02fda
Number
"№№00148463"
Date
"03.10.2023 12:15:42"
DateCreated
"4-10-2023"
Organization
"TOO Gulser Computers (Гулсер Компьютерс)"
DocumentStatus
"Доставляется"
CarModel
""
NumberCar
""
Driver
"Әбілдаев Абылайхан Әшімұлы"
ISR
"(771)8975627"
TypePayment
"Кредит"
loanAgreementStatus
""
IdYandex
""
distribution
false
Informal_Document
"Заказ покупателя ППО"
FilterContractor
"Alser"

ArrayStrings
Array (1)

0
Object
NuberPPO
"8779739"
PPOStatus
"Доставляется до клиента (на складе отгрузки)"
SKU
"1375371"
Goods
"WMD-1280NDV-WH/Стиральная машина Dauscher"
Count
"1"
ShippingAddress
""
Brand
"DAUSCHER"
Weight
"68,3"
Price
"161 991"
Item_Status
""
Pickup_Point
"0"
Delivery_Point
"0"
Pickup_Latitude
"42,348907"
Pickup_Longitude
"69,530052"
Delivery_Latitude
"0"
Delivery_Longitude
"0"
Pickup_Time
"01.01.0001 0:00:00"
Delivery_Time
"01.01.0001 0:00:00"

ContactInformation
Object
City
"Шымкент"
Delivery_Condition
"Доставка"
Date_Time_delivery
"2023-10-05  До 20:00"
Time_Window
"15:00-18:00"
Latitude
"42.3420105"
Longitude
"69.62451"
Street
"42"
Home
"26"
Phone
"(771)8975627"
Apartment
"42"
Contractor
"Валентина Валентина"
_id
651cfc4d1d80def42ca02fdb

StructureQuantities
Object
TotalWeight
"68.3"
TotalAmount
"161991"
_id
651cfc4d1d80def42ca02fdc

ArrayChronologies
Array (1)

0
Object
PPO
"8779739"

Chronology
Array (2)
0
"Оформлен"
1
"Доставляется до клиента (на складе отгрузки)"

Ориентируйся на дату Date_Time_delivery
"2023-10-05  До 20:00"
Ее еще  нужно обработать убрав лишнее в строке(она стабильно приходит в таком виде!
Реализуй и напиши код во всех файлах
