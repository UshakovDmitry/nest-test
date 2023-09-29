import router from '../../router';
import { ApplicationDetail } from './application-detail.model';

export class ApplicationDetailViewModel {
  model: ApplicationDetail;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequestByNumber();
  }

  async getTransportRequestByNumber() {
    try {
      const response = await fetch('/api/getTransportRequests/getByNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: this.model.number }) // или из router.currentRoute.query.number, если модель еще не обновлена
      });

      if (!response.ok) {
        console.error('Сетевой ответ не был ok.', response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data); // Здесь будут данные от сервера
      // TODO: Обновите вашу модель данными от сервера, если это необходимо
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  test() {
    console.log('test');
  }
}


















