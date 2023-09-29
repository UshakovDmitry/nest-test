  goToTransportRequestDetail(row: any) {
    router.push({
      name: 'ApplicationDetail',
      params: { id: row.number },
      query: {
        number: row.number,
      },
    });
  }


import router from '../../router';
import { ApplicationDetail } from './application-detail.model';

export class ApplicationDetailViewModel {
  model: ApplicationDetail;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequestByNumber();
  }

  getTransportRequestByNumber() {}

  test() {
    console.log('test');
  }
    
}
