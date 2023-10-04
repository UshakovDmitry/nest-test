Мне нужно реализовать запрос и выводить в консоль данные что возвращает yandex


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';


@Injectable()
export class DBService {
  [x: string]: any;
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
 
  ) {}

  async getCorrectCityName(city: string){
    console.log(city,'ПРИХОДИТ ГОРОД В getCorrectCityName');
    
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;
    console.log(url,'url');
    
    вот тут мне нужно делать Get запрос и выводить в консоль ответ


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

      if (parsedData.IdYandex !== '') {
        parsedData.distribution = true;
      } else {
        parsedData.distribution = false;
      }

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
        $sort: { Driver: 1 },
      },
      {
        $group: {
          _id: '$Driver',
          transportRequests: {
            $push: {
              number: '$Number',
              IdYandex: '$IdYandex',
              distribution: '$distribution',
              date: '$Date',
              dateCreated: '$DateCreated',
              organization: '$Organization',
              documentStatus: '$DocumentStatus',
              ISR: '$ISR',
              nuberPPO: '$NumberPPO',
              informalDocument: '$Informal_Document',
              filterContractor: '$FilterContractor',
              loanAgreementStatus: '$loanAgreementStatus',
              typePayment: '$TypePayment',
              chronologies: '$ArrayChronologies',
              contactInformation: '$ContactInformation',
              orders: '$ArrayStrings',
            },
          },
          сarNumber: { $first: '$NumberCar' },
          carModel: { $first: '$CarModel' },
        },
      },
    ];

    const driversAggregated = await this.messageModel
      .aggregate(aggregation as any)
      .exec();

    const drivers = driversAggregated.map((driverData) => ({
      driver: driverData._id,
      carNumber: driverData.сarNumber,
      carModel: driverData.carModel,
      transportRequests: driverData.transportRequests.map((request) => ({
        ...request,
        orders: request.orders.flat(),
      })),
    }));
     const updatedDrivers = this.setCountOrdersStaus(drivers);
    return updatedDrivers;
  }


  setCountOrdersStaus(drivers: any[]) {
    const updatedDrivers = drivers.map(driver => {
      const countCompletedOrders = driver.transportRequests.filter(order => order.documentStatus === "Доставлено").length;
      const countPendingOrders = driver.transportRequests.filter(order => order.documentStatus === "Доставляется").length;
      // const countCanceledOrders = driver.transportRequests.filter(order => order.documentStatus === "Отменено").length;
      const countAllOrders = driver.transportRequests.length;
      return {...driver,
         countCompletedOrders: String(countCompletedOrders),
          countPendingOrders: String(countPendingOrders),
          // countCanceledOrders: String(countCanceledOrders),
          countAllOrders: String(countAllOrders)
       
    }
    
    })
    return updatedDrivers;
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
