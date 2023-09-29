export interface ITransportRequestDelivery {
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

export interface ApplicationDetailModel {
  transportRequest: any;
  transportRequestDelivery: ITransportRequestDelivery;
}

export class ApplicationDetailModel implements ApplicationDetailModel {
  transportRequest: any;
  transportRequestDelivery: ITransportRequestDelivery;

  constructor() {
    this.transportRequest = {};
    this.transportRequestDelivery = {};
  }
}

Type '{}' is missing the following properties from type 'ITransportRequestDelivery': numberPPO, number1C, ISR, status, and 2 more.ts(2740)
(property) ApplicationDetailModel.transportRequestDelivery: ITransportRequestDelivery
