...
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RabbitMQService {
  ...
  constructor(private readonly httpService: HttpService, private readonly dbService: DatabaseService) {}

  async readFromQueue(): Promise<QueueMessage> {
    ...
    if (response.status === 200 && response.data.length > 0) {
        const data = response.data[0];
        const payload = JSON.parse(data.payload);
        
        // Сохраняем в MongoDB
        await this.dbService.create(payload);

        return payload;
    } else {
        throw new Error('Возникла ошибка при получении данных');
    }
  }
}
