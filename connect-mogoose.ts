import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.shema';
я добавил новую схему
import { HistoryDocument } from '../schemas/history.schema';
import { DBService } from '../db/db.service';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

добавь ее в конструктор

























import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.schema'; // Убедитесь, что путь к файлу верный
import { HistorySchema } from '../schemas/history.schema'; // Убедитесь, что путь к файлу верный
import { TransportRequestsService } from './transportRequests.service';
import { TransportRequestsController } from './transportRequests.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'History', schema: HistorySchema }, // Добавленная схема истории
    ]),
    DBModule,
    HttpModule,
  ],
  controllers: [TransportRequestsController],
  providers: [TransportRequestsService],
})
export class TransportRequestsModule {}

