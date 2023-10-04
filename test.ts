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
    private httpService: HttpService,
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


'(): Promise<AxiosResponse<any, any>>' is deprecated.ts(6385)
Observable.d.ts(121, 9): The declaration was marked as deprecated here.
(method) Observable<AxiosResponse<any, any>>.toPromise(): Promise<AxiosResponse<any, any>> (+2 overloads)
@deprecated — Replaced with firstValueFrom and lastValueFrom . Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise
