мне нужно добавить запро по которому я буду возвращать из бд один элемент по совпадению поля Number

transportRequests.controller
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

}


transportRequests.service

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
}

db.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class DBService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      const currentDate = new Date();
      parsedData.DateCreated = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      const existingMessage = await this.messageModel
        .findOne({ Number: parsedData.Number })
        .exec();
      console.log('existingMessage', existingMessage);

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
    // Получить все уникальные имена из коллекции по полю Driver
    const collectionDriverNames = await this.messageModel
      .distinct('Driver')
      .exec();

    function hashSumm(str: string) {
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < String(str).length; i++) {
        const char = String(str).charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash;
    }

    const drivers = [];
    // Определяем модель водителя для возврата
    for (const driver of collectionDriverNames) {
      const driverTransportRequest = {
        number: '',
        date: '',
        dateCreated: '',
        organization: '',
        documentStatus: '',
        ISR: '',
        nuberPPO: '',
        informalDocument: '',
        filterContractor: '',
        loanAgreementStatus: '',
        typePayment: '',
        // quantities: {
        //   totalWeight: '',
        //   totalAmount: '',
        // },
        chronologies: [],
        contactInformation: {},
        orders: [],
      };

      const driverOne = {
        driver: '',
        сarNumber: '',
        carModel: '',
        transportRequests: [driverTransportRequest],
      };

      driverOne.driver = driver;

      const collection = await this.messageModel
        .find({ Driver: driver })
        .exec();
      for (const item of collection) {
        driverOne.сarNumber = item.NumberCar;
        driverOne.carModel = item.CarModel;
        driverTransportRequest.number = item.Number;
        driverTransportRequest.date = item.Date;
        driverTransportRequest.dateCreated = item.DateCreated;
        driverTransportRequest.organization = item.Organization;
        driverTransportRequest.documentStatus = item.DocumentStatus;
        driverTransportRequest.ISR = item.ISR;
        driverTransportRequest.nuberPPO = item.NuberPPO;
        driverTransportRequest.informalDocument = item.Informal_Document;
        driverTransportRequest.filterContractor = item.FilterContractor;
        driverTransportRequest.loanAgreementStatus = item.loanAgreementStatus;
        driverTransportRequest.typePayment = item.TypePayment;
        // driverTransportRequest.quantities.totalWeight = item.StructureQuantities.TotalWeight;
        // driverTransportRequest.quantities.totalAmount = item.StructureQuantities.TotalAmount;
        driverTransportRequest.chronologies = item.ArrayChronologies;
        driverTransportRequest.contactInformation = item.ContactInformation;
      }
      console.log('collection', collection);

      const prepareOrders = collection.map((item) => item.ArrayStrings);

      const flatOrders = prepareOrders.flat();

      const hashSummSet = new Set();
      flatOrders.forEach((order) => {
        const hs = hashSumm(JSON.stringify(order));
        if (!hashSummSet.has(hs)) {
          hashSummSet.add(hs);
          driverTransportRequest.orders.push(order);
        }
      });

      drivers.push(driverOne);
    }
    return drivers;
  }

  async getDriversByDate(date: string): Promise<any[]> {
    return await this.messageModel.find({ DateCreated: date }).exec();
  }
}
