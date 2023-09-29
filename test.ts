export interface ITransportRequestDeliveryItem {
  numberPPO: string;
  number1C: string;
  ISR: string;
  status: string;
  courier: {
    name: string;
    phone: string;
  };
  delivery: {
    date: string;
    time: string;
  };
}

export type ITransportRequestDelivery = ITransportRequestDeliveryItem[];

export interface ApplicationDetailModel {
  transportRequest: any;
  transportRequestDelivery: ITransportRequestDelivery;
}

export class ApplicationDetailModel implements ApplicationDetailModel {
  transportRequest: any;
  transportRequestDelivery: ITransportRequestDelivery;

  constructor() {
    this.transportRequest = {};
    this.transportRequestDelivery = []; // Теперь это пустой массив
  }
}
