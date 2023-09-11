export class TransportComponentViewModel {
  model: TransportComponentModel;

  constructor(model: TransportComponentModel) {
    this.model = model;
    this.getData();
  }

  // ... [Ваши другие методы]

  transformToTransportRequest(data: any): ITransportRequest {
    return {
      number: data.Number,
      status: data.DocumentStatus,
      ISR: data.ISR,
      document: data.Informal_Document,
      city: data.ContactInformation.City,
      street: data.ContactInformation.Street,
      home: data.ContactInformation.Home,
      apartment: data.ContactInformation.Apartment,
      latitude: data.ContactInformation.Latitude,
      longitude: data.ContactInformation.Longitude,
      contractor: data.ContactInformation.Contractor,
      date_time_delivery: data.ContactInformation.Date_Time_delivery,
      сontractor_phone: data.ContactInformation.Phone,
      sku_weight: data.SKU_Weight
    };
  }

  getData(): void {
    fetch('http://localhost:3000/rabbitmq/read', {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Возникла ошибка при получении данных');
        }
      })
      .then((data) => {
        const transformedData = this.transformToTransportRequest(data);
        console.log(transformedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ... [Ваши другие методы]
}
