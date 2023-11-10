import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../schemas/message.schema'; // Make sure the file name is correct here.
import { DispatcherActionDocument } from '../schemas/history.schema';
import { DBService } from '../db/db.service';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    @InjectModel('DispatcherAction') private historyModel: Model<DispatcherActionDocument>,
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
    private readonly actionHistoryService: ActionHistoryService, // Inject ActionHistoryService
  ) {}

  // ... other methods ...

  async transportRequestCorrection(dto): Promise<any> {
    // ... dto processing ...

    try {
      // Replace the recordHistoryAction call with addCorrectionHistory
      await this.actionHistoryService.addCorrectionHistory({
        name: dto.userName, 
        time: dto.timeDelivery, 
        comment: dto.comment
      });

      // ... rest of the method ...
    } catch (error) {
      throw new HttpException(
        `Ошибка при отправке запроса на корректировку транспортной заявки: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ... other methods ...
}
