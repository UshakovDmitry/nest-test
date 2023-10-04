@Schema({ versionKey: false })
export class Message {
  // ... другие свойства
  @Prop()
  City: string; // Добавьте это новое свойство
  // ... продолжение свойств
}



import { HttpService } from '@nestjs/axios';
// ... другие импорты

@Injectable() // Если ваш класс еще не является инъекционным
export class YourServiceClass { // замените это на ваше имя класса

  constructor(private httpService: HttpService) {} // инъекция HttpService

  async getCorrectCityName(city: string): Promise<string> {
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;

    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data.GeoObjectCollection.featureMember[0].GeoObject.name;
    } catch (error) {
      console.error("Ошибка при получении данных из Yandex Geocode:", error);
      throw error;
    }
  }
}



async saveMessage(messageData) {
  try {
    // ... ваша начальная логика
    
    // Получите правильное написание города
    const correctCityName = await this.getCorrectCityName(parsedData.ContactInformation.City);

    // Присвойте его как основное значение City и также обновите в ContactInformation
    parsedData.City = correctCityName;
    parsedData.ContactInformation.City = correctCityName;

    // ... ваша продолжающаяся логика сохранения/обновления сообщения

  } catch (error) {
    console.error('Ошибка сохранения в бд:', error);
    throw error;
  }
}



