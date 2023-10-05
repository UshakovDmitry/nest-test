Я получаю все заявки но также реализовал только что метод который возвращает заявки в диапазоне дат
допиши функцию для присвоения и отображения приходящих заявок в методе getTransportRequestsByDateRange

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
    // console.log(response, 'response');
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);
      console.log(transformedDataForTable, 'transformedDataForTable');

      this.model.transportRequests.unshift(transformedDataForTable);
    });
  }

  setTimeRange(timeRange) {
    this.getTransportRequestsByDateRange(timeRange[0], timeRange[1]);
  }

  async getTransportRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:4000/api/getTransportRequests/byDateRange',
        // 'http://tms.next.local/api/getTransportRequests/byDateRange',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
          }),
        },
      );

      if (!response.ok) {
        console.error('Сетевой ответ не был ok.', response.statusText);
        return;
      }
      const data = await response.json();
     data.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      ДОПИШИ ЛОГИКУ ТУТ
    }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
}

  search(value) {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(
      (item) => {
        return item.request.number.toLowerCase().includes(value.toLowerCase());
      },
    );
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
      params: { id: row.request.number },
      query: {
        number: row.request.number,
      },
    });
  }

  transformToTransportRequest(data: any) {
    return {
      request: {
        number: String(data.Number),
        status: Boolean(data.distribution),
      },
      status: String(data.DocumentStatus),
      ISR: {
        number: String(data.ISR),
        status: String(data.loanAgreementStatus),
      },
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
      request: data.request,
      status: String(data.status),
      ISR: data.ISR,
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

