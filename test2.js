https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/


тут хочу дклать запрос 
  transportRequestCorrection(dto: any): Promise<any> {
    const response = await firstValueFrom.post(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver'));
  }

вот такой
POST: http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver
Body
{
    "DocNumber": "№MER000718",
    "DateDoc": "20230926",
    "TimeDelivery": "20231017180000",
    "Driver": "Муравейников Сергей Николаевич",
    "СarNumber": "A589",
    "User": "660903402365"
    "Сomment": "Корретировка диспетчером."
}

вот код 
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
import { DBService } from '../db/db.service';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  async getAllTransportRequests(): Promise<any[]> {
    return await this.dbService.getAllTransportRequests();
  }

  async getNotPredictedTransportRequestsByDate(date: string): Promise<any[]> {
    const requestsByDate = await this.dbService.getTransportRequestsByDate(date);
    
    const notPredictedRequests = requestsByDate.filter(request => 
      request.Driver.trim() === "" && 
      request.NumberCar.trim() === "" && 
      (request.CarModel ? request.CarModel.trim() === "" : true) // проверяет CarModel только если оно существует
    );
    
    return notPredictedRequests;
  }

  async getTransportRequestByNumber(number: string): Promise<any> {
    return await this.dbService.getTransportRequestByNumber(number);
  }

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    return await this.dbService.getTransportRequestsByDateRange(
      startDate,
      endDate,
    );
  }


  getTransportRequestsByDate(date: string): Promise<any[]> {
    return this.dbService.getTransportRequestsByDate(date);
  }


  transportRequestCorrection(dto: any): Promise<any> {
    const response = await firstValueFrom.post(this.httpService.get('http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver'));
  }


  serverSentEvents(): any {
    return this.dbService.dataChange$.pipe(
      map(() => ({ data: { message: 'Pong' } })),
    );
  }



}
