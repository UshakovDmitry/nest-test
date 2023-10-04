PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> npm run start

> tms-api@0.0.1 start
> nest start

[Nest] 7344  - 04.10.2023, 09:49:54     LOG [NestFactory] Starting Nest application...
[Nest] 7344  - 04.10.2023, 09:49:54     LOG [InstanceLoader] MongooseModule dependencies initialized +32ms
[Nest] 7344  - 04.10.2023, 09:49:54   ERROR [ExceptionHandler] Nest can't resolve dependencies of the DBService (MessageModel, ?). Please make sure that the argument HttpService at index [1] is available i
n the DBModule context.

Potential solutions:
- Is DBModule a valid NestJS module?
- If HttpService is a provider, is it part of the current DBModule?
- If HttpService is exported from a separate @Module, is that module imported within DBModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

Error: Nest can't resolve dependencies of the DBService (MessageModel, ?). Please make sure that the argument HttpService at index [1] is available in the DBModule context.

Potential solutions:
- Is DBModule a valid NestJS module?
- If HttpService is a provider, is it part of the current DBModule?
- If HttpService is exported from a separate @Module, is that module imported within DBModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:128:38)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:97:9)
    at Injector.lookupComponentInImports (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:289:17)
    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:252:33)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:207:33)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class DBService {
  [x: string]: any;
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    httpService: HttpService,
  ) {}

  async getCorrectCityName(city: string): Promise<string> {
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;

    try {
      const response = await this.httpService.get(url).toPromise();
      console.log(response.data.GeoObjectCollection.featureMember[0].GeoObject.name,'город из яндекса');
      
      return response.data.GeoObjectCollection.featureMember[0].GeoObject.name;
    } catch (error) {
      console.error("Ошибка при получении данных из Yandex Geocode:", error);
      throw error;
    }
  }


  async saveMessage(messageData: any) {
    try {

      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;


      const correctCityName = await this.getCorrectCityName(parsedData.ContactInformation.City);
      console.log(correctCityName,'correctCityName');
      





      const existingMessage = await this.messageModel
        .findOne({ Number: parsedData.Number })
        .exec();

      if (existingMessage) {
        // Если сообщение с таким номером уже существует, обновляем его
        const updatedMessage = await this.messageModel
          .findOneAndUpdate({ Number: parsedData.Number }, parsedData, {
            new: true,
          })
          .exec();
        console.log('Обновил сообщение:', updatedMessage.Number);
        return updatedMessage;
      } else {
        // Если сообщения с таким номером нет, создаем новое
        const createdMessage = new this.messageModel(parsedData);
        console.log('Новое сообщение в бд:', createdMessage.Number);
        return createdMessage.save();
      }
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllTransportRequests(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }


  async getAllDrivers() {
    const aggregation = [
        {
            $sort: { Driver: 1 }
        },
        {
            $group: {
                _id: "$Driver",
                transportRequests: {
                    $push: {
                        number: "$Number",
                        date: "$Date",
                        dateCreated: "$DateCreated",
                        organization: "$Organization",
                        documentStatus: "$DocumentStatus",
                        ISR: "$ISR",
                        nuberPPO: "$NumberPPO",
                        informalDocument: "$Informal_Document",
                        filterContractor: "$FilterContractor",
                        loanAgreementStatus: "$loanAgreementStatus",
                        typePayment: "$TypePayment",
                        chronologies: "$ArrayChronologies",
                        contactInformation: "$ContactInformation",
                        orders: "$ArrayStrings",
                    }
                },
                сarNumber: { $first: "$NumberCar" },
                carModel: { $first: "$CarModel" }
            }
        }
    ];

    const driversAggregated = await this.messageModel.aggregate(aggregation as any).exec();

    const drivers = driversAggregated.map(driverData => ({
        driver: driverData._id,
        carNumber: driverData.сarNumber,
        carModel: driverData.carModel,
        transportRequests: driverData.transportRequests.map(request => ({
            ...request,
            orders: request.orders.flat()
        }))
    }));

    return drivers;
}

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



