
src/pages/transport-requests/transportRequests.component.vue:104:7 - error TS2322: Type 'Ref<{ model: { dateSelection: string; transportRequests: any[]; headersTransportRequests:
 string[]; configTransportRequests: any; cities: string[]; currentCity: string; filteredTransportRequests: any[]; }; ... 10 more ...; transformToTransportForTable: (data: any) =>
 { ...; }; }>' is not assignable to type 'Ref<TransportRequestsViewModel>'.
  Property 'setupEventListeners' is missing in type '{ model: { dateSelection: string; transportRequests: any[]; headersTransportRequests: string[]; configTransportRequests: any;
 cities: string[]; currentCity: string; filteredTransportRequests: any[]; }; ... 10 more ...; transformToTransportForTable: (data: any) => { ...; }; }' but required in type 'Tran
sportRequestsViewModel'.

104 const viewModel: Ref<TransportRequestsViewModel> = ref(
          ~~~~~~~~~

  src/pages/transport-requests/transportRequests.viewmodel.ts:22:11
    22   private setupEventListeners() {
                 ~~~~~~~~~~~~~~~~~~~
    'setupEventListeners' is declared here.

src/router/index.ts:15:22 - error TS2306: File 'C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/pages/not-found/not-found.component.vue.ts' is not a mod
ule.

15 import NotFound from '../pages/not-found/not-found.component.vue';
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Found 2 errors in 2 files.

Errors  Files
     1  src/pages/transport-requests/transportRequests.component.vue:104
     1  src/router/index.ts:15
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend> npm run build

> alser.dispatcherworkplaceui@0.0.0 build
> vue-tsc && vite build

src/pages/transport-requests/transportRequests.component.vue:104:7 - error TS2322: Type 'Ref<{ model: { dateSelection: string; transportRequests: any[]; headersTransportRequests:
 string[]; configTransportRequests: any; cities: string[]; currentCity: string; filteredTransportRequests: any[]; }; ... 10 more ...; transformToTransportForTable: (data: any) =>
 { ...; }; }>' is not assignable to type 'Ref<TransportRequestsViewModel>'.
  Property 'setupEventListeners' is missing in type '{ model: { dateSelection: string; transportRequests: any[]; headersTransportRequests: string[]; configTransportRequests: any;
 cities: string[]; currentCity: string; filteredTransportRequests: any[]; }; ... 10 more ...; transformToTransportForTable: (data: any) => { ...; }; }' but required in type 'Tran
sportRequestsViewModel'.

104 const viewModel: Ref<TransportRequestsViewModel> = ref(
          ~~~~~~~~~

  src/pages/transport-requests/transportRequests.viewmodel.ts:22:11
    22   private setupEventListeners() {
                 ~~~~~~~~~~~~~~~~~~~
    'setupEventListeners' is declared here.

src/router/index.ts:15:22 - error TS2306: File 'C:/Users/ushakov.dmitriy/Desktop/alser.dispatcherworkplaceui/frontend/src/pages/not-found/not-found.component.vue.ts' is not a mod
ule.

15 import NotFound from '../pages/not-found/not-found.component.vue';
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Found 2 errors in 2 files.

Errors  Files
     1  src/pages/transport-requests/transportRequests.component.vue:104
     1  src/router/index.ts:15
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\frontend>

import { useGetApi } from '../../domain/services/getHTTP.service';
import { usePostApi } from '../../domain/services/postHTTP.service';
import router from '../../router';
import { type TransportRequestsModel } from './transportRequests.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';

export class TransportRequestsViewModel {
  model: TransportRequestsModel;
  eventSource: EventSource;

  constructor(model: any) {
    this.model = model;
    this.eventSource = new EventSource(
      // 
      'http://tms.next.local/api/getTransportRequests/sse',

    );
    this.setupEventListeners();
    this.getTransportRequests();
  }

  private setupEventListeners() {
    this.eventSource.onmessage = (event) => {
      console.log('Прилетает Pong', JSON.parse(event.data));

      if (JSON.parse(event.data).message === 'Pong') {
        this.model.transportRequests = [];
        this.getTransportRequests();
      }
    };
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

      this.model.transportRequests.unshift(transformedDataForTable);
      this.model.filteredTransportRequests = this.model.transportRequests;
    });
  }


  // async getTransportRequests(): Promise<void> {
  //   const response = await useGetApi('getTransportRequests');
  //   console.log(response.length, 'кол-во заявок');
  
  //   // Перезаписываем массив transportRequests с новыми данными
  //   this.model.transportRequests = response.map((data: any) => {
  //     const transformedData = this.transformToTransportRequest(data);
  //     return this.transformToTransportForTable(transformedData);
  //   });
  
  //   // Обновляем список городов
  //   this.model.cities = [];
  //   response.forEach((data: any) => {
  //     const city = this.setCitiesList(this.transformToTransportRequest(data));
  //     if (!this.model.cities.includes(city)) {
  //       this.model.cities.push(city);
  //     }
  //   });
  // }

  setTimeRange(timeRange) {
    this.getTransportRequestsByDateRange(timeRange[0], timeRange[1]);
  }

  async getTransportRequestsByDateRange(
    dateStart: string,
    dateEnd: string,
  ): Promise<void> {
    const body = {
      startDate: dateStart,
      endDate: dateEnd,
    };
    try {
      const response = usePostApi(
        'getTransportRequestsbyDateRange',
        body,
        'sendFormData',
      );

      const data = await response;

      // Очистить текущие данные перед добавлением новых
      this.model.transportRequests = [];

      data.forEach((dataItem: any) => {
        const transformedData = this.transformToTransportRequest(dataItem);
        const transformedDataForTable =
          this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      });
      this.model.filteredTransportRequests = this.model.transportRequests;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
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
      name: 'TransportRequestsDetail',
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
