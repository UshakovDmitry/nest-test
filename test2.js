https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/

TransportRequestsModule
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';  
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule,
    HttpModule,
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}


TransportRequestsService
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


  async transportRequestCorrection(dto): Promise<any> {
    // Сопоставление полей DTO с ожидаемыми полями в запросе
    const requestData = {
      DocNumber: dto.documentNumber,
      DateDoc: dto.date,
      TimeDelivery: dto.timeDelivery,
      Driver: dto.driver,
      СarNumber: dto.carNumber,
      User: dto.userIIN, 
      Сomment: dto.comment,
    };
    console.log(requestData, 'корректировка ( отправляю Сане )');
    
    // http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver  боевая
    try {
      const response = await firstValueFrom(this.httpService.post('http://10.0.1.32:8080/1CHS/hs/TMS//ReplaceDriver', requestData));
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  serverSentEvents(): any {
    return this.dbService.dataChange$.pipe(
      map(() => ({ data: { message: 'Pong' } })),
    );
  }
}


ошибка 
[Nest] 15772  - 27.10.2023, 12:11:55   ERROR [ExceptionHandler] Nest can't resolve dependencies of the TransportRequestsService (MessageModel,
?, DBService). Please make sure that the argument HttpService at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If HttpService is a provider, is it part of the current AppModule?
- If HttpService is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

Error: Nest can't resolve dependencies of the TransportRequestsService (MessageModel, ?, DBService). Please make sure that the argument HttpSer
vice at index [1] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If HttpService is a provider, is it part of the current AppModule?
- If HttpService is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing HttpService */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\
injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\inject
or\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:128:38
)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\inject
or\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.
js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.
js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 3)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\cor
e\injector\instance-loader.js:55:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend>



  import { Module } from '@nestjs/common';
// import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { DBModule } from './db/db.module';
import { MessageSchema } from './schemas/message.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongoose } from './connect-mongoose';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { TransportRequestsController } from './transportRequests/transportRequests.controller';
import { TransportModule } from './transport/transport.module';
import { LoadersModule } from './loaders/loaders.module';
// import { YaModule } from './Ya/ya.module';
import { GeliosModule } from './gelios/gelios.module';
import { DriversModule } from './drivers/drivers.module';
import { TransportRequestsModule} from './transportRequests/transportRequests.module';
import { TransportRequestsService } from './transportRequests/transportRequests.service';
import { CitiesModule } from './cities/cities.module';
import { CouriersModule } from './couriers/couriers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RabbitMQModule,
    DBModule,
    MongooseModule.forRoot(connectMongoose()),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    TransportModule,
    LoadersModule,
    // YaModule,
    DriversModule,
    TransportRequestsModule,
    CitiesModule,
    CouriersModule,
    GeliosModule,
    AuthModule
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class AppModule {}

