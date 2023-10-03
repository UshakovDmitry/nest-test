ПОЧЕМУ БРАУЗЕР ПИШЕТ ЧТО ТУТ ВОЗНИКАЕТ РЕКУРСИЯ?

this.model.transportRequests.push(transformedDataForTable);

вот ошибка 
applications.viewmodel.ts:24 [Vue warn]: Maximum recursive updates exceeded in component <applications.component>. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.

    вот код 
import { useGetApi } from '../../domain/services/getHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './applications.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;

  constructor(model: any) {
    this.model = model;
    this.getTransportRequests();
  }

  async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    console.log(response.length, 'response');
    
    response.forEach((data: any) => {
      // console.log(data, 'data');

      const transformedData = this.transformToTransportRequest(data);
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      // this.model.transportRequests.push(transformedData);

    });
  }

  selectCity(city: string): void {
    console.log(city);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  goToTransportRequestDetail(row: any) {
    console.log('router');
    
    router.push({
      name: 'ApplicationDetail',
      params: { id: row.number },
      query: {
        number: row.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    return {
      number: String(data.Number),
      status: String(data.DocumentStatus),
      ISR: String(data.ISR),
      document: String(data.Informal_Document),
      carModel: String(data.CarModel),
      carNumber: String(data.NuberCar),
      numberPPO: String(data.NuberPPO),
      organization: String(data.Organization),
      typePayment: String(data.TypePayment),
      loanAgreementStatus: String(data.loanAgreementStatus),
      quantities: data.StructureQuantities,
      chronologies: data.ArrayChronologies,
      contactInformation: data.ContactInformation,
      orders: data.ArrayStrings,
      dataCreated: String(data.DateCreated),
      date: String(data.Date),
      driver: String(data.Driver),
      fiterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    return {
      number: String(data.number),
      status: String(data.status),
      ISR: String(data.ISR),
      document: String(data.document),
      // shippingAddress: {
      //   address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
      //   coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      // },
      recipient: {
        name: String(data.contactInformation.Contractor),
        phone: String(data.contactInformation.Phone),
      },
      deliveryTime: {
        date: String(data.date),
        time: String(data.contactInformation.Date_Time_delivery),
      },
      deliveryAddress: {
        address: `${data.contactInformation.City}, ${data.contactInformation.Street}, ${data.contactInformation.Home}, ${data.contactInformation.Apartment}`,
        coordinates: `${data.contactInformation.Latitude}, ${data.contactInformation.Longitude}`,
      },
      quantitties: {
        totalPrice: data.quantities
          ? String(data.quantities.TotalAmount)
          : '-/-/-',
        totalWeight: data.quantities
          ? String(data.quantities.TotalWeight)
          : '---',
      },
    };
  }
}
