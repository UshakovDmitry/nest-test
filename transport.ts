message.controller.ts
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Post()
  async saveMessage(@Body() messageData: any) {
    return this.messageService.saveMessage(messageData);
  }
}

message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(messageData: any) {
    try {
      const parsedData =
        typeof messageData === 'string' ? JSON.parse(messageData) : messageData;
      // console.log(parsedData, 'messageData!');

      const createdMessage = new this.messageModel(parsedData);
      console.log(createdMessage, 'createdMessage!');
      return createdMessage.save();
    } catch (error) {
      console.error('Ошибка сохранения в бд:', error);
      throw error;
    }
  }

  async getAllMessages(): Promise<any[]> {
    return await this.messageModel.find().exec();
  }
}

message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageSchema } from '../schemas/message.shema';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}


вот запрос с фронта

application.viewModel.ts

import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getData();
  }
  transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      shipping_point: {
        address: String(data.ArrayStrings[0].Shipping_Point),
        coordinates: `${data.ArrayStrings[0].Pickup_Latitude}, ${data.ArrayStrings[0].Pickup_Longitude}`,
      },
      contractor: {
        name: String(data.ContactInformation.Contractor),
        phone: String(data.ContactInformation.Phone),
      },
      delivery_time: String(data.ContactInformation.Date_Time_delivery),
      delivery_point: {
        address: `${data.ContactInformation.City}, ${data.ContactInformation.Street}, ${data.ContactInformation.Home}, ${data.ContactInformation.Apartment}}`,
        coordinates: `${data.ContactInformation.Latitude}, ${data.ContactInformation.Longitude}`,
      },
      sku_weight: String(data.SKU_Weight),
    };
  }

  getData(): void {
    fetch('http://localhost:4000/messages', {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.ok) {
          console.log('Данные получены');
          return await response.json();
        } else {
          throw new Error('Возникла ошибка при получении данных');
        }
      })
      .then((dataArray) => {
        dataArray.forEach((data: any) => {
          const transformedData = this.transformToTransportRequest(data);
          console.log(transformedData, 'transformedData');
          this.model.transportRequests.push(transformedData);
          console.log(this.model.transportRequests, 'this.model.transportRequests');
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectCity(city: string): void {
    console.log(city);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }
}


