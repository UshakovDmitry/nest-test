https://confirm-kaspi-order.alser2.workers.dev


https://kaspi-proxy.alser.kz/


import { Injectable } from '@nestjs/common';
// ... (другие импорты)

@Injectable()
export class TransportRequestsService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService,
    private readonly dbService: DBService,
  ) {}

  // ... (другие методы)

  async transportRequestCorrection(dto: TransportRequestCorrectionDto): Promise<any> {
    // Сопоставление полей DTO с ожидаемыми полями в запросе
    const requestData = {
      DocNumber: dto.documentNumber,
      DateDoc: dto.date,
      TimeDelivery: dto.timeDelivery,
      Driver: dto.driver,
      СarNumber: dto.carNumber,
      User: dto.userIIN, // или другое подходящее поле, если userIIN не подходит
      Сomment: dto.comment,
      // ... (другие поля, если они нужны)
    };
    
    try {
      const response = await this.httpService.post('http://10.0.1.20/1CHS/hs/TMS//ReplaceDriver', requestData).toPromise();
      return response.data;
    } catch (error) {
      // Обработка ошибки
      console.error(error);
      throw error;
    }
  }

  // ... (другие методы)
}
