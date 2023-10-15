
export interface TransportRequestsModel {
  //   transportRequests: ITransportRequest[];
  dateSelection: string;
  transportRequests: any[];
  headersTransportRequests: string[];
  configTransportRequests: any;
  cities: string[];
  filterContractors: object;
  currentCity: string;
  isToday: boolean;
  isYesterday: boolean;
  isTomorrow: boolean;
  // searchInput: string;
  // filteredRequests: any[];
}

export class TransportRequestsModel implements TransportRequestsModel {
  dateSelection: string;
  transportRequests: any[];
  headersTransportRequests: string[];
  configTransportRequests: any;
  cities: string[];
  currentCity: string;
  filterContractors: object;
  // searchInput: string;
  filteredTransportRequests: any[];
  isToday: boolean;
  isYesterday: boolean;
  isTomorrow: boolean;

  constructor() {
    this.isToday = true;
    this.isYesterday = false;
    this.isTomorrow = false;
    this.dateSelection = '';
    // this.searchInput = '';
    this.cities = [];
    this.currentCity = '';
    this.transportRequests = [];
    this.filteredTransportRequests = this.transportRequests;
    this.filterContractors = {};


    this.headersTransportRequests = [
      '№ заявки',
      'Статус',
      'ISR',
      'Документ основания',
      // 'Адрес отгрузки',
      'Получатель',
      'Время доставки',
      'Адрес получателя',
      'Вес SKU',
    ];


  }


А вот viewmodel
// import { useGetApi } from '../../domain/services/getHTTP.service';
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
      'http://tms.next.local/api/getTransportRequests/sse',
      // 'http://localhost:4000/api/getTransportRequests/sse',
    );
    this.setupEventListeners();
    this.getTransportRequests('today');
  }

  setupEventListeners() {
    this.eventSource.onmessage = (event) => {
      console.log('Прилетает Pong', JSON.parse(event.data));

      if (JSON.parse(event.data).message === 'Pong') {
        this.model.transportRequests = [];
        this.getTransportRequests('today');
      }
    };
  }

  // async getTransportRequestByDate(): Promise<void> {
  //   const today = new Date();
  //   const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  //   const body = {
  //     date: formattedDate,
  //   };
  //   const response = await usePostApi('getTransportRequestsByDate', body);
  //   console.log(response, 'заявки');

  // }
  async getTransportRequests(day: string): Promise<void> {
    console.log('day', day);

    const today = new Date();

    if (day === 'tomorrow') {
      today.setDate(today.getDate() + 1);
      this.model.isTomorrow = true;
      this.model.isToday = false;
      this.model.isYesterday = false;
    } else if (day === 'yesterday') {
      today.setDate(today.getDate() - 1);
      this.model.isTomorrow = false;
      this.model.isToday = false;
      this.model.isYesterday = true;
    } else if (day === 'today') {
      this.model.isTomorrow = false;
      this.model.isToday = true;
      this.model.isYesterday = false;
    }

    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const body = {
      date: formattedDate,
    };
    const response = await usePostApi('getTransportRequestsByDate', body);
    console.log(response.length, 'кол-во заявок');
    // console.log(response, 'response');
    this.model.transportRequests = [];
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }

      const contractor = data.FilterContractor
        ? data.FilterContractor
        : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
      const transformedDataForTable =
        this.transformToTransportForTable(transformedData);

      this.model.transportRequests.unshift(transformedDataForTable);
      this.model.filteredTransportRequests = this.model.transportRequests;
    });
    console.log(this.model.filterContractors, 'filterContractors');
  }

  
  filterRequestsByContractor(contractor: string): void {
    console.log(contractor, 'contractor');
    
    if (contractor === "Прочее") {
        this.model.filteredTransportRequests = this.model.transportRequests.filter(
            request => !request.FilterContractor || request.FilterContractor.trim() === ""
        );
    } else {
        this.model.filteredTransportRequests = this.model.transportRequests.filter(
            request => request.FilterContractor === contractor
        );
    }  
    
    console.log(this.model.filteredTransportRequests, 'filteredTransportRequests');
    
}
