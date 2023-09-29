Property 'query' does not exist on type 'Ref<RouteLocationNormalizedLoaded>'.ts(2339)
any






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
        body: JSON.stringify({ number: router.currentRoute.query.number }) 
      });

      if (!response.ok) {
        console.error('Сетевой ответ не был ok.', response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  test() {
    console.log('test');
  }
}


