import { HttpService } from '@nestjs/axios';

@Injectable()
export class DBService {
  // ...

  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    private readonly httpService: HttpService, // добавьте это
  ) {}

  async getCorrectCityName(city: string) {
    console.log(city,'ПРИХОДИТ ГОРОД В getCorrectCityName');
    
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;
    console.log(url,'url');

    try {
      const response = await this.httpService.get(url).toPromise();
      console.log(response.data);
      return response.data; // или же возвращаемое значение, которое вам нужно
    } catch (error) {
      console.error('Ошибка при выполнении GET-запроса:', error);
      throw error;
    }
  }

  // ...
}





