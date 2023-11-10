[Nest] 7748  - 10.11.2023, 11:33:50   ERROR [ExceptionHandler] Nest can't resolve dependencies of the TransportRequestsService (MessageModel, DispatcherActionModel, HttpService, DBService, ?). Please make sure that the argument ActionHistoryService at index [4] is available in the TransportRequestsModule context.

Potential solutions:
- Is TransportRequestsModule a valid NestJS module?
- If ActionHistoryService is a provider, is it part of the current TransportRequestsModule?
- If ActionHistoryService is exported from a separate @Module, is that module imported within TransportRequestsModule?
  @Module({
    imports: [ /* the Module containing ActionHistoryService */ ]
  })

Error: Nest can't resolve dependencies of the TransportRequestsService (MessageModel, DispatcherActionModel, HttpService, DBService, ?). Please make sure that the argument ActionHistoryService at index [4] is available in the TransportRequestsModule context.

Potential solutions:
- Is TransportRequestsModule a valid NestJS module?
- If ActionHistoryService is a provider, is it part of the current TransportRequestsModule?
- If ActionHistoryService is exported from a separate @Module, is that module imported within TransportRequestsModule?
  @Module({
    imports: [ /* the Module containing ActionHistoryService */ ]
  })

    at Injector.lookupComponentInParentModules (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:254:19)
    at Injector.resolveComponentInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:207:33)
    at resolveParam (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:128:38)
    at async Promise.all (index 4)
    at Injector.resolveConstructorParams (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:143:27)
    at Injector.loadInstance (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:70:13)
    at Injector.loadProvider (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\injector.js:97:9)
    at C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 3)
    at InstanceLoader.createInstancesOfProviders (C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\node_modules\@nestjs\core\injector\instance-loader.js:55:9)
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend> 


import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { DispatcherActionSchema } from '../schemas/history.schema'; // Убедитесь, что путь к файлу верный
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';  


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'DispatcherAction', schema: DispatcherActionSchema },
    ]),
    DBModule,
    HttpModule,
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}
