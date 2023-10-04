



import { lastValueFrom } from 'rxjs';









async getCorrectCityName(city: string) {
    console.log(city, 'ПРИХОДИТ ГОРОД В getCorrectCityName');
    
    const apiKey = '06c9301e-6663-4182-b060-81da5969b5f3';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${city}`;
    console.log(url, 'url');

    try {
      const response$ = this.httpService.get(url);
      const response = await lastValueFrom(response$); // используйте lastValueFrom здесь
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error('Ошибка при выполнении GET-запроса:', error);
      throw error;
    }
}
