transportRequests.controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('getMessages')
@Controller('/api/getTranportRequests')
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

transportRequests.module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.shema';
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    DBModule  
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}

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
