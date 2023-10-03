   // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
          this.model.cities.push(city);
      }









async getTransportRequests(): Promise<void> {
    const response = await useGetApi('getTransportRequests');
    console.log(response.length, 'кол-во заявок');

    // Создаем временный Set для хранения уникальных городов
    const citiesSet = new Set();

    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);

      // Добавляем город в Set
      citiesSet.add(city);
      
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
      this.model.transportRequests.push(transformedDataForTable);
    });

    // Конвертируем Set обратно в массив и присваиваем его this.model.cities
    this.model.cities = [...citiesSet];
}












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
    console.log(response.length, 'кол-во заявок');
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const transformedDataForCities = this.setCitiesList(transformedData);
this.model.cities.push(transformedDataForCities);      
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
      this.model.transportRequests.push(transformedDataForTable);
    });
  }

  setCitiesList(data) {
    return data.contactInformation.City;
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
