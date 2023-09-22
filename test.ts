import { IDriver } from '../../domain/interfaces/driver.interface';
import { Driver } from '../../domain/entities/Driver';

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
    this.drivers = new Driver({
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
    });
  }
}
import { IOrder } from "../interfaces/Order.interface";
import { IDriver } from "../interfaces/driver.interface";

export class Driver implements IDriver{
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
    
    constructor(data: any) {
        this.id = data.id;
        this.status = data.status;
        this.fullName = data.fullName;
        this.phone = data.phone;
        this.car_model = data.car_model;
        this.car_number = data.car_number;
        this.all_orders = data.all_orders;
        this.completed_orders = data.completed_orders;
        this.delayed_orders = data.delayed_orders;
        this.orders_on_time = data.orders_on_time;
        this.current_order = data.current_order;
        this.current_location = data.current_location;
        this.isActive = data.isActive;
        this.orders = data.orders;
    }

    // private _setCurrentOrder(): void {
    // }

    // private _setCurrentLocation(): void {
    // }

    public getOrders() {
        return this.orders;
    }

    public getCurrentOrder() {
        return this.current_order;
    }

    public callDriver() {
        console.log('callDriver');
    }

    

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

export interface IOrder {
    shippingPoint: string;
    goods: string;
    quantity: string;
    itemStatus: string;
    pickupPoint: string;
    deliveryPoint: string;
    pickupLatitude: string;
    pickupLongitude: string;
    deliveryLatitude: string;
    deliveryLongitude: string;
    pickupTime: string;
    deliveryTime: string;
}

Type 'Driver' is missing the following properties from type 'IDriver[]': length, pop, push, concat, and 29 more.ts(2740)
(property) MapModel.drivers: IDriver[]
