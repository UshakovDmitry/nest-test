// import { type ITransport } from '../../domain/interfaces/transport.interface';

interface ICouriersComponentModel {
  headersCouriers: string[];
  configCouriers: any;
  cities: string[];
  currentCity: string;
  couriers: any[];
  isModalAddCourier: boolean;
}

export class CouriersModel implements ICouriersComponentModel {
  couriers: any[];
  headersCouriers: string[];
  configCouriers: any;
  configLoaders: any;
  cities: string[];
  currentCity: string;
  filteredCouriers: any[];
  isModalAddCourier: boolean;

  constructor() {
    this.isModalAddCourier = false;
    this.cities = [
      'Все города',
      'Астана',
      'Караганда',
      'Алматы',
      'Шымкент',
      'Астана',
    ];

    this.currentCity = '';
    this.couriers = [];
    this.filteredCouriers = this.couriers;

    this.headersCouriers = [
      'Курьер',
      'Транспорт',
      'Тип найма',
      'Граффик работы',
      'Жесткое окно',
      'Возврат на склад',
      'Город',
      // 'Номер телефона',
      // 'Активность',
      'Подробнее'
    ];

    this.configCouriers = {
      headers: [
        {
          config: {
            type: 3,
          },
        },
        {
          config: {
            type: 3,
          },
        },
        {
          config: {
            type: 3,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        // {
        //   config: {
        //     type: 1,
        //   },
        // },
        {
          config: {
            type: 1,
          },
        },
      ],
      rows: [
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        {
          config: {
            type: 2,
          },
        },
        {
          config: {
            type: 2,
          },
        },
        {
          config: {
            type: 1,
          },
        },
        // {
        //   config: {
        //     type: 1,
        //   },
        // },
        {
          config: {
            type: 14,
          },
        },
      ],
    };
  }
}


import router from '../../router';
import { useGetApi } from '../../domain/services/getHTTP.service';
// import { IDashboardDriver } from '../../domain/interfaces/dashboard.interface';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';
import { type CouriersModel } from './couriers.model';
// import { ITransportRequest } from '../../domain/interfaces/transportRequest.interface';
export interface ICourier {
  courierFullName: string;
  carNumber: string;
  hiringType: string;
  schedule: string;
  hardWindow: string;
  returnToWarehouse: string;
  city: string;
  // phoneNumber: string;
  // isActive: string;
  goToDetail: string;
}

export class CouriersViewModel {
  model: CouriersModel;

  constructor(model: CouriersModel) {
    this.model = model;
    this.getCouriers();
  }

  // getCouriers(): void {
  async getCouriers(): Promise<void> {
    try {
      const response = await useGetApi('getCouriers');
      console.log(response, 'response');
      // Маппинг ответа в массив объектов ICourier
      const couriers: ICourier[] = response.map(
        (item: any): ICourier => ({
          courierFullName: item.Drivers,
          carNumber: item.carNumber,
          hiringType: item.HiringType,
          schedule: item.TimeWindow,
          hardWindow: item.HardTimeWindow,
          returnToWarehouse: item.ReturnWarehouse,
          city: item.City,
          goToDetail: '',
        }),
      );
      this.model.couriers = couriers;
      this.model.filteredCouriers = this.model.couriers;

      // this.model.couriers = response;
    } catch (error) {
      throw error;
    }
  }

  openModalAddCourier(bool: boolean): void {
    console.log(this.model.isModalAddCourier);

    this.model.isModalAddCourier = bool;
    // alert('отсутсвует дизайн');
  }

  selectCity(city: string): void {
    this.filterTableByCity(city);
  }

  filterTableByCity(city: string): void {
    this.model.currentCity = city;
    if (city === 'Все города') {
      this.model.filteredCouriers = this.model.couriers;
      return;
    }
    this.model.filteredCouriers = this.model.couriers.filter(
      (item) => item.city === city,
    );
  }

  changePage(page: number): void {
    console.log(page);
  }

  downloadLoadersAsXLSX(): void {
    alert('Функционал в разработке');
  }

  closeModalAddCourier(): void {
    this.model.isModalAddCourier = false;
  }

  goToCourierDetail(courierFullName: string): void {
    router.push({
      name: 'CourierDetail',
      params: { id: courierFullName },
    });
  }


  search(value: string): void {
    this.model.filteredCouriers = this.model.couriers.filter((item) => {
      return item.courierFullName.toLowerCase().includes(value.toLowerCase());
    });
  }

  sort (index: number): void {
this.model.filteredCouriers.sort((a, b) => {
  if (a.courierFullName > b.courierFullName) {
    return 1;
  };
  if (a.courierFullName < b.courierFullName) {
    return -1;
  };
  return 0;
});
  }
}




