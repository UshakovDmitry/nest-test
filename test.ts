Не могу понять что за ошибка

tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "src/**/*.vue.js"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

export interface ILoader {
  fullName: string;
  warehouseNumber: string;
  schedule: string;
  carNumber: string;
  isActive: boolean;
}

import { IOrder } from "./Order.interface";

export interface IDriver {
  id: number;
  status: string;
  fullName: string;
  phone: string;
  car_model: string;
  car_number: string;
  all_orders: number | string;
  completed_orders: number | string;
  delayed_orders: number | string;
  orders_on_time: number | string;
  current_order: string;
  current_location: string;
  isActive?: boolean;
  orders: IOrder[];
}

export interface ITransport {
  model: number | string;
  number: number | string;
  type: string;
  volume: string;
  loadCapacity: number | string;
  city: number | string;
  isActive: boolean;
  hasDriver: boolean;
  schedule: string;
}

import { IContactInformation } from './ContactInformation.interface';
import { IOrder } from './Order.interface';

export interface ITransportRequest {
    id: string;
    number: string;
    date: string;
    organization: string;
    documentStatus: string;
    driver: string;
    ISR: string;
    informalDocument: string;
    skuWeight:  string;
    orders: IOrder[];
    contactInformation: IContactInformation;
}
import { IDriver } from '../../domain/interfaces/Driver.interface';
// import { Driver } from '../../domain/entities/Driver';

export interface IMapModel {
  drivers: IDriver[];
  cities: string[];
  selectedDriver: any;
  isModalOrderDetail: boolean;
  selectedDriverItem: string | number;
}

export class MapModel implements IMapModel {
  drivers: IDriver[];
  cities: string[];
  selectedDriver: any;
  isModalOrderDetail: boolean;
  selectedDriverItem: string | number;

  constructor() {
    this.isModalOrderDetail = false;
    this.selectedDriverItem = '';
    this.selectedDriver = {};
    this.cities = ['Алматы', 'Астана', 'Шымкент', 'Актау'];
    this.drivers = [{
      id: 1,
      status: 'По плану',
      fullName: 'Қазбек Қазбекұлы',
      phone: '+7 (777) 777-77-77',
      car_model: 'Toyota Land Cruiser',
      car_number: 'А 777 АТ 77',
      all_orders: 12,
      completed_orders: 10,
      delayed_orders: 1,
      orders_on_time: 9,
      current_order: '№№1234567',
      current_location: 'г. Алматы, пр. Абая, д. 5',
      isActive: true,
      orders: [
        {
          shippingPoint: 'г. Алматы, ул. Абая, д. 5',
          goods: 'Картофель',
          quantity: '10 тонн',
          itemStatus: 'В пути',
          pickupPoint: 'г. Алматы, ул. Абая, д. 5',
          deliveryPoint: 'г. Астана, ул. Мәңгілік ел, д. 10',
          pickupLatitude: '43.238949',
          pickupLongitude: '76.889709',
          deliveryLatitude: '51.128207',
          deliveryLongitude: '71.430411',
          pickupTime: '2020-12-12 12:00:00',
          deliveryTime: '2020-12-13 12:00:00',
        },
      ],
    }];
  }
}


  src/domain/entities/Driver.ts(2,25): error TS2307: Cannot find module '../interfaces/Driver.interface' or its corresponding type declarations.
  src/domain/entities/Loader.ts(1,25): error TS2307: Cannot find module '../interfaces/Loader.interface' or its corresponding type declarations.
  src/domain/entities/Transport.ts(1,28): error TS2307: Cannot find module '../interfaces/Transport.interface' or its corresponding type declarations.
  src/domain/entities/TransportRequest.ts(1,35): error TS2307: Cannot find module '../interfaces/TransportRequest.interface' or its corresponding type declarations.
  src/pages/map/map.model.ts(1,25): error TS2307: Cannot find module '../../domain/interfaces/Driver.interface' or its corresponding type declarations.
