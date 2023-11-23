import { Driver } from './../../domain/entities/Driver';
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
    //TODO: Переделать на нормальный EventSource!!!
    // this.eventSource.onmessage = (event) => {
    //   console.log('Прилетает Pong', JSON.parse(event.data));

    //   if (JSON.parse(event.data).message === 'Pong') {
    //     this.model.transportRequests = [];
    //     this.getTransportRequests('today');
    //   }
    // };
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
    this.model.filterContractors = {};
    response.forEach((data: any) => {
      const transformedData = this.transformToTransportRequest(data);
      const city = this.setCitiesList(transformedData);
      // Проверяем наличие города в списке и добавляем, если его нет
      if (!this.model.cities.includes(city)) {
        this.model.cities.push(city);
      }
      if (!this.model.cities.includes("Все города")) {
        this.model.cities.unshift("Все города");
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
    
  }


  filterRequestsByContractor(contractor: string): void {
    let baseRequestsList = this.model.transportRequests;
  
    // Если уже применен фильтр по городу, используем отфильтрованный список
    if (this.model.currentCity !== 'Все города' && this.model.currentCity) {
      baseRequestsList = this.model.filteredTransportRequests;
    }
  
    if (!contractor) { // Если contractor пустая строка, снимаем фильтр
      this.model.filteredTransportRequests = baseRequestsList;
    } else if (contractor === "Прочее") {
      this.model.filteredTransportRequests = baseRequestsList.filter(
        request => !request.filterContractor || request.filterContractor.trim() === ""
      );
    } else {
      this.model.filteredTransportRequests = baseRequestsList.filter(
        request => request.filterContractor === contractor
      );
    }
  
    // Обновляем список после фильтрации
    this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  }


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
      this.model.filterContractors = {};

      data.forEach((dataItem: any) => {
        const transformedData = this.transformToTransportRequest(dataItem);
        const contractor = dataItem.FilterContractor
        ? dataItem.FilterContractor
        : 'Прочее';
      if (this.model.filterContractors[contractor]) {
        this.model.filterContractors[contractor] += 1;
      } else {
        this.model.filterContractors[contractor] = 1;
      }
        const transformedDataForTable =
          this.transformToTransportForTable(transformedData);
        this.model.transportRequests.push(transformedDataForTable);
      });
      this.model.filteredTransportRequests = this.model.transportRequests;
      this.model.isToday = false;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  search(value: string) {
    if (this.model.currentCity !== 'Все города' && this.model.currentCity !== '') {
    this.model.filteredTransportRequests = this.model.lastFilteredTransportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  } else {
    this.model.filteredTransportRequests = this.model.transportRequests.filter(item => {
      return item.request.number.toLowerCase().includes(value.toLowerCase());
    });
  }
}

  setCitiesList(data) {
    return data.contactInformation.City;
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
        status: data.Driver && data.Driver !== '' ? true : false,
      },
      status:  data.IsDelete === true ? String(data.DocumentStatus += ' (помечено на удаление)') :String(data.DocumentStatus),
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
      filterContractor: String(data.FilterContractor),
    };
  }

  transformToTransportForTable(data: any) {
    return {
      request: data.request,
      status: String(data.status),
      ISR: data.ISR,
      document: String(data.document),
      filterContractor: String(data.filterContractor),
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

  filterRequestsByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredTransportRequests = this.model.transportRequests;
    } else {
      this.model.filteredTransportRequests = this.model.transportRequests.filter(
        request => {
          const addressParts = request.deliveryAddress.address.split(',');
          const requestCity = addressParts[0]?.trim(); 
          return requestCity === city;
        }
      );
    }
        // Сохраняем состояние последнего примененного фильтра
        this.model.lastFilteredTransportRequests = this.model.filteredTransportRequests;
  }
}

